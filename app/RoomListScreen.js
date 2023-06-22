import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id'

const RoomListScreen = ({navigation, route}) => {
  const [search, setSearch] = useState('')
  const [dataKamar, setDataKamar] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const dataRumah = route.params.dataRumah
  const kostImage = dataRumah.Rumah_Image
  const namaKelompok = route.params.namaKelompok

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    setIsLoading(true)
    axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=kamar&RumahID=${dataRumah.Rumah_ID}&KamarKelompok=${namaKelompok}`)
      .then(({data}) => {
        if (data.error.msg == '') {
          setDataKamar(data.data)
        }
        setIsLoading(false)
      }).catch((e) => {
        console.log(e, 'error get laporan')
      })
  }

  const goBack = () => {
    navigation.goBack()
  }

  const goToCreateRoom = () => {
    navigation.navigate('CreateRoom', {dataRumah: dataRumah, namaKelompok: namaKelompok})
  }

  const goToRoomDetail = (kamar) => {
    navigation.navigate('RoomDetail', {kamar: kamar, namaKelompok: namaKelompok, dataRumah: dataRumah,})
  }

  const formatHarga = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(price)
  }

  const RoomItem = ({item}) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 8 }} onPress={() => goToRoomDetail(item)} >
        <View style={{ backgroundColor: item.Kamar_Status == 'Kosong' ? '#FFDB80' : item.Kamar_Status == 'Tidak Disewakan' ? '#D1D5DB' : '#FFB700', padding: 10, borderRadius: 15, width: 80, alignItems: 'center' }} >
          <Text style={{ color: 'white', fontFamily: 'UbuntuTitling-Bold', fontSize: 20 }} >{item.Kamar_Nomor}</Text>
        </View>
        <View style={{ marginHorizontal: 5, width: '42%' }} >
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15 }} >{item.Kamar_Status == 'Kosong' ? 'Kosong' : item.Kamar_Status == 'Tidak Disewakan' ? 'Tidak Bisa Digunakan' : item.DataPenghuni.Penghuni_Name}</Text>
          <View style={{flexDirection: 'row' }} >
            <Icon size={15} name='calendar-blank-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 4 }} />
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} >{item.Kamar_Status == 'Terisi' ? moment(item.Tanggal_Masuk, 'YYYY MM DD').format('D MMMM') : 'n/a'}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }} >
          <Icon size={15} name='cash-multiple' color='black' style={{ paddingHorizontal: 4 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} >{formatHarga(item.Kamar_Harga)}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderItem = ({item}) => {
    return (
      <RoomItem
        item={item}
      />
    )
  }

  const jumlahPenghuni = (data) => {
    let count = 0
    data.forEach((item) => {
      if (item.Kamar_Status == 'Terisi') {
        count = count + 1
      }
    })
    return count
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => goBack()} >
            <Icon size={25} name='arrow-left' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >Daftar Kamar</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >{namaKelompok}</Text>
          </View>
        </View>
        <Image source={kostImage == '' ? require('../assets/image/RumahKost_Default.png') : { uri: kostImage }} style={{ height: 50, width: 50, borderRadius: 100}} />
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
      { isLoading ? 
          <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
        : 
          dataKamar == null ?
            <Image source={require('../assets/image/EmptyStateImg_General.png')} style={{ alignSelf: 'center', width: 150, height: 150, marginTop: 50 }} />
          :
            <>
              <View style={{ flexDirection: 'column', width: '100%' }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }} >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon size={25} name='door' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
                    <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black'}} >Jumlah kamar</Text>
                  </View>
                  <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black'}} >{dataKamar.length}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }} >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon size={25} name='account-multiple' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
                    <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black'}} >Jumlah penghuni</Text>
                  </View>
                  <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black'}} >{jumlahPenghuni(dataKamar)}</Text>
                </View>
              </View>
              <FlatList
                data={dataKamar}
                renderItem={renderItem}
                style={{ width: '100%', marginBottom: 10 }}
              />
            </>
      }
      <TouchableOpacity style={{ backgroundColor: '#FF7A00', borderRadius: 100, padding: 10, position: 'absolute', right: 20, bottom: 40 }} onPress={() => goToCreateRoom()} >
        <Icon size={35} name='plus' color='white' style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingBottom: 0
  },
  search: {
    height: 40,
    width: '80%',
    alignSelf:  'center',
    color: 'black'
  }
});

export default RoomListScreen;