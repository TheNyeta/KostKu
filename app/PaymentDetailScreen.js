import React, { useState }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const PaymentDetailScreen = () => {
  const [search, setSearch] = useState('')

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }} >
        <TouchableOpacity>
          <Icon size={25} name='arrow-left' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 32, color: 'black'}} >Rincian bayaran</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Reguler', fontSize: 15, color: 'black'}} >RIncian pembayaran</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'column', marginVertical: 20 , alignSelf: 'flex-start' }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: 'black' }} >Pembagian pembayaran</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black' }} >Nomor kamar</Text>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black' }} >101</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black' }} >Tanggal masuk</Text>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black' }} >4 December 2022</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black' }} >Sewa kost</Text>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black' }} >Rp 2132101</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black' }} >Listrik</Text>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black' }} >Rp 2222101</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black' }} >Air</Text>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black' }} >RP 100.000</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black' }} >Sewa parkir</Text>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black' }} >Rp 1.000.000</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black' }} >Lain-lain</Text>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black' }} >-</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 15 }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black' }} >Total</Text>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black' }} >Rp 1.000.000</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  }
});

export default PaymentDetailScreen;