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


const DashboardPenghuniPage = ({navigation}) => {
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
    AsyncStorage.getItem('@user_data').then((data) => {
      const value = JSON.parse(data)
      axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=penghuniDashboard&PenghuniID=${value.Penghuni_ID}`)
      .then(({data}) => {
        console.log(data, 'data')
        if (data.error.msg == '') {
          setData(data.data)
          setIsUpdate({
            ...isUpdate,
            updateDashboard: false
          })
          // setRefreshing(false)
        }
        setIsLoading(false)
      }).catch((e) => {
        console.log(e, 'error dashboard')
      })
    })

  }

  const BroadcastItem = ({item}) => {
    return (
      <View style={{ flexDirection: 'column', padding: 15, backgroundColor: 'white', elevation: 5, marginVertical: 10, width: '100%', borderRadius: 15, alignItems: 'center' }} >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%' }} >
          <View style={{ backgroundColor: '#EFF1F3', padding: 10, borderRadius: 100 }} >
            <Icon size={25} name='message-text-outline' color='#FFB700' style={{  }} />
          </View>
          <View style={{ marginHorizontal: 5, width: '70%' }} >
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15 }} >{item.Judul_Broadcast}</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} >{item.Tanggal_Buat} - {item.Jam_Buat}</Text>
          </View>
        </View>
        <View style={{ alignSelf: 'flex-start' }} >
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 15, marginVertical: 10 }} >{item.Pesan_Broadcast}</Text>
        </View>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '45%', borderRadius: 7, marginTop: 20 }} onPress={() => goToBroadcastDetail(item)}>
          <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Lihat Pesan</Text>
        </TouchableOpacity>
      </View>
      
    )
  }
  
  const goToPusatInformasi = () => {
    navigation.navigate('PusatInformasi', {dataRumah: data.DataRumah, enter: false, dataPenghuni: data.DataPenghuni})
  }
  
  const goToPaymentLogList = () => {
    navigation.navigate('PaymentLogList', {dataRumah: data.DataRumah, dataPenghuni: data.DataPenghuni, dataKamar: data.DataKamar, role: 'Penghuni'})
  }
  
  const goToPaymentDetail = () => {
    navigation.navigate('PaymentDetail', {kamar: data.DataKamar})
  }
  
  const goToKeluhanList = () => {
    navigation.navigate('KeluhanList', {dataRumah: data.DataRumah, dataPenghuni: data.DataPenghuni, dataKamar: data.DataKamar, role: 'Penghuni'})
  }
  
  const goToLaporanList = () => {
    navigation.navigate('LaporanList', {dataRumah: data.DataRumah, dataPenghuni: data.DataPenghuni, dataKamar: data.DataKamar, role: 'Penghuni'})
  }
  
  const goToBroadcast = () => {
    navigation.navigate('Broadcast', {dataRumah: data.DataRumah, dataPenghuni: data.DataPenghuni,  role: 'Penghuni'})
  }

  const goToBroadcastDetail = (item) => {
    // Code to handle login
    navigation.navigate('BroadcastDetail', {dataRumah: data.DataRumah, broadcast: item})
  }
  
  const goToCreateRating = () => {
    navigation.navigate('CreateRating', {dataRumah: data.DataRumah, dataPenghuni: data.DataPenghuni, dataKamar: data.DataKamar })
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

  return (
    <View style={{ flex:1 }}>
      <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={isLoading} colors={['#FFB700']} onRefresh={() => {setIsLoading(true); init()}} />} >
        { isLoading ? 
          <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center' }} />
          :
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }} >
            <View style={{}} >
              <Text style={{ color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold' }}>{`Halo, ${data.DataPenghuni.Penghuni_Name}`}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                {/* <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular' }}>{data.DataRumah.Nama_Rumah}</Text> */}
                {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => goToRatingList()} > */}
                  <Icon size={20} name='door' color='#FFB700' style={{ alignSelf: 'center', paddingHorizontal: 2 }} />
                  {/* <Text style={{ color: '#FFB700', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>{data.DataKamar.Kamar_Nomor}</Text> */}
                {/* </TouchableOpacity> */}
              </View>
            </View>
            <Image source={data.DataPenghuni.Penghuni_Image == '' ? require('../assets/image/Large.png') : { uri: data.DataPenghuni.Penghuni_Image }} style={{ height: 50, width: 50, borderRadius: 100}} />
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
            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: 20 }} onPress={() => goToPaymentLogList()} >
              <View style={{ flexDirection: 'column' }} >
                {/* <Text style={{ color: 'white', fontSize: 35, fontFamily: 'PlusJakartaSans-Bold' }}>{moment(data.DataKamar.Tanggal_Berakhir, 'YYYY MM DD').format('D MMMM')}</Text> */}
                {/* <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>Jatuh tempo pembayaran</Text> */}
              </View>
              <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center' }} >
                <Icon size={25} name='calendar' color='#FFB700' style={{ alignSelf: 'center' }} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '100%', alignItems: 'center' }} onPress={() => goToPaymentDetail()} >
              <View style={{ flexDirection: 'column' }} >
                {/* <Text style={{ color: 'white', fontSize: 35, fontFamily: 'PlusJakartaSans-Bold' }}>{data.DataKamar.Kamar_Harga}</Text> */}
                {/* <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>Jumlah bayaran</Text> */}
              </View>
              <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center' }} >
                <Icon size={25} name='cash-multiple' color='#FFB700' style={{ alignSelf: 'center' }} />
              </View>
            </TouchableOpacity>
          </View>
        }
        <Text style={{ color: 'black', fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', alignSelf: 'flex-start', marginVertical: 20 }}>Pesan broadcast</Text>
        { data.DataBroadcast == null ?
            null
          :
            <BroadcastItem item={data.DataBroadcast.at(-1)} />
        }
        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, padding: 15, borderRadius: 10, backgroundColor: 'white', elevation: 5 }} onPress={() => goToBroadcast()} >
          <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Pesan broadcast</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            {/* <View style={{ backgroundColor: '#CC3300', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 10 }} >
              <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >99+</Text>
            </View> */}
            <Icon size={40} name='chevron-right' color='black' style={{ alignSelf: 'center' }} />
          </View>
        </TouchableOpacity>
        <Text style={{ color: 'black', fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', alignSelf: 'flex-start', marginVertical: 20 }}>Info rumah kost</Text>
        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, padding: 15, borderRadius: 10, backgroundColor: 'white', elevation: 5 }} onPress={() => goToPusatInformasi()} >
          <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Pusat informasi</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            {/* <View style={{ backgroundColor: '#CC3300', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 10 }} >
              <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >99+</Text>
            </View> */}
            <Icon size={40} name='chevron-right' color='black' style={{ alignSelf: 'center' }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, padding: 15, borderRadius: 10, backgroundColor: 'white', elevation: 5 }} onPress={() => goToKeluhanList()} >
          <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Laporan keluhan</Text>
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
        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, padding: 15, borderRadius: 10, backgroundColor: 'white', elevation: 5, marginBottom: 80 }} onPress={() => goToCreateRating()} >
          <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Beri rating & ulasan kost</Text>
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

export default DashboardPenghuniPage;