import React, { useState }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment';
import 'moment/locale/id'

const PaymentDetailScreen = ({navigation, route}) => {
  const dataRumah = route.params.dataRumah
  const dataPenghuni = route.params.dataPenghuni
  const kamar = route.params.kamar
  const role = route.params.role

  const goBack = () => {
    navigation.goBack()
  }

  const formatHarga = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(price)
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => goBack()}>
            <Icon size={25} name='arrow-left' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 25, color: 'black'}} >Rincian pembayaran</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >{role == 'Penghuni' ? 'Rincian pembayaran bulanan' : `Rincian pembayaran kamar ${kamar.Kamar_Nomor}`}</Text>
          </View>
        </View>
        { role == 'Penghuni' ?
            <Image source={dataPenghuni.Penghuni_Image == '' ? require('../assets/image/Large.png') : { uri: dataPenghuni.Penghuni_Image }} style={{ height: 50, width: 50, borderRadius: 100}} />
          : 
            <Image source={dataRumah.Rumah_Image == '' ? require('../assets/image/RumahKost_Default.png') : { uri: dataRumah.Rumah_Image }} style={{ height: 50, width: 50, borderRadius: 100}} />
        }
      </View>
      <View style={{ flexDirection: 'column', marginVertical: 20 , alignSelf: 'flex-start' }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: 'black' }} >Pembagian pembayaran</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black' }} >Nomor kamar</Text>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black' }} >{kamar.Kamar_Nomor}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black' }} >Tanggal masuk</Text>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black' }} >{moment(kamar.Tanggal_Masuk, 'YYYY MM DD').format('dddd, D MMMM YYYY')}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black' }} >Sewa kost</Text>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black' }} >{formatHarga(kamar.Kamar_Harga)}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 15 }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black' }} >Total</Text>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black' }} >{formatHarga(kamar.Kamar_Harga)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20
  }
});

export default PaymentDetailScreen;