import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { UpdateContext } from './GlobalState';

const UserProfileEditScreen = ({navigation, route}) => {
  const [image, setImage] = useState('')
  const [nomorKamar, setNomorKamar] = useState('');
  const [nama, setNama] = useState('')
  const [namaError, setNamaError] = useState('')
  const [nohp, setNoHp] = useState('')
  const [email, setEmail] = useState('')
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [isUpdate, setIsUpdate] = useContext(UpdateContext)
  const dataUser = route.params.dataUser

  useEffect(() => {
    init()
  }, [])

  const init = () => {
      setNama(dataUser.Pengelola_Name)
      setNoHp(dataUser.Pengelola_Number)
      setEmail(dataUser.Pengelola_Email)
  }

  const goBack = () => {
    navigation.goBack()
  }

  const openLibrary = () => {  
    launchImageLibrary({ includeBase64: true }, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        setImage(res.assets[0].base64)
      }
    })
  }

  const validate = () => {
    let error = false
    let usernamere = /^[a-zA-Z]*$/
    if (nama == '') {
      setNamaError('Masukan nama akun')
      error = true
    } else if (nama.length < 3) {
      setNamaError('Minimal 3 karakter')
      error = true
    } else if (nama.length > 50) {
      setNamaError('Maksimal 50 karakter')
      error = true
    } else if (!usernamere.test(nama)) {
      setNamaError('Nama hanya boleh alphabet')
      error = true
    } else {
      setNamaError('')
    }

    if (!error) {
      updateProfile()
    }

  }

  const updateProfile = () => {
    setModal2(true)
    let data = {
      Pengelola_ID : dataUser.Pengelola_ID,
      Pengelola_Name: nama,
      Pengelola_Image:  image == '' ? dataUser.Pengelola_Image : ('data:image/png;base64,' + image)
    }
    axios.put(`https://api-kostku.pharmalink.id/skripsi/kostku?update=pengelola`, data)
      .then(({data}) => {
        console.log(data)
        if (data.error.msg == '') {

          let userdata = {
            ...dataUser,
            Pengelola_Image: image == '' ? dataUser.Pengelola_Image : ('data:image/png;base64,' + image),
            Pengelola_Name: nama
          }
          console.log(userdata)
          const value = JSON.stringify(userdata)
          AsyncStorage.setItem('@user_data', value)
            .then(() => {
              setModal2(false)
              setIsUpdate({
                ...isUpdate,
                updateSetting: true
              })
              goBack()
              navigation.replace('UserProfile')
            })
            
        }
      }).catch((e) => {
        console.log(e, 'error edit user')
      })
  }

  return (
      <View style={styles.container} >
        <View style={{ height: 'auto', width: '100%', backgroundColor: '#FFB700', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', paddingBottom: 10 }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 , width: '100%'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => goBack()}>
                <Icon size={22} name='arrow-left' color='white' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
              </TouchableOpacity>
              <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >Edit Profil</Text>
            </View>
          </View>
          { image == '' ?
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgray', borderRadius: 100, width: 100, height: 100, marginVertical: 10}} onPress={() => openLibrary()}>
                <Icon size={40} name='image-plus' color='white' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
              </TouchableOpacity>
            :
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10}} onPress={() => openLibrary()}>
                <Image source={{uri: 'data:image/png;base64,' + image}} style={{ width: 100, height: 100, borderRadius: 100 }} />
              </TouchableOpacity>
          }
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Kelompok Kamar</Text>
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
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >No. Telepon</Text>
          <View style={[styles.form, { backgroundColor: 'gray', opacity: 0.2 }]}>
            <Icon size={18} name='cellphone' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='No. Telepon'
              placeholderTextColor='#ccc'
              onChangeText={setNoHp}
              value={nohp}
              editable={false}
            />
          </View>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Email</Text>
          <View style={[styles.form, { backgroundColor: 'gray', opacity: 0.2 }]}>
            <Icon size={18} name='email-outline' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Email'
              placeholderTextColor='#ccc'
              onChangeText={setEmail}
              value={email}
              editable={false}
            />
          </View>
        </View>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '35%', borderRadius: 7, marginTop: 20 }} onPress={() => validate()}>
          <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Simpan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, width: '35%', borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginBottom: 20, marginTop: 10 }} onPress={() => setModal(true)} >
          <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Batal</Text>
        </TouchableOpacity>
        <Modal
          isVisible={modal}
          onBackdropPress={() => setModal(false)}
        >
          <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
            <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
            <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Batal membuat kelompok kamar?</Text>
            <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Kelompok kamar tidak akan tersimpan jika anda keluar. Apakah Anda yakin?</Text>
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
        >
          <View style={{flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 20, width: 200, height: 200 }}>
            <Text style={{fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Memproses</Text>
            <ActivityIndicator color={'#FFB700'} size={100} style={{ alignSelf: 'center', marginVertical: 20 }} />
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
    // justifyContent: 'center'
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


export default UserProfileEditScreen;