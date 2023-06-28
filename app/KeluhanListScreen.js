import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TabView, TabBar } from 'react-native-tab-view';
import Modal from 'react-native-modal';
import axios from 'axios';

const KeluhanListScreen = ({navigation, route}) => {
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [keluhanId, setKeluhanId] = useState('')
  const dataRumah = route.params.dataRumah
  const role = route.params.role
  const dataPenghuni = route.params.dataPenghuni
  const dataKamar = route.params.dataKamar

  useEffect(() => {
    init()
    // navigation.addListener('focus', () => {init()})
  }, [])

  const init = () => {
    let url = ''
    setIsLoading(true)

    if (role == 'Penghuni') {
      url = `https://api-kostku.pharmalink.id/skripsi/kostku?find=keluhan&RumahID=${dataRumah.Rumah_ID}&PenghuniID=${dataPenghuni.Penghuni_ID}`
    } else {
      url = `https://api-kostku.pharmalink.id/skripsi/kostku?find=keluhan&RumahID=${dataRumah.Rumah_ID}`
    }
    
    axios.get(url)
      .then(({data}) => {
        if (data.error.msg == '' && data.data != null) {
          let data1 = []
          let data2 = []

          data.data.forEach((item) => {
            if (item.Status_Keluhan == 'Dilaporkan') data1.push(item)
            if (item.Status_Keluhan == 'Selesai') data2.push(item)
          })

          setData(data1.reverse())
          setData2(data2.reverse())
          // setRefreshing(false)
        }
        setIsLoading(false)
      }).catch((e) => {
        console.log(e, 'error get keluhan')
      })
  }

  const goBack = () => {
    navigation.goBack()
  }

  const goToKeluhanDetail = (item) => {
    navigation.navigate('KeluhanDetail', {keluhan: item, dataRumah: dataRumah, role: role})
  }

  const goToCreateKeluhan = (item) => {
    navigation.navigate('CreateKeluhan', {dataRumah: dataRumah, dataPenghuni: dataPenghuni, dataKamar: dataKamar})
  }

  const updateKeluhan = () => {
    setModal(false)
    axios.put(`https://api-kostku.pharmalink.id/skripsi/kostku?keluhan=selesai&KeluhanID=${keluhanId}`)
      .then(({data}) => {
        if (data.error.msg == '') {
          init()
        }
      }).catch((e) => {
        console.log(e, 'error dashboard')
      })
  }

  const KeluhanItem = ({item}) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'center', justifyContent: 'space-between' }} onPress={() => goToKeluhanDetail(item)} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#FFB700', padding: 8, borderRadius: 10, width: '22%', alignItems: 'center' }} >
            <Text style={{ color: 'white', fontFamily: 'UbuntuTitling-Bold', fontSize: 20 }} >{item.Kamar_Nomor}</Text>
          </View>
          <View style={{ marginLeft: 5, width: '65%' }} >
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15, paddingLeft: 4 }} numberOfLines={1} >{item.Penghuni_Name}</Text>
            <View style={{flexDirection: 'row', width: '100%' }} >
              <Icon size={15} name='alert-octagon-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 4 }} />
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} numberOfLines={1} >{item.Detail_Keluhan}</Text>
            </View>
          </View>
        </View>
        { role == 'Penghuni' ?
            null
          :
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => {setKeluhanId(item.Keluhan_ID); setModal(true)}} disabled={item.Status_Keluhan == 'Dilaporkan' ? false : true} >
              <Icon size={40} name={item.Status_Keluhan == 'Dilaporkan' ? 'check-circle-outline' : 'check-circle' } color='#FFB700' style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
        }
      </TouchableOpacity>
    )
  }

  const FirstRoute = () => { 
    return (
      isLoading ? 
        <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
      :
        <View>
          <FlatList
            data={data}
            renderItem={({item}) => <KeluhanItem item={item}/>}
            style={{ width: '100%', marginVertical: 10 }}
            ListEmptyComponent={<Image source={require('../assets/image/EmptyStateImg_General.png')} style={{ alignSelf: 'center', width: 150, height: 150, marginTop: 50 }} />}
            />
            
        </View>
    )
  };
  
  const SecondRoute = () => { 
    return (
      isLoading ? 
        <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
      :
        <View>
          <FlatList
            data={data2}
            renderItem={({item}) => <KeluhanItem item={item}/>}
            style={{ width: '100%', marginVertical: 10 }}
            ListEmptyComponent={<Image source={require('../assets/image/EmptyStateImg_General.png')} style={{ alignSelf: 'center', width: 150, height: 150, marginTop: 50 }} />}
            />
        </View>
    )
  };

  //react tab view
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Dilaporkan' },
    { key: 'second', title: 'Selesai' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ borderColor: '#FFB700', borderWidth: 1, borderRadius: 10 }}
      style={{ backgroundColor: 'white', elevation: 0, shadowOffset: { width: 0, height: 0 }, width: '100%', alignSelf: 'center' }}
      activeColor='#FFB700'
      inactiveColor='#FFDB80'
      pressColor='transparent'
      labelStyle={{ fontFamily: 'PlusJakartaSans-Bold', textTransform: 'none' }}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute/>;
      case 'second':
        return <SecondRoute/>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
        <View style={{flexDirection: 'row', alignItems: 'center' }} >
          <TouchableOpacity onPress={() => goBack()} >
            <Icon size={25} name='arrow-left' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >Daftar keluhan</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >{role == 'Penghuni' ? 'Laporkan keluhan ke pengelola kost' : 'Klik nomor untuk melihat detail'}</Text>
          </View>
        </View>
        { role == 'Penghuni' ?
            <Image source={dataPenghuni.Penghuni_Image == '' ? require('../assets/image/RumahKost_Default.png') : { uri: dataPenghuni.Penghuni_Image }} style={{ height: 50, width: 50, borderRadius: 100}} />
          :
            <Image source={dataRumah.Rumah_Image == '' ? require('../assets/image/RumahKost_Default.png') : { uri: dataRumah.Rumah_Image }} style={{ height: 50, width: 50, borderRadius: 100}} />
        }
      </View>
      <View style={{ flexDirection: 'row', backgroundColor: '#E8EAED', width: '100%', marginVertical: 20, borderRadius: 100 }} >
        <View style={{ flexDirection: 'row' }} >
          <Icon size={25} name='magnify' color='black' style={{ alignSelf: 'center', paddingLeft: 15 }} />
          <TextInput
            style={styles.search}
            placeholder='Cari nama penghuni/nomor kamar'
            placeholderTextColor='#ccc'
            onChangeText={setSearch}
            value={search}
          />
        </View>
        <TouchableOpacity style={{ alignSelf: 'center', padding: 5 }} onPress={() => setSearch('')}>
          <Icon size={20} name='close' color='#ccc' style={{ alignSelf: 'center' }} />
        </TouchableOpacity>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={{ width: '100%' }}
        renderTabBar={renderTabBar}
      />
      { role == 'Penghuni' ?
          <TouchableOpacity style={{ backgroundColor: '#FF7A00', borderRadius: 100, padding: 10, position: 'absolute', right: 20, bottom: 40 }} onPress={() => goToCreateKeluhan()} >
            <Icon size={35} name='plus' color='white' style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
        :
          null
      }
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Tandai sebagai selesai</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Apakah Anda yakin untuk tandai keluhan ini telah selesai teratasi?</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => updateKeluhan()}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Ya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginTop: 10, width: 150 }} onPress={() => setModal(false)}>
            <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Kembali</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  search: {
    height: 40,
    width: '80%',
    alignSelf:  'center',
    color: 'black'
  }
});

export default KeluhanListScreen;