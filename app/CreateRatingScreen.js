import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';
import axios from 'axios';
import { UpdateContext } from './GlobalState';

const CreateRatingScreen = ({navigation, route}) => {
  const [namaKelompok, setNamaKelompok] = useState('');
  const [namaKelompokError, setNamaKelompokError] = useState('');
  const [modal, setModal] = useState(false)
  const [rating, setRating] = useState('')
  const [ratingError, setRatingError] = useState('')
  const [ulasan, setUlasan] = useState('')
  const [ulasanError, setUlasanError] = useState('')
  const [isUpdate, setIsUpdate] = useContext(UpdateContext)
  const dataRumah = route.params.dataRumah
  const dataPenghuni = route.params.dataPenghuni
  const dataKamar = route.params.dataKamar

  const goBack = () => {
    navigation.goBack()
  }

  const validate = () => {
    let error = false

    if (ulasan == '') {
      setUlasanError('Masukan ulasan')
      error = true
    } else if (ulasan.length > 225) {
      setUlasanError('Maksimal 225 karakter')
      error = true
    } else {
      setUlasanError('')
    }

    if (rating == '') {
      setRatingError('Masukan rating')
      error = true
    } else {
      setRatingError('')
    }
    
    if (!error) {
      addRating()
    }
  }

  const addRating = () => {
    let data = {
      Rumah_ID: dataRumah.Rumah_ID ,
      Kamar_Nomor: dataKamar.Kamar_Nomor,
      Kamar_Kelompok: dataKamar.Kamar_Kelompok,
      Penghuni_ID: dataPenghuni.Penghuni_ID,
      Penghuni_Name: dataKamar.DataPenghuni.Penghuni_Name,
      Penghuni_Image: dataKamar.DataPenghuni.Penghuni_Image,
      Ulasan_Rating: ulasan,
      Nilai_Rating: rating
    }
    axios.post(`https://api-kostku.pharmalink.id/skripsi/kostku?register=rating`, data)
    .then(({data}) => {
      console.log(data)
      if (data.error.msg == '') {
        setIsUpdate({
          ...isUpdate,
          updateDashboard: true
        })
        goBack()
      } else if (data.error.code == 105) {
        setRatingError('Sudah memberikan rating')
      }
    }).catch((e) => {
      console.log(e, 'error post kelompok kamar')
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
              <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >Beri rating & ulasan kost</Text>
            </View>
          </View>
          <Image source={dataRumah.Rumah_Image == '' ? require('../assets/image/RumahKost_Default.png') : { uri: dataRumah.Rumah_Image }} style={{ margin: 10 , borderRadius: 100, width: 100, height: 100}} />
          <View style={{ backgroundColor: '#FF7A00', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} >
            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'UbuntuTitling-Bold' }} >{dataRumah.Nama_Rumah}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Ulasan rumah kost</Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Rating rumah kost</Text>
          <Rating 
            type='custom'
            ratingColor='#ffb700'
            imageSize={30}
            // fractions={1}
            minValue={1}
            startingValue={rating}
            onFinishRating={(rating) => setRating(rating)}
            style={{ marginVertical: 10}}
          />
          { ratingError ? <Text style={{ color: 'red', margin: 5, marginTop: -2, fontFamily: 'PlusJakartaSans-Regular' }} >{ratingError}</Text> : null }
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%', marginBottom: 10 }} >
            <Icon size={25} name='playlist-edit' color='black' style={{ alignSelf: 'center', marginRight: 5 }} />
            <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Ulasan</Text>
          </View>
          <View style={{ width: '100%', marginTop: 5, borderWidth: 1, borderColor: ulasanError ? 'red' : 'black', borderRadius: 5 }}>
            <TextInput
              style={{ width: '100%', color: 'black', fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, height: 200, textAlignVertical: 'top', padding: 10 }}
              placeholder='Isi pesan'
              placeholderTextColor='#ccc'
              onChangeText={setUlasan}
              value={ulasan}
              multiline
              // maxLength={255}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: ulasanError ? 'space-between' : 'flex-end', width: '100%' }}>
            { ulasanError ? <Text style={{ color: 'red', margin: 5, marginTop: -2, fontFamily: 'PlusJakartaSans-Regular' }} >{ulasanError}</Text> : null }
            
            <Text style={{ alignSelf: 'flex-end', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular' }} >{ulasan.length}/225</Text>
          </View>
        </View>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '35%', borderRadius: 7, marginTop: 20 }} onPress={() => validate()}>
          <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Kirim</Text>
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
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Batal mengisi</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Apakah Anda yakin untuk batal mengirim rating dan ulasan rumah kost?</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => goBack()}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Ya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginTop: 10, width: 150 }} onPress={() => {setModal(false)}}>
            <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Tidak</Text>
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


export default CreateRatingScreen;