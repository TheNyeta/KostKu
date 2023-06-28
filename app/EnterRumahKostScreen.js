import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Picker } from '@react-native-picker/picker/typings/Picker'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Collapsible from 'react-native-collapsible';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import axios from 'axios';
import RadioGroup from 'react-native-radio-buttons-group';
import moment from 'moment';
import 'moment/locale/id'

const EnterRumahKostScreen = ({navigation, route}) => {
  const [imagePenghuni, setImagePenghuni] = useState('');
  const [nama, setNama] = useState('')
  const [namaError, setNamaError] = useState('')
  const [gender, setGender] = useState('')
  const [genderError, setGenderError] = useState('')
  const [nohp, setNoHp] = useState('')
  const [nohpError, setNoHpError] = useState('')
  const [pekerjaan, setPekerjaan] = useState('')
  const [pekerjaanError, setPekerjaanError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [imageKtp, setImageKtp] = useState('')
  const [imageKtpError, setImageKtpError] = useState('')
  const [imageNikah, setImageNikah] = useState('')
  const [namaDarurat, setNamaDarurat] = useState('')
  const [namaDaruratError, setNamaDaruratError] = useState('')
  const [nohpDarurat, setNoHpDarurat] = useState('')
  const [nohpDaruratError, setNoHpDaruratError] = useState('')
  const [hubungan, setHubungan] = useState('')
  const [hubunganError, setHubunganError] = useState('')
  const [collapKtp, setCollapKtp] = useState(true)
  const [collapBukuNikah, setCollapBukuNikah] = useState(true)
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [modal3, setModal3] = useState(false)
  const [penghuni, setPenghuni] = useState({})
  const dataRumah = route.params.dataRumah
  const namaKelompok = route.params.namaKelompok

  useEffect(() => {
    AsyncStorage.getItem('@user_data').then((data) => {
      const value = JSON.parse(data)
      setPenghuni(value)
    })
  }, [])

  const goBack = () => {
    navigation.goBack()
  }

  const radioButtonGender = [
      {
          id: 'Pria',
          label: 'Pria',
          labelStyle: { color: 'black', fontSize: 16, fontFamily: 'PlusJakartaSans-Regular' },
          containerStyle: { marginRight: 50, padding: 2 },
          value: 'Pria',
          color: gender == 'Pria' ? '#FFB700' : 'lightgray'

      },
      {
          id: 'Wanita',
          label: 'Wanita',
          labelStyle: { color: 'black', fontSize: 16, fontFamily: 'PlusJakartaSans-Regular' },
          containerStyle: { padding: 2 },
          value: 'Wanita',
          color: gender == 'Wanita' ? '#FFB700' : 'lightgray'
      }
  ]

  const openLibrary = (tipe) => {  
    launchImageLibrary({ includeBase64: true }, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        if (tipe == 'ktp') {
          setImageKtp(res.assets[0].base64)
        } else if (tipe == 'nikah') {
          setImageNikah(res.assets[0].base64)
        } else if (tipe == 'penghuni') {
          setImagePenghuni(res.assets[0].base64)
        }
      }
    })
  }

  const validate = () => {
    let error = false

    let namere = /^[a-zA-Z ]*$/
    if (nama.trim() == '') {
      setNamaError('Masukan nama')
      error = true
    } else if (nama.trim().length < 3) {
      setNamaError('Minimal 3 karakter')
      error = true
    } else if (nama.trim().length > 50) {
      setNamaError('Maksimal 50 karakter')
      error = true
    } else if (!namere.test(nama.trim())) {
      setNamaError('Nama hanya boleh alphabet')
      error = true
    } else {
      setNamaError('')
    }

    if (gender == '') {
      setGenderError('Pilih jenis kelamin')
      error = true
    } else {
      setGenderError('')
    }

    let phonere = /^[0-9]*$/
    if (nohp == '') {
      setNoHpError('Masukan nomor HP')
      error = true
    } else if (!phonere.test(nohp)) {
      setNoHpError('Nomor HP hanya boleh angka')
      error = true
    } else if (nohp.length < 8) {
      setNoHpError('Minimal 8 digit')
      error = true
    } else if (nohp.length > 12) {
      setNoHpError('Maksimal 12 digit')
      error = true
    } else {
      setNoHpError('')
    }

    if (pekerjaan == '') {
      setPekerjaanError('Masukan pekerjaan')
      error = true
    } else if (pekerjaan.length > 32) {
      setPekerjaanError('Maksimal 32 karakter')
      error = true
    } else {
      setPekerjaanError('')
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

    if (imageKtp == '') {
      setImageKtpError('Masukan foto KTP')
      error = true
    } else {
      setImageKtpError('')
    }

    if (namaDarurat == '') {
      setNamaDaruratError('Masukan nama darurat')
      error = true
    } else if (namaDarurat.length < 3) {
      setNamaDaruratError('Minimal 3 karakter')
      error = true
    } else if (namaDarurat.length > 50) {
      setNamaDaruratError('Maksimal 50 karakter')
      error = true
    } else if (!namere.test(namaDarurat)) {
      setNamaDaruratError('nama kontak darurat hanya boleh alphabet')
      error = true
    } else {
      setNamaDaruratError('')
    }

    if (nohpDarurat == '') {
      setNoHpDaruratError('Masukan nomor HP kontak darurat')
      error = true
    } else if (!phonere.test(nohpDarurat)) {
      setNoHpDaruratError('Nomor HP hanya boleh angka')
      error = true
    } else if (nohpDarurat.length < 8) {
      setNoHpDaruratError('Minimal 8 digit')
      error = true
    } else if (nohpDarurat.length > 12) {
      setNoHpDaruratError('Maksimal 12 digit')
      error = true
    } else {
      setNoHpDaruratError('')
    }

    if (hubungan == '') {
      setHubunganError('Masukan hubungan kontak darurat')
      error = true
    } else {
      setHubunganError('')
    }

    if (!error) {
      addOrder()
    } else {
      setModal2(true)
    }
  }

  const addOrder = () => {
    setModal3(true)
    let data = {
      Rumah_ID: dataRumah.Rumah_ID,
      Order_Status: 'N',
      DataPenghuni: {
        Penghuni_ID: penghuni.Penghuni_ID,
        Penghuni_Name: nama,
        Penghuni_Number: nohp,
        Penghuni_Pekerjaan: pekerjaan,
        Penghuni_Gender: gender,
        Penghuni_Email: email,
        Penghuni_Image: imagePenghuni,
        Penghuni_FotoKTP: imageKtp,
        Penghuni_FotoBukuNikah: imageNikah,
        Penghuni_KontakDaruratNama: namaDarurat,
        Penghuni_KontakDaruratNoHP: nohpDarurat,
        Penghuni_KontakDaruratHubungan: hubungan
      }
    }

    axios.post('https://api-kostku.pharmalink.id/skripsi/kostku?register=order', data)
    .then(({data}) => {
      console.log(data)
      if (data.error.msg == '') {
        AsyncStorage.setItem('@order_id', data.data).then(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Waiting'}],
          })
        })
      }
      setModal3(false)
    }).catch((e) => {
      console.log(e, 'error post order')
    })
  }

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: '#FFFFFF' }}>
      <View style={styles.container} >
        <View style={{ height: 'auto', width: '100%', backgroundColor: '#FFB700', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', paddingBottom: 10 }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', padding: 5 , width: '100%'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => goBack()} >
                <Icon size={22} name='arrow-left' color='white' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
              </TouchableOpacity>
              <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >Masukan Rumah Kost</Text>
            </View>
          </View>
          { imagePenghuni == '' ?
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgray', borderRadius: 100, width: 100, height: 100, marginVertical: 10}} onPress={() => openLibrary('penghuni')}>
                <Icon size={40} name='image-plus' color='white' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
              </TouchableOpacity>
            :
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10}} onPress={() => openLibrary('penghuni')}>
                <Image source={{uri: 'data:image/png;base64,' + imagePenghuni}} style={{ width: 100, height: 100, borderRadius: 100 }} />
              </TouchableOpacity>
          }
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Data Pribadi</Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Nama</Text>
          <View style={[styles.form, { borderColor: namaError ? 'red' : 'black' }]}>
            <Icon size={18} name='pencil' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Nama'
              placeholderTextColor='#ccc'
              onChangeText={setNama}
              value={nama}
            />
          </View>
          { namaError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{namaError}</Text> : null }
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Jenis Kelamin</Text>
          <RadioGroup 
            radioButtons={radioButtonGender} 
            onPress={setGender}
            selectedId={gender}
            layout='row'
            containerStyle={{ alignItems: 'flex-start', alignSelf: 'flex-start' }}
          />
          { genderError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{genderError}</Text> : null }
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >No.HP</Text>
          <View style={[styles.form, { borderColor: nohpError ? 'red' : 'black' }]}>
            <Icon size={18} name='cellphone' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='No.HP'
              placeholderTextColor='#ccc'
              onChangeText={setNoHp}
              value={nohp}
              keyboardType='numeric'
            />
          </View>
          { nohpError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{nohpError}</Text> : null }
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Pekerjaan</Text>
          <View style={[styles.form, { borderColor: pekerjaanError ? 'red' : 'black' }]}>
            <Icon size={18} name='briefcase-outline' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Pekerjaan'
              placeholderTextColor='#ccc'
              onChangeText={setPekerjaan}
              value={pekerjaan}
            />
          </View>
          { pekerjaanError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{pekerjaanError}</Text> : null }
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Email</Text>
          <View style={[styles.form, { borderColor: emailError ? 'red' : 'black' }]}>
            <Icon size={18} name='email-outline' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Email'
              placeholderTextColor='#ccc'
              onChangeText={setEmail}
              value={email}
            />
          </View>
          { emailError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{emailError}</Text> : null }
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginVertical: 5 }} onPress={() => setCollapKtp(!collapKtp)} >
            <View style={{ flexDirection: 'row' }} >
              <Icon size={18} name='credit-card-outline' color='black' style={{ alignSelf: 'center', marginRight: 5 }} />
              <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Foto KTP</Text>
            </View>
            <Icon size={18} name={collapKtp ? 'chevron-down' : 'chevron-up' } color='black' style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
          { imageKtpError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{imageKtpError}</Text> : null }
          <Collapsible collapsed={collapKtp} >
          { imageKtp == '' ?
              <TouchableOpacity onPress={() => openLibrary('ktp')}>
                <Icon size={50} name='image-plus' color='lightgray' style={{ alignSelf: 'center' }} />
              </TouchableOpacity>
            :
              <View style={{ width: Dimensions.get('window').width*0.9, height: Dimensions.get('window').height*0.3 }}>
                <TouchableOpacity onPress={() => openLibrary('ktp')} style={{ width: '100%' }}>
                  <Image source={{ uri: 'data:image/png;base64,' + imageKtp }} style={{ width: '100%', height: '100%' }} resizeMode={'contain'} />
                </TouchableOpacity>
              </View>
          }
          </Collapsible>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginVertical: 5 }} onPress={() => setCollapBukuNikah(!collapBukuNikah)} >
            <View style={{ flexDirection: 'row' }} >
              <Icon size={18} name='credit-card-outline' color='black' style={{ alignSelf: 'center', marginRight: 5 }} />
              <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Foto Buku Nikah</Text>
            </View>
            <Icon size={18} name={collapBukuNikah ? 'chevron-down' : 'chevron-up' } color='black' style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
          <Collapsible collapsed={collapBukuNikah} >
          { imageNikah == '' ?
              <TouchableOpacity onPress={() => openLibrary('nikah')}>
              <Icon size={50} name='image-plus' color='lightgray' style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
            :
              <View style={{ width: Dimensions.get('window').width*0.9, height: Dimensions.get('window').height*0.3 }}>
                <TouchableOpacity onPress={() => openLibrary('nikah')} style={{ width: '100%' }}>
                  <Image source={{ uri: 'data:image/png;base64,' + imageNikah }} style={{ width: '100%', height: '100%' }} resizeMode={'contain'} />
                </TouchableOpacity>
              </View>
          }
          </Collapsible>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Data Kontak Darurat</Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Nama</Text>
          <View style={[styles.form, { borderColor: namaDaruratError ? 'red' : 'black' }]}>
            <Icon size={18} name='pencil' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Nama'
              placeholderTextColor='#ccc'
              onChangeText={setNamaDarurat}
              value={namaDarurat}
            />
          </View>
          { namaDaruratError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{namaDaruratError}</Text> : null }
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >No.HP</Text>
          <View style={[styles.form, { borderColor: nohpDaruratError ? 'red' : 'black' }]}>
            <Icon size={18} name='cellphone' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='No.HP'
              placeholderTextColor='#ccc'
              onChangeText={setNoHpDarurat}
              value={nohpDarurat}
              keyboardType='numeric'
            />
          </View>
          { nohpDaruratError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{nohpDaruratError}</Text> : null }
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Hubungan</Text>
          <View style={[styles.form, { borderColor: hubunganError ? 'red' : 'black' }]}>
            <Icon size={18} name='account-multiple' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Hubungan'
              placeholderTextColor='#ccc'
              onChangeText={setHubungan}
              value={hubungan}
            />
          </View>
          { hubunganError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{hubunganError}</Text> : null }
        </View>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '35%', borderRadius: 7, marginTop: 20 }} onPress={() => validate()} >
          <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Simpan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, width: '35%', borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginBottom: 20, marginTop: 10 }} onPress={() => {setModal(true)}}>
          <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Batal</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Batal mengisi</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Apakah Anda yakin untuk batal mengisi data diri?</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => goBack()}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Ya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginTop: 10, width: 150 }} onPress={() => {setModal(false)}}>
            <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Tidak</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={modal2}
        onBackdropPress={() => setModal2(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Terdapat kesalahan</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Terdapat kesalahan pada data yang Anda masukan. Mohon untuk pastikan kembali.</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => setModal2(false)}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Ok</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={modal3}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 20, width: 200, height: 200 }}>
          <Text style={{fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Memproses</Text>
          <ActivityIndicator color={'#FFB700'} size={100} style={{ alignSelf: 'center', marginVertical: 20 }} />
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
    // justifyContent: 'center'
  },
  input: {
    height: 50,
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


export default EnterRumahKostScreen;