import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';
import axios from 'axios';

const ChangePasswordScreen = ({navigation, route}) => {
  const [image, setImage] = useState('')
  const [modal, setModal] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  // const [role, setRole] = useState('')
  const role = route.params.role
  const user = route.params.user

  const goBack = () => {
    navigation.goBack()
  }

  const validate = () => {
    let error = false

    if (password == '') {
      setPasswordError('Masukan password')
      error = true
    } else if (password.length < 8) {
      setPasswordError('Minimal 8 karakter')
      error = true
    } else {
      setPasswordError('')
    }

    if (!error) {
      updatePassword()
    }

  }

  const updatePassword = () => {
    let url = ''
    let data = {}
    switch (role) {
      case 'Penghuni':
        data = {
          Penghuni_Password_New: password,
          Penghuni_ID: user.Penghuni_ID
        }
        url = `https://api-kostku.pharmalink.id/skripsi/kostku?forgetPass=penghuni`
        break;

      case 'Pengelola':
        data = {
          Pengelola_Password_New: password,
          Pengelola_ID: user.Pengelola_ID
        }
        url = `https://api-kostku.pharmalink.id/skripsi/kostku?forgetPass=pengelola`
        break;

      case 'Penjaga':
        data = {
          Penjaga_Password_New: password,
          Penjaga_ID: user.Penjaga_ID
        }
        url = `https://api-kostku.pharmalink.id/skripsi/kostku?forgetPass=penjaga`
        break;
    
      default:
        break;
    }
    axios.put(url, data)
    .then(({data}) => {
      console.log(data)
      if (data.error.msg == '') {
        goBack()
        goBack()
      } else {
        setModal(true)
      }
    }).catch((e) => {
      console.log(e, 'error update password')
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
      <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 20, fontFamily: 'PlusJakartaSans-Bold' }} >Masukan password baru</Text>
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={[styles.form, { borderColor: passwordError ? 'red' : 'black' }]}>
          <Icon size={18} name='lock' color='black' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
          <TextInput
            style={styles.input}
            placeholder="Password baru"
            placeholderTextColor='#ccc'
            onChangeText={setPassword}
            value={password}
          />
        </View>
      </View>
      { passwordError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{passwordError}</Text> : null }
      <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '50%', borderRadius: 5, marginTop: 20 }} onPress={() => validate()} >
        <Text style={{ fontSize: 17, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }}>Simpan</Text>
      </TouchableOpacity>
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Kode otp salah</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Kode otp yang Anda masukan salah. Mohok periksa kembali kode otp yang Anda masukan sudah benar.</Text>
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
    width: '90%',
    marginVertical: 10,
    padding: 10,
    alignSelf:  'center',
    color: 'black',
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16
  },
  form: {
    width: '100%',
    height: 40,
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    flexDirection: 'row'
  },
});

export default ChangePasswordScreen;