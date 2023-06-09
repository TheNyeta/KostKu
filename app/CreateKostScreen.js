import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const CreateKostScreen = ({navigation}) => {
  const [nama, setNama] = useState('')
  const [kode, setKode] = useState('')
  const [kota, setKota] = useState('')
  const [alamat, setAlamat] = useState('')
  const [nomor, setNomor] = useState('')
  const [namaError, setNamaError] = useState('')
  const [kodeError, setKodeError] = useState('')
  const [kotaError, setKotaError] = useState('')
  const [alamatError, setAlamatError] = useState('')
  const [nomorError, setNomorError] = useState('')
  const [secure, setSecure] = useState(true)

  const handleRegister = () => {
    let error = false
    let usernamere = /^[a-zA-Z]*$/
    if (nama.length < 3) {
      setNamaError('Minimal 3 karakter')
      error = true
    } else if (nama.length >= 50) {
      setNamaError('Maksimal 50 karakter')
      error = true
    } else if (!usernamere.test(nama)) {
      setNamaError('Nama hanya boleh alphabet')
      error = true
    } else {
      setNamaError('')
    }

    let phonere = /^[0-9]*$/
    if (nomor.length < 8) {
      setNomorError('Minimal 8 digit')
      error = true
    } else if (nomor.length >= 12) {
      setNomorError('Maksimal 12 digit')
      error = true
    } else if (!phonere.test(nomor)) {
      setNomorError('Nomor HP hanya boleh angka')
      error = true
    } else {
      setNomorError('')
    }

    if (!error) {

      let data = {
        Pengelola_Name: username,
        Pengelola_Email: email,
	      Pengelola_Number: phone,
	      Pengelola_Password: password
      }

      axios.post('https://api-kostku.pharmalink.id/skripsi/kostku?register=pengelola', data)
        .then(({data}) => {
          console.log(data, 'test aja nih')
          if (data.error.msg == '') {
            navigation.navigate('Home')
          } else {
            ToastAndroid.show(data.error.msg, 1)
          }
        })
    }
    navigation.navigate('Home')
  } 

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image source={require('../assets/image/kostkuLogo150.png')} style={{ width: 100, height: 100, marginTop: 30 }} />
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 32, color: 'black', marginVertical: 10}} >Buat Rumah Kost</Text>
        <Image source={require('../assets/image/Large.png')} style={{ width: 70, height: 70, borderRadius: 100 , marginVertical: 10}} />
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '70%' }}>
          <View style={[styles.form, { borderColor: namaError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='home-city-outline' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Nama rumah kost"
              placeholderTextColor='#ccc'
              onChangeText={setNama}
              value={nama}
            />
          </View>
          { namaError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{usernameError}</Text> : null }
          <View style={[styles.form, { borderColor: kodeError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='home-city-outline' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Nama rumah kost"
              placeholderTextColor='#ccc'
              onChangeText={setKode}
              value={kode}
            />
          </View>
          { kodeError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{usernameError}</Text> : null }
          <View style={[styles.form, { borderColor: kotaError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='map-marker-outline' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Kota"
              placeholderTextColor='#ccc'
              onChangeText={setKota}
              value={kota}
            />
          </View>
          { kotaError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{phoneError}</Text> : null }
          <View style={[styles.form, { borderColor: alamatError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='email-outline' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Alamat"
              placeholderTextColor='#ccc'
              onChangeText={setAlamat}
              value={alamat}
            />
          </View>
          { nomorError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{emailError}</Text> : null }
          <View style={[styles.form, { borderColor: nomorError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='cellphone' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Nomor pengelola"
              placeholderTextColor='#ccc'
              secureTextEntry={secure}
              onChangeText={setNomor}
              value={nomor}
              keyboardType='numeric'
            />
          </View>
          { nomorError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{passwordError}</Text> : null }
        </View>
        <TouchableOpacity onPress={() => handleRegister()} style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '40%', borderRadius: 5, marginTop: 20 }}>
          <Text style={{ fontSize: 20, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: Dimensions.get('window').height
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

export default CreateKostScreen;