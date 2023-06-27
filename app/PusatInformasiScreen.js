import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';
import moment from 'moment';
import 'moment/locale/id'
import Clipboard from '@react-native-clipboard/clipboard';

const PusatInformasiScreen = ({navigation, route}) => {
  const [search, setSearch] = useState('')
  const [kostImage, setKostImage] = useState('')
  const [dataKost, setDataKost] = useState({})
  const [rating, setRating] = useState('4.0')
  const [isLoading, setIsLoading] = useState(true)
  const enter = route.params.enter
  const dataPenghuni = route.params.dataPenghuni

  useEffect(() => {
    if (enter) {
      init()
    } else {
      init()
    }
  }, [])

  const init = () => {
    setDataKost(route.params.dataRumah)
    setIsLoading(false)
  }

  const goBack = () => {
    navigation.goBack()
  }

  const goToEnterRumahKost = () => {
    navigation.navigate('EnterRumahKost', {dataRumah: dataKost})
  }

  const goToPeraturanDetail = () => {
    navigation.navigate('PeraturanDetail', {dataRumah: dataKost})
  }

  const copyToClipboard = (number) => {
    Clipboard.setString(number);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => goBack()} >
              <Icon size={25} name='arrow-left' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >{enter ? 'Rumah Kost' : 'Pusat Informasi' }</Text>
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >{enter ? 'Pastikan rumah kost sudah benar' : 'Informasi rumah kost' }</Text>
            </View>
          </View>
          {dataPenghuni == null ? 
              <Image source={require('../assets/image/Large.png')} style={{ height: 50, width: 50, borderRadius: 100}} />
            :
              <Image source={dataPenghuni.Penghuni_Image == '' ? require('../assets/image/Large.png') : { uri: dataPenghuni.Penghuni_Image }} style={{ height: 50, width: 50, borderRadius: 100}} />
          }
        </View>
        { isLoading ?
            <ActivityIndicator color={'#FFB700'} size={100} style={{ alignSelf: 'center', marginVertical: 50 }} />
          :
            <>
              <View style={{ flexDirection: 'column', marginVertical: 20, alignItems: 'center', width: '100%' }}>
                <Image source={dataKost.Rumah_Image == '' ? require('../assets/image/RumahKost_Default.png') : { uri: dataKost.Rumah_Image }} style={{ height: 170, width: 170, borderRadius: 100}} />
                <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 25, color: 'black'}} >{dataKost.Nama_Rumah}</Text>
                <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 25, color: 'black' }} >{rating}</Text>
                <Rating 
                    type='custom'
                    ratingColor='#ffb700'
                    imageSize={30}
                    fractions={1}
                    startingValue={rating}
                    onFinishRating={(rating) => setRating(rating)}
                    readonly
                  />
                  { enter ?
                      <TouchableOpacity style={{ backgroundColor: '#ffb700', padding: 5, borderRadius: 7, marginTop: 15, width: '100%', alignItems: 'center'}} onPress={() => goToEnterRumahKost()}>
                        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: 'white'}} >Masuk Rumah Kost</Text>
                      </TouchableOpacity>
                    :
                      null
                  }
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 25, color: 'black'}} >Informasi rumah kost</Text>
                <View style={{ marginVertical: 5 }}>
                  <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 16, color: 'black'}} >Alamat</Text>
                  <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black'}} >{dataKost.Lokasi_Rumah}</Text>
                </View>
                <View style={{ marginVertical: 5 }}>
                  <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 16, color: 'black'}} >Kontak pengelola kost</Text>
                  { dataKost.Nomor_Hp_Rumah1 == '' ?
                      <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black'}} >-</Text>
                    :
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black'}} >{dataKost.Nomor_Hp_Rumah1}</Text>
                        <TouchableOpacity onPress={() => copyToClipboard(dataKost.Nomor_Hp_Rumah1)}>
                          <Icon size={25} name='content-copy' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
                        </TouchableOpacity>
                      </View>
                  }
                </View>
                <View style={{ marginVertical: 5 }}>
                  <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 16, color: 'black'}} >Kontak penjaga kost</Text>
                  { dataKost.Nomor_Hp_Rumah2 == '' ?
                      <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black'}} >-</Text>
                    :
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black'}} >{dataKost.Nomor_Hp_Rumah2}</Text>
                        <TouchableOpacity onPress={() => copyToClipboard(dataKost.Nomor_Hp_Rumah2)}>
                          <Icon size={25} name='content-copy' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
                        </TouchableOpacity>
                      </View>
                  }
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, width: '100%' }} onPress={() => goToPeraturanDetail()} >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon size={25} name='home-city-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
                    <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black'}} >Peraturan rumah kost</Text>
                  </View>
                  <Icon size={30} name='chevron-right' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
                </TouchableOpacity>
              </View>
            </>
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default PusatInformasiScreen;