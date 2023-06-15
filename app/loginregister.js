import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ToastAndroid, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const role = route.params.role

  const handleLogin = () => {
    // Code to handle login
    let error = false
    let emailre = /\S+@\S+\.\S+/

    if (email == '') {
      setEmailError('Email tidak boleh kosong')
      error = true
    } else if (!emailre.test(email)) {
      setEmailError('Format email tidak valid')
      error = true
    } else {
      setEmailError('')
    }

    if (password.length < 8) {
      setPasswordError('Minimal 8 karakter')
      error = true
    } else {
      setPasswordError('')
    }

    if (!error) {

      let data = {}
      let url = ''

      switch (role) {
        case 'Penghuni':
          data = {
            Penghuni_Email: email,
            Penghuni_Password: password
          }
          url = 'https://api-kostku.pharmalink.id/skripsi/kostku?login=penghuni'
          break;

        case 'Pengelola':
          data = {
            Pengelola_Email: email,
            Pengelola_Password: password
          }
          url = 'https://api-kostku.pharmalink.id/skripsi/kostku?login=pengelola'
          break;

        case 'Penjaga':
          data = {
            Penjaga_Email: email,
            Penjaga_Password: password
          }
          url = 'https://api-kostku.pharmalink.id/skripsi/kostku?login=penjaga'
          break;
      
        default:
          break;
      }
      
      // let data = {
      //   Pengelola_Email: email,
	    //   Pengelola_Password: password
      // }

      axios.post(url, data)
        .then(({data}) => {
          // console.log(data, 'test aja nih')
          if (data.error.msg == '') {
            // navigation.replace('OnBoarding')

            let jsonValue = JSON.stringify(data.data)
            AsyncStorage.setItem('@user_data', jsonValue)

            if (role == 'Pengelola') {
              axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=rumah&PengelolaID=${data.data.Pengelola_ID}`)
                .then(({data}) => {
                  // console.log(data,'wih dapet')
                  if (data.error.msg == '') {

                    let jsonValue = JSON.stringify(data.data)
                    AsyncStorage.setItem('@kost_data', jsonValue) 

                    navigation.reset({
                      index: 0,
                      routes: [{name: 'Home'}],
                    })
                    
                  } else {
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'OnBoarding'}],
                    })
                  }
                })

            } else {
              navigation.reset({
                index: 0,
                routes: [{name: 'OnBoarding'}],
              })

            }

          } else if (data.error.code == 12) {
            setModalTitle('Password Anda salah')
            setModalText('Periksa lagi kembali password dengan email/nomor HP yang Anda masukan.')
            setModal(true)
          } else if (data.error.code == 11) {
            setModalTitle('Email/nomor HP tidak ditemukan')
            setModalText('Periksa lagi kembali email/nomor HP yang Anda masukan sudah terdaftar.')
            setModal(true)
          }

        })
    }
    // navigation.replace('OnBoarding')
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'Home'}],
    // })
  }

  const forgotPassword = () => {
    // Code to handle login
    ToastAndroid.show('forgor', 1)
  }

  const goToRegister = () => {
    // Code to handle login
    navigation.navigate('Register', {role})
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/image/kostkuLogo150.png')} style={{ height: 120, width: 120, marginTop: 30 }} />
      <Text style={{ fontSize: 30, fontFamily: 'PlusJakartaSans-Bold', marginBottom: 0, color: 'black' }} >Masuk</Text>
      <Text style={{ fontSize: 16, fontFamily: 'PlusJakartaSans-Regular', marginBottom: 50, color: 'black' }} >Sebagai {role}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '70%' }}>
      <View style={[styles.form, { borderColor: emailError ? 'red' : '#FFB700' }]}>
        <Icon size={18} name='pencil' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor='#ccc'
          onChangeText={setEmail}
          value={email}
        />
      </View>
      { emailError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{emailError}</Text> : null }
        <View style={[styles.form, { borderColor: passwordError ? 'red' : '#FFB700' }]}>
          <Icon size={18} name='lock' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor='#ccc'
            secureTextEntry={secure}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)} >
            <Icon size={18} name={`eye${secure ? '' : '-off'}`} color='#FFB700' />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: passwordError ? 'space-between' : 'flex-end', width: '100%' }}>
          { passwordError ? <Text style={{ color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{passwordError}</Text> : null }
          <TouchableOpacity onPress={() => forgotPassword()}>
            <Text style={{ color: '#cccccc', fontSize: 13, textAlign: 'right', marginTop: -5, fontFamily: 'PlusJakartaSans-Regular', alignSelf: 'flex-end' }}>Lupa Password</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Button style={{ borderRadius: 10 }} title="Masuk" onPress={handleLogin} /> */}
      <TouchableOpacity onPress={() => handleLogin()} style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '40%', borderRadius: 5, marginTop: 30 }}>
        <Text style={{ fontSize: 17, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }}>Masuk</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 60 }}>
        <Text style={{ textAlign: 'center', fontFamily: 'PlusJakartaSans-Regular' }} >Belum punya akun?</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontFamily: 'PlusJakartaSans-Regular' }} >Daftar </Text>
          <TouchableOpacity onPress={() => goToRegister()}>
            <Text style={{ color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >di sini</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='information-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >{modalTitle}</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center', marginBottom: 10 }} >{modalText}</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => setModal(false)}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Mengerti</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const RegisterScreen = ({navigation, route}) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [usernameError, setUsernameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [register, setRegister] = useState(false);
  const role = route.params.role

  const handleRegister = () => {
    let error = false
    let usernamere = /^[a-zA-Z]*$/

    if (username == '') {
      setUsernameError('Masukan nama akun')
      error = true
    } else if (username.length < 3) {
      setUsernameError('Minimal 3 karakter')
      error = true
    } else if (username.length > 50) {
      setUsernameError('Maksimal 50 karakter')
      error = true
    } else if (!usernamere.test(username)) {
      setUsernameError('Nama hanya boleh alphabet')
      error = true
    } else {
      setUsernameError('')
    }

    let phonere = /^[0-9]*$/
    if (phone == '') {
      setPhoneError('Masukan nomor HP')
      error = true
    } else if (!phonere.test(phone)) {
      setPhoneError('Nomor HP hanya boleh angka')
      error = true
    } else if (phone.length < 8) {
      setPhoneError('Minimal 8 digit')
      error = true
    } else if (phone.length > 12) {
      setPhoneError('Maksimal 12 digit')
      error = true
    } else {
      setPhoneError('')
    }

    let emailre = /\S+@\S+\.\S+/

    if (email == '') {
      setEmailError('Masukan email')
      error = true
    } else if (!emailre.test(email)) {
      setEmailError('Email tidak valid')
      error = true
    } else {
      setEmailError('')
    }

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

      let data = {}
      let url = ''

      switch (role) {
        case 'Penghuni':
          data = {
            Penghuni_Name: username,
            Penghuni_Email: email,
            Penghuni_Number: phone,
            Penghuni_Password: password
          }
          url = 'https://api-kostku.pharmalink.id/skripsi/kostku?register=penghuni'
          break;

        case 'Pengelola':
          data = {
            Pengelola_Name: username,
            Pengelola_Email: email,
            Pengelola_Number: phone,
            Pengelola_Password: password
          }
          url = 'https://api-kostku.pharmalink.id/skripsi/kostku?register=pengelola'
          break;

        case 'Penjaga':
          data = {
            Penjaga_Name: username,
            Penjaga_Email: email,
            Penjaga_Number: phone,
            Penjaga_Password: password
          }
          url = 'https://api-kostku.pharmalink.id/skripsi/kostku?register=penjaga'
          break;
      
        default:
          break;
      }

      // axios.post(url, data)
      //   .then(({data}) => {
      //     console.log(data, 'test aja nih')
      //     if (data.error.msg == '') {
      //       navigation.goBack()
      //     } else {
      //       ToastAndroid.show(data.error.msg, 1)
      //     }
      //   })
      axios.post(url, data)
      .then(({data}) => {
        console.log(data, 'test aja nih')
        if (data.error.msg == '') {
          setModalTitle('Akun terdaftar')
          setModalText('Akun Anda telah terdaftar dan siap dipakai.')
          setRegister(true)
          setModal(true)
        } else if (data.error.code == 409) {
          setModalTitle('Email/nomor HP sudah terdaftar')
          setModalText('Email/nomor HP yang Anda masukan sudah digunakan untuk mendaftar pada peran yang sama sebelumnya.')
          setModal(true)
        }

      })

    }

  } 

  const goToLogin = () => {
    navigation.goBack()
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image source={require('../assets/image/kostkuLogo150.png')} style={{ height: 120, width: 120, marginTop: 30 }} />
        <Text style={{ fontSize: 30, fontFamily: 'PlusJakartaSans-Bold', marginBottom: 50, color: 'black' }} >Daftar</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '70%' }}>
          <View style={[styles.form, { borderColor: usernameError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='pencil' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor='#ccc'
              onChangeText={setUsername}
              value={username}
            />
          </View>
          { usernameError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{usernameError}</Text> : null }
          <View style={[styles.form, { borderColor: phoneError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='cellphone' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Nomor HP"
              placeholderTextColor='#ccc'
              onChangeText={setPhone}
              value={phone}
              keyboardType='numeric'
            />
          </View>
          { phoneError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{phoneError}</Text> : null }
          <View style={[styles.form, { borderColor: emailError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='email-outline' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor='#ccc'
              onChangeText={setEmail}
              value={email}
            />
          </View>
          { emailError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{emailError}</Text> : null }
          <View style={[styles.form, { borderColor: passwordError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='lock' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor='#ccc'
              secureTextEntry={secure}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)} >
              <Icon size={18} name={`eye${secure ? '' : '-off'}`} color='#FFB700' />
            </TouchableOpacity>
          </View>
          { passwordError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{passwordError}</Text> : null }
        </View>
        {/* <Button style={{ borderRadius: 10 }} title="Masuk" onPress={handleLogin} /> */}
        <TouchableOpacity onPress={() => handleRegister()} style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '40%', borderRadius: 5, marginTop: 20 }}>
          <Text style={{ fontSize: 17, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }}>Daftar</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 30 }}>
          <Text style={{ textAlign: 'center', fontFamily: 'PlusJakartaSans-Regular' }} >Sudah punya akun?</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', fontFamily: 'PlusJakartaSans-Regular' }} >Masuk </Text>
            <TouchableOpacity onPress={() => goToLogin()}>
              <Text style={{ color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >di sini</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name={register ? 'emoticon-happy-outline' : 'information-outline'} color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >{modalTitle}</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center', marginBottom: 10 }} >{modalText}</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => { register ? navigation.goBack() : setModal(false)}}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Mengerti</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: Dimensions.get('window').height
    // justifyContent: 'center'
  },
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    padding: 10,
    alignSelf:  'center',
    fontFamily: 'PlusJakartaSans-Regular'
  },
  form: {
    width: '100%',
    height: 40,
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFB700',
    borderRadius: 5,
    flexDirection: 'row'
  },
});

export { LoginScreen, RegisterScreen };
