import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';
import moment from 'moment';
import 'moment/locale/id'
import Clipboard from '@react-native-clipboard/clipboard';

const KostScreen = ({navigation, route}) => {
  const [search, setSearch] = useState('')
  const [kostImage, setKostImage] = useState('')
  const [dataKost, setDataKost] = useState({})
  const [rating, setRating] = useState('4.0')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    AsyncStorage.getItem('@kost_data')
    .then((data) => {
      console.log(data)
      const value = JSON.parse(data)
      setKostImage(value.Rumah_Image)
      setDataKost(value)
      setIsLoading(false)
    })
  }

  const goBack = () => {
    navigation.goBack()
  }

  const goToKostDetail = (kamar) => {
    navigation.navigate('KostDetail', {dataRumah: dataKost})
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
              <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >Rumah Kost</Text>
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Atur informasi rumah kost</Text>
            </View>
          </View>
          <Image source={kostImage == '' ? require('../assets/image/RumahKost_Default.png') : { uri: kostImage }} style={{ height: 50, width: 50, borderRadius: 100}} />
        </View>
        { isLoading ?
            <ActivityIndicator color={'#FFB700'} size={100} style={{ alignSelf: 'center', marginVertical: 50 }} />
          :
            <>
              <View style={{ flexDirection: 'column', marginVertical: 20, alignItems: 'center', width: '100%' }}>
                <Image source={kostImage == '' ? require('../assets/image/RumahKost_Default.png') : { uri: kostImage }} style={{ height: 170, width: 170, borderRadius: 100}} />
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
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, width: '100%' }} onPress={() => goToKostDetail()} >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon size={25} name='home-city-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
                    <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black'}} >Data rumah kost</Text>
                  </View>
                  <Icon size={30} name='chevron-right' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, width: '100%' }} onPress={() => goToPeraturan()} >
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

export default KostScreen;