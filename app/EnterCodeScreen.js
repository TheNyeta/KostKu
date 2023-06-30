import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Collapsible from 'react-native-collapsible';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const EnterCodeScreen = ({navigation}) => {
  const [image, setImage] = useState('')
  const [modal, setModal] = useState(false)
  const [kode, setKode] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('@user_role')
      .then((data) => {
        setRole(data)
      })
  }, [])

  const goToPusatInformasi = (dataRumah) => {
    navigation.navigate('PusatInformasi', {enter: true, dataRumah: dataRumah, role: role})
  }

  const checkKostCode = () => {
    axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=specialCode&SpecialCode=${kode}`)
    .then(({data}) => {
      if (data.data != null) {
        goToPusatInformasi(data.data)
      } else {
        setModal(true)
      }
    }).catch((e) => {
      console.log(e, 'error check kost')
    })
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 20 }} >
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >Selamat datang!</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Masuk rumah kostmu dan jadi penghuni</Text>
        </View>
        <View>
          <Image source={require('../assets/image/Large.png')} style={{ height: 50, width: 50, borderRadius: 100}} />
        </View>
      </View>
      <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 20, fontFamily: 'PlusJakartaSans-Bold' }} >Masukan kode rumah kost</Text>
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <View style={styles.form}>
          <Icon size={18} name='pound' color='black' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
          <TextInput
            style={[styles.input, { borderLeftWidth: 1, borderColor: 'black', marginLeft: 5 }]}
            placeholder="ABC123"
            placeholderTextColor='#ccc'
            onChangeText={kode => setKode(kode.toUpperCase())}
            value={kode}
            autoCapitalize='characters'
            maxLength={6}
          />
        </View>
        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: kode.length >= 3 ? '#FFB700' : 'lightgray' , width: '13%', height: 40, borderRadius: 5 }} onPress={() => checkKostCode()} disabled={  kode.length >= 3 ? false : true}>
          <Icon size={25} name='arrow-right' color='white' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
        </TouchableOpacity>
      </View>
      <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 16, fontFamily: 'PlusJakartaSans-Bold' }} >Bagaimana cara masuk rumah kost?</Text>
      <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular' }} >Panduan untuk masuk menjadi penghuni rumah kost</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '6%' }} >1. </Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '94%' }} >Pastikan kamu sudah menghubungi pengelola/penjaga rumah kost untuk mendapatkan kamar kost.</Text>
        </View>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '6%' }} >2. </Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '94%' }} >Minta kode rumah kost dari pengelola/penjaga rumah kost yang dapat dilihat di aplikasi pengelola/penjaga rumah kost.</Text>
        </View>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '6%' }} >3. </Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '94%' }} >Masukan kode rumah kost ke kolom kode rumah kost dan klik tanda panah.</Text>
        </View>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '6%' }} >4. </Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '94%' }} >Pastikan rumah kost yang ditampilkan benar. Lalu klik Masuk Rumah Kost.</Text>
        </View>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '6%' }} >5. </Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '94%' }} >Masukan data diri yang dibutuhkan untuk menjadi penghuni.</Text>
        </View>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '6%' }} >6. </Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '94%' }} >Baca dan setujui peraturan rumah kost.</Text>
        </View>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '6%' }} >7. </Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '94%' }} >Setelah data diri dikirim, tunggu konfirmasi dari pengelola/penjaga kost.</Text>
        </View>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '6%' }} >8. </Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '94%' }} >Jika ditolak, ulang kembali dan pastikan data diri yang dimasukan sesuai dan benar.</Text>
        </View>
      </View>
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Rumah kost tidak ditemukan</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Tidak menemukan rumah kost dengan kode yang dimasukan. Pastikan kembali kode yang dimasukan sudah benar.</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => setModal(false)}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Mengerti</Text>
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
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    padding: 10,
    alignSelf:  'center',
    color: 'black',
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16
  },
  form: {
    width: '85%',
    height: 40,
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    flexDirection: 'row'
  },
});

export default EnterCodeScreen;