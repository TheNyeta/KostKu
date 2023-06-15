import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DashboardPage = ({navigation}) => {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    setIsLoading(true)
    AsyncStorage.getItem('@kost_data').then((data) => {
      const value = JSON.parse(data)
      axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=rumahAll&RumahID=${value.Rumah_ID}`)
      .then(({data}) => {
        if (data.error.msg == '') {
          setData(data.data)
          setIsLoading(false)
          // setRefreshing(false)
        }
      }).catch((e) => {
        console.log(e, 'error dashboard')
      })
    })

  }

  const goToRatingList = () => {
    navigation.navigate('RatingList', {ratings: data.DataRating})
  }

  const goToRoomGroupList = () => {
    navigation.navigate('RoomGroupList')
  }

  const goToEmptyRoomList = () => {
    navigation.navigate('EmptyRoomList')
  }

  const goToJatuhTempoList = () => {
    navigation.navigate('JatuhTempoList')
  }

  const goToKeluhanList = () => {
    navigation.navigate('KeluhanList', {rumahId: data.DataRumah.Rumah_ID})
  }

  const goToLaporanList = () => {
    navigation.navigate('LaporanList')
  }

  const goToBroadcast = () => {
    navigation.navigate('Broadcast')
  }

  const averageRating = (rating) => {
    let sum = 0
    rating.map((item) => {
      sum = sum + item.Nilai_Rating
    })

    return sum/rating.length
  }

  return (
    <View style={{ flex:1 }}>
      <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} colors={['#FFB700']} onRefresh={() => {setRefreshing(true); init()}} />} >
        { isLoading ? 
          <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
          :
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }} >
            <View style={{}} >
              <Text style={{ color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold' }}>{data.DataRumah.Nama_Rumah}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>#{data.DataRumah.Special_Code} </Text>
                <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular' }}>| {data.DataRumah.Kota_Name}</Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => goToRatingList()} >
                  <Icon size={15} name='star' color='#FFB700' style={{ alignSelf: 'center', paddingHorizontal: 2 }} />
                  <Text style={{ color: '#FFB700', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>{averageRating(data.DataRating)}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Image source={require('../assets/image/Large.png')} style={{height: 50, width: 50}} />
          </View>
        }
        { isLoading ? 
          <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
          :
          <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginVertical: 20, padding: 10, borderRadius: 10, backgroundColor: 'white', elevation: 5 }} >
            <Icon size={30} name='calendar' color='#FFB700' style={{ alignSelf: 'center', paddingRight: 10 }} />
            <View style={{ flexDirection: 'column', width: '100%' }} >
              <Text style={{ color: '#FFB700', fontSize: 15, fontFamily: 'PlusJakartaSans-SemiBold' }} >{new Date().toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric'})}</Text>
              <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '90%' }} numberOfLines={1} >test aja ini mah ya makasi</Text>
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
                <Text style={{ color: 'white', fontSize: 35, fontFamily: 'PlusJakartaSans-Bold' }}>{data.DataKamarKosong.length}</Text>
                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>Kamar kosong</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'column', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '47%' }} onPress={() => goToRoomGroupList()} >
                <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center' }} >
                  <Icon size={25} name='account-multiple' color='#FFB700' style={{ alignSelf: 'center' }} />
                </View>
                <Text style={{ color: 'white', fontSize: 35, fontFamily: 'PlusJakartaSans-Bold' }}>{data.DataKamarTerisi.length}</Text>
                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>Jumlah penghuni</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: 20 }} onPress={() => goToJatuhTempoList()} >
              <View style={{ flexDirection: 'column' }} >
                <Text style={{ color: 'white', fontSize: 35, fontFamily: 'PlusJakartaSans-Bold' }}>12</Text>
                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>Kamar jatuh tempo</Text>
              </View>
              <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center' }} >
                <Icon size={25} name='calendar' color='#FFB700' style={{ alignSelf: 'center' }} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '100%', alignItems: 'center' }} >
              <View style={{ flexDirection: 'column' }} >
                <Text style={{ color: 'white', fontSize: 35, fontFamily: 'PlusJakartaSans-Bold' }}>5</Text>
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
              <View style={{ backgroundColor: data.DataKeluhan.length > 99 ? '#CC3300' : data.DataKeluhan.length < 50 ? '#FFCC00' : '#FF7A00', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 10, width: 40, alignItems: 'center' }} >
                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >{data.DataKeluhan.length}</Text>
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
              <View style={{ backgroundColor: data.DataLaporan.length > 99 ? '#CC3300' : data.DataLaporan.length < 50 ? '#FFCC00' : '#FF7A00', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 10, width: 40, alignItems: 'center' }} >
                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >{data.DataLaporan.length}</Text>
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