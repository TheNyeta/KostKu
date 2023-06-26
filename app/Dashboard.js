import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/id'
import { UpdateContext } from './GlobalState';
import { useIsFocused } from '@react-navigation/native';


const DashboardPage = ({navigation}) => {
  const [data, setData] = useState({})
  // const [dataJatuhTempo, setDataJatuhTempo] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdate, setIsUpdate] = useContext(UpdateContext)
  // const [refreshing, setRefreshing] = useState(false)
  const isFocused = useIsFocused()
  var jatuhtempo = []

  useEffect(() => {
    // init()
    if (isFocused) {
      if (isUpdate.updateDashboard == true) {
        setIsLoading(true)
        init()
      }
    }
  }, [isFocused])

  const init = () => {
    // setIsLoading(true)
    AsyncStorage.getItem('@kost_data').then((data) => {
      const value = JSON.parse(data)
      axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=rumahAll&RumahID=${value.Rumah_ID}`)
      .then(({data}) => {
        if (data.error.msg == '') {
          console.log(data.data.DataRumah.Rumah_Image, 'test')
          setData(data.data)
          setIsLoading(false)
          setIsUpdate({
            ...isUpdate,
            updateDashboard: false
          })
          // setRefreshing(false)
        }
      }).catch((e) => {
        console.log(e, 'error dashboard')
      })
    })

  }

  const goToRatingList = () => {
    navigation.navigate('RatingList', {dataRumah: data.DataRumah, ratings: data.DataRating })
  }

  const goToRoomGroupList = () => {
    navigation.navigate('RoomGroupList', {dataRumah: data.DataRumah})
  }

  const goToEmptyRoomList = () => {
    navigation.navigate('EmptyRoomList', {dataRumah: data.DataRumah})
  }

  const goToJatuhTempoList = () => {
    navigation.navigate('JatuhTempoList', {dataRumah: data.DataRumah, jatuhTempo: jatuhtempo})
  }

  const goToNewPenghuniList = () => {
    navigation.navigate('NewPenghuniList', {dataRumah: data.DataRumah})
  }

  const goToKeluhanList = () => {
    navigation.navigate('KeluhanList', {dataRumah: data.DataRumah})
  }

  const goToLaporanList = () => {
    navigation.navigate('LaporanList', {dataRumah: data.DataRumah})
  }

  const goToBroadcast = () => {
    navigation.navigate('Broadcast', {dataRumah: data.DataRumah, kostImage: data.DataRumah.Rumah_Image})
  }

  const averageRating = (rating) => {
    if (rating == null) {
      return 0;
    }
    let sum = 0
    rating.map((item) => {
      sum = sum + item.Nilai_Rating
    })

    return (sum/rating.length).toFixed(1)
  }

  const newKeluhan = (keluhan) => {
    let count = 0
    keluhan.forEach((item) => {
      if (item.Status_Keluhan == 'Dilaporkan') {
        count = count + 1
      }
    })

    return count
  }

  const newLaporan = (laporan) => {
    let count = 0
    laporan.forEach((item) => {
      if (item.Status_Laporan == 'Dilaporkan') {
        count = count + 1
      }
    })

    return count
  }

  const getTodayEvent = () => {
    let now = moment().format('YYYY-MM-DD')
    let eventmsg = ''

    if (data.DataEvent == null) {
      return 'Tidak ada agenda'
    }

    data.DataEvent.forEach((item) => {
      if (item.Event_Tanggal == now) {
        if (eventmsg == '') {
          eventmsg = eventmsg + item.Event_Nama
        } else {
          eventmsg = eventmsg + `, ${item.Event_Nama}`
        }
      }
    })

    return eventmsg == '' ? 'Tidak ada agenda' : eventmsg

    // data.DaftarKamarTerisi.forEach((item) => {
    //   if (item.Tanggal_Masuk)
    // })
  }

  const jatuhTempoCount = () => {
    let now = moment()
    let jatuhTempo = [];
    data.DataKamarTerisi.forEach((item) => {
      if (moment(item.Tanggal_Berakhir, 'YYYY MM DD').isBefore(now)) {
        jatuhTempo.push(item)
      }
    })

    jatuhtempo = jatuhTempo
    return jatuhTempo.length
  }

  return (
    <View style={{ flex:1 }}>
      <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={isLoading} colors={['#FFB700']} onRefresh={() => {setIsLoading(true); init()}} />} >
        { isLoading ? 
          <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center' }} />
          :
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }} >
            <View style={{}} >
              <Text style={{ color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold' }}>{data.DataRumah.Nama_Rumah}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>#{data.DataRumah.Special_Code} </Text>
                <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular' }}>| {data.DataRumah.Kota_Name}</Text>
                {data.DataRating == null ? 
                  null
                  :
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => goToRatingList()} >
                    <Icon size={15} name='star' color='#FFB700' style={{ alignSelf: 'center', paddingHorizontal: 2 }} />
                    <Text style={{ color: '#FFB700', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>{averageRating(data.DataRating)}</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
            <Image source={data.DataRumah.Rumah_Image == '' ? require('../assets/image/RumahKost_Default.png') : { uri: data.DataRumah.Rumah_Image }} style={{ height: 50, width: 50, borderRadius: 100}} />
            {/* <Image source={data.DataRumah.Rumah_Image == '' ? require('../assets/image/RumahKost_Default.png') : { uri: data.DataRumah.Rumah_Image + '&' + new Date() }} style={{ height: 50, width: 50, borderRadius: 100}} /> */}
          </View>
        }
        { isLoading ? 
          <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
          :
          <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginVertical: 20, padding: 10, borderRadius: 10, backgroundColor: 'white', elevation: 5 }} onPress={() => navigation.jumpTo('Calendar')} >
            <Icon size={30} name='calendar' color='#FFB700' style={{ alignSelf: 'center', paddingRight: 10 }} />
            <View style={{ flexDirection: 'column', width: '100%' }} >
              <Text style={{ color: '#FFB700', fontSize: 15, fontFamily: 'PlusJakartaSans-SemiBold' }} >{moment().format('dddd, D MMMM YYYY')}</Text>
              <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '90%' }} numberOfLines={1} >{getTodayEvent()}</Text>
            </View>
          </TouchableOpacity>
        }
        { isLoading ? 
          <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
          :
          <View style={{ flexDirection: 'column', width: '100%' }} >
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 20 }} >
              <TouchableOpacity style={{ flexDirection: 'column', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '47%' }} onPress={() => goToEmptyRoomList()} >
                <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center' }} >
                  <Icon size={25} name='door' color='#FFB700' style={{ alignSelf: 'center' }} />
                </View>
                <Text style={{ color: 'white', fontSize: 35, fontFamily: 'PlusJakartaSans-Bold' }}>{data.DataKamarKosong == null ? 0 : data.DataKamarKosong.length}</Text>
                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>Kamar kosong</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'column', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '47%' }} onPress={() => goToRoomGroupList()} >
                <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center' }} >
                  <Icon size={25} name='account-multiple' color='#FFB700' style={{ alignSelf: 'center' }} />
                </View>
                <Text style={{ color: 'white', fontSize: 35, fontFamily: 'PlusJakartaSans-Bold' }}>{data.DataKamarTerisi == null ? 0 : data.DataKamarTerisi.length}</Text>
                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>Jumlah penghuni</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: 20 }} onPress={() => goToJatuhTempoList()} >
              <View style={{ flexDirection: 'column' }} >
                <Text style={{ color: 'white', fontSize: 35, fontFamily: 'PlusJakartaSans-Bold' }}>{data.DataKamarTerisi == null ? 0 : jatuhTempoCount()}</Text>
                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>Kamar jatuh tempo</Text>
              </View>
              <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center' }} >
                <Icon size={25} name='calendar' color='#FFB700' style={{ alignSelf: 'center' }} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '100%', alignItems: 'center' }} onPress={() => goToNewPenghuniList()} >
              <View style={{ flexDirection: 'column' }} >
                <Text style={{ color: 'white', fontSize: 35, fontFamily: 'PlusJakartaSans-Bold' }}>{data.DataOrder == null ? 0 : data.DataOrder.length}</Text>
                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>Penghuni baru</Text>
              </View>
              <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center' }} >
                <Icon size={25} name='account-search-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
              </View>
            </TouchableOpacity>
          </View>
        }
        <Text style={{ color: 'black', fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', alignSelf: 'flex-start', marginVertical: 20 }}>Notifikasi</Text>
        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, padding: 15, borderRadius: 10, backgroundColor: 'white', elevation: 5 }} onPress={() => goToKeluhanList()} >
          <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Keluhan dari penghuni</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            { isLoading ? 
              <ActivityIndicator color={'#FFB700'} size={30} style={{ alignSelf: 'center' }} />
              :
              data.DataKeluhan == null ? null : newKeluhan(data.DataKeluhan) == 0 ? null :
              <View style={{ backgroundColor: data.DataKeluhan.length > 99 ? '#CC3300' : data.DataKeluhan.length < 50 ? '#FFCC00' : '#FF7A00', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 10, width: 40, alignItems: 'center' }} >
                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >{newKeluhan(data.DataKeluhan)}</Text>
              </View>
            }
            <Icon size={40} name='chevron-right' color='black' style={{ alignSelf: 'center' }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, padding: 15, borderRadius: 10, backgroundColor: 'white', elevation: 5 }} onPress={() => goToLaporanList()} >
          <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Laporan kost</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            { isLoading ? 
              <ActivityIndicator color={'#FFB700'} size={30} style={{ alignSelf: 'center' }} />
              :
              data.DataLaporan == null ? null : newLaporan(data.DataLaporan) == 0 ? null :
              <View style={{ backgroundColor: data.DataLaporan.length > 99 ? '#CC3300' : data.DataLaporan.length < 50 ? '#FFCC00' : '#FF7A00', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 10, width: 40, alignItems: 'center' }} >
                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >{newLaporan(data.DataLaporan)}</Text>
              </View>
            }
            <Icon size={40} name='chevron-right' color='black' style={{ alignSelf: 'center' }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, padding: 15, borderRadius: 10, backgroundColor: 'white', elevation: 5, marginBottom: 80 }} onPress={() => goToBroadcast()} >
          <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Pesan broadcast</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            {/* <View style={{ backgroundColor: '#CC3300', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 10 }} >
              <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >99+</Text>
            </View> */}
            <Icon size={40} name='chevron-right' color='black' style={{ alignSelf: 'center' }} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20
  }
});

export default DashboardPage;