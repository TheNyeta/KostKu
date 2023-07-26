import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TabView, TabBar } from 'react-native-tab-view';
import Modal from 'react-native-modal';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id'

const LaporanListScreen = ({navigation, route}) => {
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [data3, setData3] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  //react tab view
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: 'first', title: role == 'Penghuni' ? 'Dilaporkan' : 'Semua' },
    { key: 'second', title: role == 'Penghuni' ? 'Diterima' : 'Pembayaran' },
    { key: 'third', title: 'Ditolak' },
  ]);
  const dataRumah = route.params.dataRumah
  const role = route.params.role
  const dataPenghuni = route.params.dataPenghuni
  const dataKamar = route.params.dataKamar

  useEffect(() => {
    init()
    if (role == 'Penjaga') {
      setRoutes([
        { key: 'first', title: 'Semua' },
        { key: 'second', title: 'Ditolak' },
      ])
    } else {
      setRoutes([
        { key: 'first', title: role == 'Penghuni' ? 'Dilaporkan' : 'Semua' },
        { key: 'second', title: role == 'Penghuni' ? 'Diterima' : 'Pembayaran' },
        { key: 'third', title: 'Ditolak' },
      ])
    }
  }, [])

  const init = () => {
    let url = ''
    setIsLoading(true)

    if (role == 'Penghuni') {
      url = `https://api-kostku.pharmalink.id/skripsi/kostku?find=laporan&RumahID=${dataRumah.Rumah_ID}&PenghuniID=${dataPenghuni.Penghuni_ID}`
    } else {
      url = `https://api-kostku.pharmalink.id/skripsi/kostku?find=laporan&RumahID=${dataRumah.Rumah_ID}`
    }

    axios.get(url)
      .then(({data}) => {
        if (data.error.msg == '' && data.data != null) {
          let data1 = []
          let data2 = []
          let data3 = []

          if (role == 'Penghuni') {
            data.data.forEach((item) => {
              if (item.Status_Laporan == 'Ditolak') {
                data3.push(item)
              } else if (item.Status_Laporan == 'Diterima') {
                data2.push(item)
              } else {
                data1.push(item)
              }
            })
          } else if (role == 'Pengelola') {
            data.data.forEach((item) => {
              if (item.Status_Laporan == 'Ditolak') {
                data3.push(item)
              } else if (item.Status_Laporan == 'Dilaporkan') {
                if (item.Perihal_Laporan == 'Pembayaran') {
                data2.push(item)
                }
                data1.push(item)
              }
            })
          } else {
            data.data.forEach((item) => {
              if (item.Perihal_Laporan != 'Pembayaran') {
                if (item.Status_Laporan == 'Ditolak') {
                  data2.push(item)
                } else {
                  data1.push(item)
                }
              }
            })
          }

          setData1(data1.reverse())
          setData2(data2.reverse())
          setData3(data3.reverse())
          // setRefreshing(false)
        }
        setIsLoading(false)
      }).catch((e) => {
        console.log(e, 'error get laporan')
      })
  }

  const goBack = () => {
    navigation.goBack()
  }
  
  const goToLaporanDetail = (item) => {
    navigation.navigate('LaporanDetail', {laporan: item, dataRumah: dataRumah, role: role})
  }

  const goToCreateLaporan = (item) => {
    navigation.navigate('CreateLaporan', {dataRumah: dataRumah, dataPenghuni: dataPenghuni, dataKamar: dataKamar})
  }

  const formatDate = (date) => {
    // moment.locale('id')
    return moment(date, 'YYYY/M/D').format('dddd, D MMMM YYYY')
  }

  const RoomItem = ({item}) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'center', justifyContent: 'space-between' }} onPress={() => goToLaporanDetail(item)} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#FFB700', padding: 8, borderRadius: 10, width: '22%', alignItems: 'center' }} >
            <Text style={{ color: 'white', fontFamily: 'UbuntuTitling-Bold', fontSize: 20 }} >{item.Kamar_Nomor}</Text>
          </View>
          <View style={{ marginLeft: 5, width: '65%' }} >
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15 }} numberOfLines={1} >{item.Perihal_Laporan}</Text>
            <View style={{flexDirection: 'row', width: '100%' }} >
              <Icon size={15} name={item.Perihal_Laporan == 'Pembayaran' ? 'calendar-blank-outline' : 'account-multiple' } color='black' style={{ alignSelf: 'center', paddingHorizontal: 4 }} />
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} numberOfLines={1} >{item.Perihal_Laporan == 'Pembayaran' ? item.Tanggal_Laporan : item.Perihal_Laporan == 'Info Keluar Kost' ? item.Penghuni_Name : item.Pesan_Laporan }</Text>
            </View>
          </View>
        </View>
        <Icon size={30} name='chevron-right' color='#FFB700' style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
    )
  }

  const renderItem = ({item}) => {
    if (search == '') {
      return <RoomItem item={item}/>
    } 
    if (item.Kamar_Nomor.toLowerCase().includes(search.toLowerCase()) || item.Pesan_Laporan.toLowerCase().includes(search.toLowerCase())) {
      return <RoomItem item={item}/>
    }
  }

  const FirstRoute = () => { 
    return (
      isLoading ? 
        <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
      :
        <View>
          <FlatList
            data={data1}
            renderItem={({item}) => <RoomItem item={item}/>}
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
            renderItem={({item}) => <RoomItem item={item}/>}
            style={{ width: '100%', marginVertical: 10 }}
            ListEmptyComponent={<Image source={require('../assets/image/EmptyStateImg_General.png')} style={{ alignSelf: 'center', width: 150, height: 150, marginTop: 50 }} />}
          /> 
        </View>
    )
  };

  const ThirdRoute = () => { 
    return (
      isLoading ? 
        <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
      :
        <View>
          <FlatList
            data={data3}
            renderItem={renderItem}
            style={{ width: '100%', marginVertical: 10 }}
            ListEmptyComponent={<Image source={require('../assets/image/EmptyStateImg_General.png')} style={{ alignSelf: 'center', width: 150, height: 150, marginTop: 50 }} />}
          />
        </View>
    )
  };

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
        return <FirstRoute />;
      case 'second':
        return <SecondRoute />;
      case 'third':
        return <ThirdRoute />;
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
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >Laporan kost</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >{role == 'Penghuni' ? 'Kirim laporan ke pengelola kost' : 'Klik nomor untuk melihat detail'}</Text>
          </View>
        </View>
        { role == 'Penghuni' ?
            <Image source={dataPenghuni.Penghuni_Image == '' ? require('../assets/image/RumahKost_Default.png') : { uri: dataPenghuni.Penghuni_Image }} style={{ height: 50, width: 50, borderRadius: 100}} />
          :
            <Image source={dataRumah.Rumah_Image == '' ? require('../assets/image/RumahKost_Default.png') : { uri: dataRumah.Rumah_Image }} style={{ height: 50, width: 50, borderRadius: 100}} />
        }
      </View>
      {/* <View style={{ flexDirection: 'row', backgroundColor: '#E8EAED', width: '100%', marginVertical: 20, borderRadius: 100 }} >
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
      </View> */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={{ width: '100%' }}
        renderTabBar={renderTabBar}
      />
      { role == 'Penghuni' ?
          <TouchableOpacity style={{ backgroundColor: '#FF7A00', borderRadius: 100, padding: 10, position: 'absolute', right: 20, bottom: 40 }} onPress={() => goToCreateLaporan()} >
            <Icon size={35} name='plus' color='white' style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
        :
          null
      }
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

export default LaporanListScreen;