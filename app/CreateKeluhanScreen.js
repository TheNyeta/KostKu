import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { launchImageLibrary } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import axios from 'axios';
import { UpdateContext } from './GlobalState';

const CreateKeluhanScreen = ({navigation, route}) => {
  const [judul, setJudul] = useState('');
  const [judulError, setJudulError] = useState('');
  const [keluhan, setKeluhan] = useState('');
  const [keluhanError, setKeluhanError] = useState('');
  const [imageKeluhan, setImageKeluhan] = useState('');
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [isUpdate, setIsUpdate] = useContext(UpdateContext)
  const dataRumah = route.params.dataRumah
  const dataPenghuni = route.params.dataPenghuni
  const dataKamar = route.params.dataKamar

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
      } else {
        setImageKeluhan(res.assets[0].base64)
      }
    })
  }

  const validate = () => {
    let error = false

    if (keluhan == '') {
      setKeluhanError('Masukan keluhan')
      error = true
    } else if (keluhan.length > 225) {
      setKeluhanError('Maksimal 225 karakter')
      error = true
    } else {
      setKeluhanError('')
    }

    if (!error) {
      createKeluhan()
    } 
  }

  const createKeluhan = () => {
    setModal2(true)
    let data = {
      Rumah_ID:dataRumah.Rumah_ID,
      Kamar_ID: dataKamar.Kamar_ID,
      Kamar_Nomor: dataKamar.Kamar_Nomor,
      Kamar_Kelompok: dataKamar.Kamar_Kelompok,
      Penghuni_ID: dataKamar.DataPenghuni.Penghuni_ID,
      Penghuni_Name: dataKamar.DataPenghuni.Penghuni_Name,
      Penghuni_Number: dataKamar.DataPenghuni.Penghuni_Number,
      Penghuni_Image: dataKamar.DataPenghuni.Penghuni_Image,
      Penghuni_Pekerjaan: dataKamar.DataPenghuni.Penghuni_Pekerjaan,
      Detail_Keluhan: keluhan,
      Foto_Keluhan: imageKeluhan
    }

    axios.post(`https://api-kostku.pharmalink.id/skripsi/kostku?register=keluhan`, data)
    .then(({data}) => {
      if (data.error.msg == '') {
        setModal2(false)
        setIsUpdate({
          ...isUpdate,
          updateDashboard: true
        })
        goBack()
        navigation.replace('KeluhanList', {dataRumah: dataRumah, dataPenghuni: dataPenghuni, dataKamar: dataKamar, role: 'Penghuni'})
      }
    }).catch((e) => {
      console.log(e, 'error create keluhan')
    })
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container} >
        <View style={{ height: 'auto', width: '100%', backgroundColor: '#FFB700', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', paddingBottom: 10 }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 , width: '100%'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => goBack()}>
                <Icon size={22} name='arrow-left' color='white' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
              </TouchableOpacity>
              <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >Buat Keluhan</Text>
            </View>
          </View>
          <Image source={dataPenghuni.Penghuni_Image == '' ? require('../assets/image/Large.png') : { uri: dataPenghuni.Penghuni_Image }} style={{ margin: 10 , borderRadius: 100, width: 100, height: 100}} />
          <View style={{ backgroundColor: '#FF7A00', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} >
            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'UbuntuTitling-Bold' }} >{dataKamar.Kamar_Nomor}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Keluhan</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%', marginVertical: 10 }} >
            <Icon size={25} name='playlist-edit' color='black' style={{ alignSelf: 'center', marginRight: 5 }} />
            <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Isi keluhan</Text>
          </View>
          <View style={{ width: '100%', marginTop: 5, borderWidth: 1, borderColor: keluhanError ? 'red' : 'black', borderRadius: 5 }}>
            <TextInput
              style={{ width: '100%', color: 'black', fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, height: 200, textAlignVertical: 'top', padding: 10 }}
              placeholder='Isi keluhan'
              placeholderTextColor='#ccc'
              onChangeText={setKeluhan}
              value={keluhan}
              multiline
              // maxLength={255}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: keluhanError ? 'space-between' : 'flex-end', width: '100%' }}>
            { keluhanError ? <Text style={{ color: 'red', margin: 5, marginTop: -2, fontFamily: 'PlusJakartaSans-Regular' }} >{keluhanError}</Text> : null }
            
            <Text style={{ alignSelf: 'flex-end', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular' }} >{keluhan.length}/225</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%', marginVertical: 10 }} >
            <Icon size={25} name='playlist-edit' color='black' style={{ alignSelf: 'center', marginRight: 5 }} />
            <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Isi keluhan</Text>
          </View>
          <TouchableOpacity style={{ width: '100%', height: 150, alignItems: 'center', justifyContent: 'center', marginTop: 5, borderWidth: 1, borderRadius: 5, backgroundColor: imageKeluhan == '' ? 'lightgray' : 'white' }} onPress={() => openLibrary()} >
            { imageKeluhan == '' ?
                <Icon size={50} name='image-plus' color='gray' style={{ alignSelf: 'center' }} />
              :
              <Image source={{ uri: 'data:image/png;base64,' + imageKeluhan }} style={{ width: '100%', height: '100%' }} resizeMode={'contain'} />
            }
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '35%', borderRadius: 7, marginTop: 20 }} onPress={() => validate()} >
          <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Simpan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, width: '35%', borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginBottom: 20, marginTop: 10 }} onPress={() => setModal(true)} >
          <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Batal</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Batal membuat keluhan?</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Keluhan tidak akan tersimpan jika Anda keluar. Apakah Anda yakin?</Text>
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
  }
});


export default CreateKeluhanScreen;