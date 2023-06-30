import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Collapsible from 'react-native-collapsible';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ForgotPasswordScreen = ({navigation, route}) => {
  const [image, setImage] = useState('')
  const [modal, setModal] = useState(false)
  const [nomor, setNomor] = useState('')
  const [nomorError, setNomorError] = useState('')
  // const [role, setRole] = useState('')
  const role = route.params.role

  const goToOtp = (user) => {
    navigation.navigate('Otp', {role: role, nomor: nomor, user: user})
  }

  const validate = () => {
    let error = false

    let phonere = /^[0-9]*$/
    if (nomor == '') {
      setNomorError('Masukan nomor HP')
      error = true
    } else if (!phonere.test(nomor)) {
      setNomorError('Nomor HP hanya boleh angka')
      error = true
    } else if (nomor.length < 8) {
      setNomorError('Minimal 8 digit')
      error = true
    } else if (nomor.length > 12) {
      setNomorError('Maksimal 12 digit')
      error = true
    } else {
      setNomorError('')
    }

    if (!error) {
      checkPhoneNumber()
    }

  }

  const checkPhoneNumber = () => {
    let url = ''
    switch (role) {
      case 'Penghuni':
        url = `https://api-kostku.pharmalink.id/skripsi/kostku?find=forgetPass&PenghuniNumber=${nomor}`
        break;

      case 'Pengelola':
        url = `https://api-kostku.pharmalink.id/skripsi/kostku?find=forgetPass&PengelolaNumber=${nomor}`
        break;

      case 'Penjaga':
        url = `https://api-kostku.pharmalink.id/skripsi/kostku?find=forgetPass&PenjagaNumber=${nomor}`
        break;
    
      default:
        break;
    }
    axios.get(url)
    .then(({data}) => {
      console.log(data)
      if (data.error.msg == '') {
        goToOtp(data.data)
      } else {
        setModal(true)
      }
    }).catch((e) => {
      console.log(e, 'error check nomor')
    })
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 20 }} >
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >Lupa password</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Reset password akun Anda</Text>
        </View>
      </View>
      <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 20, fontFamily: 'PlusJakartaSans-Bold' }} >Masukan nomor hp akun Anda</Text>
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={[styles.form, { borderColor: nomorError ? 'red' : 'black' }]}>
          <Icon size={18} name='cellphone' color='black' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
          <TextInput
            style={styles.input}
            placeholder="08XXXXXXXXXX"
            placeholderTextColor='#ccc'
            onChangeText={setNomor}
            value={nomor}
            keyboardType='numeric'
            maxLength={12}
          />
        </View>
        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: nomor.length >= 8 ? '#FFB700' : 'lightgray' , width: '13%', height: 40, borderRadius: 5 }} onPress={() => validate()} disabled={ nomor.length >= 8 ? false : true}>
          <Icon size={25} name='arrow-right' color='white' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
        </TouchableOpacity>
      </View>
      { nomorError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{nomorError}</Text> : null }
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Akun tidak ditemukan</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >{`Tidak menemukan akun ${role} dengan nomor hp yang dimasukan. Pastikan kembali nomor hp yang dimasukan sudah benar.`}</Text>
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

export default ForgotPasswordScreen;