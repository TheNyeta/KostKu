import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';
import axios from 'axios';

const CreateRoomGroupScreen = ({navigation, route}) => {
  const [namaKelompok, setNamaKelompok] = useState('');
  const [namaKelompokError, setNamaKelompokError] = useState('');
  const [modal, setModal] = useState(false)
  const dataRumah = route.params.dataRumah
  const edit = route.params.edit

  useEffect(() => {
    if (edit) {
      setNamaKelompok(route.params.kelompok.KelompokKamar_Nama)
    }
  }, [])

  const goBack = () => {
    navigation.goBack()
  }

  const validate = () => {
    let error = false
    if (namaKelompok == '') {
      setNamaKelompokError('Masukan nama kelompok kamar')
      error = true
    } else if (namaKelompok.length > 15) {
      setNamaKelompokError('Maksimal 15 karakter')
      error = true
    } else if (edit && namaKelompok == route.params.kelompok.KelompokKamar_Nama) {
      setNamaKelompokError('Nama kelompok tidak boleh sama dengan yang sebelumnya')
      error = true
    } else {
      setNamaKelompokError('')
    }

    if (!error) {
      if (edit) {
        editKelompokKamar()
      } else {
        addKelompokKamar()
      }
    }
  }

  const addKelompokKamar = () => {
    let data = {
      Rumah_ID: dataRumah.Rumah_ID,
      KelompokKamar_Nama: namaKelompok
    }
    axios.post(`https://api-kostku.pharmalink.id/skripsi/kostku?register=kelompokKamar`, data)
    .then(({data}) => {
      if (data.error.msg == '') {
        goBack()
        navigation.replace('RoomGroupList', {dataRumah: dataRumah})
      } else if (data.error.code == 104) {
        setNamaKelompokError('Nama kelompok sudah digunakan')
      }
    }).catch((e) => {
      console.log(e, 'error post kelompok kamar')
    })
  }

  const editKelompokKamar = () => {
    axios.put(`https://api-kostku.pharmalink.id/skripsi/kostku?update=kelompokKamar&RumahID=${dataRumah.Rumah_ID}&from=${route.params.kelompok.KelompokKamar_Nama}&to=${namaKelompok}`)
    .then(({data}) => {
      if (data.error.msg == '') {
        goBack()
        navigation.replace('RoomGroupList', {dataRumah: dataRumah})
      } else if (data.error.code == 104) {
        setNamaKelompokError('Nama kelompok sudah digunakan')
      }
    }).catch((e) => {
      console.log(e, 'error post kelompok kamar')
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
            <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >{edit ? 'Edit Kelompok Kamar' : 'Buat Kelompok Kamar'}</Text>
          </View>
        </View>
        <Image source={dataRumah.Rumah_Image == '' ? require('../assets/image/RumahKost_Default.png') : { uri: dataRumah.Rumah_Image }} style={{ margin: 10 , borderRadius: 100, width: 100, height: 100}} />
        <View style={{ backgroundColor: '#FF7A00', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} >
          <Text style={{ color: 'white', fontSize: 20, fontFamily: 'UbuntuTitling-Bold' }} >{dataRumah.Nama_Rumah}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
        <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Kelompok Kamar</Text>
        <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Nama kelompok</Text>
        <View style={[styles.form, { borderColor: namaKelompokError ? 'red' : 'black' }]}>
          <Icon size={18} name='pencil' color='black' style={{ alignSelf: 'center' }} />
          <TextInput
            style={styles.input}
            placeholder='Nama Kelompok'
            placeholderTextColor='#ccc'
            onChangeText={setNamaKelompok}
            value={namaKelompok}
          />
        </View>
        { namaKelompokError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{namaKelompokError}</Text> : null }
      </View>
      <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '35%', borderRadius: 7, marginTop: 20 }} onPress={() => validate()}>
        <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Simpan</Text>
      </TouchableOpacity>
      { edit ? 
          null
        :
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, width: '35%', borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginBottom: 20, marginTop: 10 }} onPress={() => setModal(true)} >
            <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Batal</Text>
          </TouchableOpacity>
      }
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


export default CreateRoomGroupScreen;