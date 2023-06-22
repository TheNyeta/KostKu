import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TabView, TabBar } from 'react-native-tab-view';
import Modal from 'react-native-modal';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id'
import RadioGroup from 'react-native-radio-buttons-group';

const EmptyRoomListScreen = ({navigation, route}) => {
  const [dataKelompok, setDataKelompok] = useState([])
  const [dataKamarKosong, setDataKamarKosong] = useState([])
  const [dataKamarTBD, setDataKamarTBD] = useState([])
  const [kelompok, setKelompok] = useState('')
  const [radio, setRadio] = useState([])
  const [data2, setData2] = useState('')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const [isKelompokLoading, setIsKelompokLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedId, setSelectedId] = useState(0)
  const dataRumah = route.params.dataRumah
  const kostImage = dataRumah.Rumah_Image

  useEffect(() => {
    init()
  }, [])


  const init = () => {
    // setIsLoading(true)
    axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=kamarKelompok&RumahID=${dataRumah.Rumah_ID}`)
      .then(({data}) => {
        if (data.error.msg == '' && data.data != null) {

          setDataKelompok(data.data)

          let radio = []
          let id = 0
          data.data.forEach((item) => {
            let button = {
              id: id,
              label: item.KelompokKamar_Nama,
              labelStyle: { color: 'black', fontSize: 16, fontFamily: 'PlusJakartaSans-Regular' },
              containerStyle: { paddingVertical: 2 },
              value: item.KelompokKamar_Nama,
              color: '#FFB700'
            }
            radio.push(button)
            id = id + 1
          })

          setRadio(radio)
          setKelompok(radio[selectedId].label)
        }
        setIsKelompokLoading(false)
      }).catch((e) => {
        console.log(e, 'error get kelompok kamar kosong')
      })
  }

  useEffect(() => {
    getKamar()
  }, [kelompok])

  const getKamar = () => {
    console.log(kelompok, 'test aja')
    setIsLoading(true)
    axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=KamarKelompok&RumahID=${dataRumah.Rumah_ID}&KamarKelompok=${kelompok}`)
      .then(({data}) => {
        if (data.error.msg == '') {
          setDataKamarKosong(data.data.DataKamarKosong)
          setDataKamarTBD(data.data.DataKamarTidakDipakai)
        }
        setIsLoading(false)
      }).catch((e) => {
        console.log(e, 'error get kamar kosong')
      })
  }

  const goBack = () => {
    navigation.goBack()
  }

  const waktuKosong = (time) => {
    const now = moment()
    const broadcastDate = time
    const range = moment.range(broadcastDate, now)

    const daydiff = range.diff('day')
    const monthdiff = range.diff('month')

    if (monthdiff > 0) return `${monthdiff} Bulan`

    return `${daydiff} Hari`
  }

  const formatHarga = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(price)
  }

  const RoomItem = ({item}) => {
    return (
      <View style={{ flexDirection: 'row', paddingVertical: 8 }} >
        <View style={{ backgroundColor: item.Kamar_Status == 'Kosong' ? '#FFDB80' : '#D1D5DB' , padding: 10, borderRadius: 15, width: 75, alignItems: 'center'}} >
          <Text style={{ color: 'white', fontFamily: 'UbuntuTitling-Bold', fontSize: 20 }} >{item.Kamar_Nomor}</Text>
        </View>
        <View style={{ marginHorizontal: 5, width: '42%' }} >
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15 }} >{item.Kamar_Status}</Text>
          <View style={{flexDirection: 'row' }} >
            <Icon size={15} name='clock-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 4 }} />
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} >{waktuKosong(item.Kamar_lastupdate)}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }} >
          <Icon size={15} name='cash-multiple' color='black' style={{ paddingHorizontal: 4 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} >{formatHarga(item.Kamar_Harga)}</Text>
        </View>
      </View>
    )
  }

  const FirstRoute = () => { 
    return (
      isLoading ? 
        <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
      :
        <View>
          <FlatList
            data={dataKamarKosong}
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
            data={dataKamarTBD}
            renderItem={({item}) => <RoomItem item={item}/>}
            style={{ width: '100%', marginVertical: 10 }}
            ListEmptyComponent={<Image source={require('../assets/image/EmptyStateImg_General.png')} style={{ alignSelf: 'center', width: 150, height: 150, marginTop: 50 }} />}
          />
        </View>
    )
  };

  //react tab view
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Kosong' },
    { key: 'second', title: 'Tidak Bisa Digunakan' },
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
        return <FirstRoute />;
      case 'second':
        return <SecondRoute />;
      default:
        return null;
    }
  };

  const pilihKelompok = () => {
    setModal(false)
    setKelompok(radio[selectedId].label)
    // getKamar()
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
      <View style={{flexDirection: 'row', alignItems: 'center' }} >
          <TouchableOpacity onPress={() => goBack()} >
            <Icon size={25} name='arrow-left' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >Kamar Kosong</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Daftar kamar kosong</Text>
          </View>
        </View>
        <Image source={kostImage == '' ? require('../assets/image/RumahKost_Default.png') : { uri: kostImage }} style={{ height: 50, width: 50, borderRadius: 100}} />
      </View>
      { isKelompokLoading ? 
          <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
        :
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', width: '100%', marginVertical: 20, paddingVertical: 5, borderRadius: 10, borderColor: '#FFB700', borderWidth: 1 }} onPress={() => setModal(true)} disabled={dataKelompok == null ? true : false}>
            <View style={{ flexDirection: 'row' }} >
              <Icon size={25} name='door' color='#FFB700' style={{ alignSelf: 'center', paddingHorizontal: 15 }} />
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >{dataKelompok == null ? 'Tidak ada kelompok kamar' : kelompok }</Text>
            </View>
            <Icon size={25} name='chevron-down' color='#ccc' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
          </TouchableOpacity>
      }
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={{ width: '100%' }}
        renderTabBar={renderTabBar}
      />
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: 'white', width: 300, padding: 20, borderRadius: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Text style={{fontSize: 20, fontFamily: 'PlusJakartaSans-SemiBold', color: 'black', textAlign: 'center' }} >Kelompok kamar</Text>
            <TouchableOpacity onPress={() => setModal(false)}>
              <Icon size={30} name='close' color='lightgray' style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          </View>
          <RadioGroup 
            radioButtons={radio} 
            onPress={setSelectedId}
            selectedId={selectedId}
            containerStyle={{ alignItems: 'flex-start' }}
          />
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150, alignSelf: 'center' }} onPress={() => pilihKelompok()}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Pilih</Text>
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

export default EmptyRoomListScreen;