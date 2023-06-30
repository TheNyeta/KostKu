import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions, NativeModules, PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Collapsible from 'react-native-collapsible';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const OtpScreen = ({navigation, route}) => {
  const [image, setImage] = useState('')
  const [modal, setModal] = useState(false)
  const [kodeOtp, setKodeOtp] = useState('')
  const [inputKodeOtp, setInputKodeOtp] = useState('')
  const [imputKodeError, setInputKodeError] = useState('')
  // const [role, setRole] = useState('')
  const role = route.params.role
  const nomor = route.params.nomor
  const user = route.params.user
  var DirectSms = NativeModules.DirectSms;

  useEffect(() => {
    sendDirectSms()
  }, [])

  const sendDirectSms = async () => {
    if (nomor) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
          {
            title: 'Kostku Sms Permission',
            message:
              'Kostku needs access to your inbox ' +
              'so you can send messages in background.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          let number = Math.floor((Math.random() * 900000) + 100000)
          setKodeOtp(String(number))
          DirectSms.sendDirectSms(nomor, `Kode OTP KostKu: ${number}`);
          console.log('sms sent')
        } else {
          console.log('error sms')
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validate = () => {
    let error = false

    let phonere = /^[0-9]*$/
    if (inputKodeOtp == '') {
      setInputKodeError('Masukan kode otp')
      error = true
    } else if (!phonere.test(inputKodeOtp)) {
      setInputKodeError('Kode otp hanya boleh angka')
      error = true
    } else {
      setInputKodeError('')
    }

    if (!error) {
      checkOtp()
    }

  }

  const checkOtp = () => {
    if (kodeOtp == inputKodeOtp) {
      goToChangePassword()
    } else {
      setModal(true)
    }
  }

  const goToChangePassword = () => {
    navigation.replace('ChangePassword', {role: role, user: user})
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 20 }} >
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >Lupa password</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Reset password akun Anda</Text>
        </View>
      </View>
      <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 20, fontFamily: 'PlusJakartaSans-Bold' }} >Masukan kode otp</Text>
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={[styles.form, { borderColor: imputKodeError ? 'red' : 'black' }]}>
          <Icon size={18} name='cellphone' color='black' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
          <TextInput
            style={styles.input}
            placeholder="XXXXXX"
            placeholderTextColor='#ccc'
            onChangeText={setInputKodeOtp}
            value={inputKodeOtp}
            keyboardType='numeric'
            maxLength={6}
          />
        </View>
        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: inputKodeOtp.length == 6 ? '#FFB700' : 'lightgray' , width: '13%', height: 40, borderRadius: 5 }} onPress={() => validate()} disabled={ inputKodeOtp.length == 6 ? false : true}>
          <Icon size={25} name='arrow-right' color='white' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
        </TouchableOpacity>
      </View>
      { imputKodeError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{imputKodeError}</Text> : null }
      <Text style={{ alignSelf: 'flex-start', color: 'lightgray', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >Kirim ulang kode otp</Text>
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

export default OtpScreen;