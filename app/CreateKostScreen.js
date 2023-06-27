import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, Dimensions, ToastAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CreateKostScreen = ({navigation}) => {
  const [image, setImage] = useState('')
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
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)


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

  const handleRegister = () => {
    let error = false

    if (nama == '') {
      setNamaError('Masukan nama kost')
      error = true
    } else if (nama.length < 3) {
      setNamaError('Minimal 3 karakter')
      error = true
    } else if (nama.length > 32) {
      setNamaError('Maksimal 32 karakter')
      error = true
    } else {
      setNamaError('')
    }
    
    if (kode == '') {
      setKodeError('Masukan kode kost')
      error = true
    } else if (kode.length < 3) {
      setKodeError('Minimal 3 karakter')
      error = true
    } else if (kode.length > 6) {
      setKodeError('Maksimal 6 karakter')
      error = true
    } else {
      setKodeError('')
    }

    if (kota == '' || kota == 'Pilih Kota') {
      setKotaError('Masukan kota kost')
      error = true
    } else {
      setKotaError('')
    }

    if (alamat == '') {
      setAlamatError('Masukan alamat kost')
      error = true
    } else {
      setAlamatError('')
    }


    let phonere = /^[0-9]*$/
    if (nomor == '') {
      setNomorError('Masukan nomor pengelola')
      error = true
    } else if (nomor.length < 8) {
      setNomorError('Minimal 8 digit')
      error = true
    } else if (nomor.length > 12) {
      setNomorError('Maksimal 12 digit')
      error = true
    } else if (!phonere.test(nomor)) {
      setNomorError('Nomor HP hanya boleh angka')
      error = true
    } else {
      setNomorError('')
    }

    if (!error) {
      addRumahKost()
    }

    // navigation.navigate('Home')
  } 

  const addRumahKost = () => {
    AsyncStorage.getItem('@user_data').then((res) => {
      const value = JSON.parse(res)

      let data = {
        Pengelola_ID: value.Pengelola_ID,
        Nama_Rumah: nama,
        Lokasi_Rumah: alamat,
        Kota_Name:  kota,
        Special_Code: kode,
        Nomor_Hp_Rumah: nomor,
        Rumah_Image: image
      }
      
      axios.post('https://api-kostku.pharmalink.id/skripsi/kostku?register=rumah', data)
        .then(({data}) => {
          console.log(data, 'test aja nih')
          if (data.error.msg == '') {
            axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=rumah&PengelolaID=${value.Pengelola_ID}`)
              .then(({data}) => {
                console.log(data, 'test aja nih')
                if (data.error.msg == '') {
                  let jsonValue = JSON.stringify(data.data)
                  AsyncStorage.setItem('@kost_data', jsonValue).then(() => {
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'Home'}],
                    })
                  })
                }
              })
          } else if (data.error.code == 409) {
            setKodeError('Kode kost sudah digunakan')
            // setModal2(true)
          }

        })
    })
  }

  const dataKota = [
    "Pilih Kota",
    "Ambon",
    "Balikpapan",
    "Banda Aceh",
    "Bandar Lampung",
    "Bandung",
    "Banjar",
    "Banjarbaru",
    "Banjarmasin",
    "Batam",
    "Batu",
    "Baubau",
    "Bawahlunto",
    "Bekasi",
    "Bengkulu",
    "Bima",
    "Binjai",
    "Bitung",
    "Blitar",
    "Bogor",
    "Bontang",
    "Bukittinggi",
    "Cilegon",
    "Cimahi",
    "Cirebon",
    "Denpasar",
    "Depok",
    "Dumai",
    "Gorontalo",
    "Gunungsitoli",
    "Jakarta Barat",
    "Jakarta Pusat",
    "Jakarta Selatan",
    "Jakarta Timur",
    "Jakarta Utara",
    "Kotamobagu",
    "Kupang",
    "Langsa",
    "Lhokseumawe",
    "Lubuklinggau",
    "Madiun",
    "Magelang",
    "Makassar",
    "Malang",
    "Manado",
    "Mataram",
    "Medan",
    "Metro",
    "Mojokerto",
    "Nusantara",
    "Padang",
    "Padang Panjang",
    "Padangsidimpuan",
    "Pagar Alam",
    "Palangka Raya",
    "Palembang",
    "Palopo",
    "Palu",
    "Pangkalpinang",
    "Parepare",
    "Pariaman",
    "Pasuruan",
    "Payakumbuh",
    "Pekalongan",
    "Pekanbaru",
    "Pematangsiantar",
    "Pontianak",
    "Prabumulih",
    "Probolinggo",
    "Sabang",
    "Semarang",
    "Serang",
    "Sibolga",
    "Singkawang",
    "Solok",
    "Sorong",
    "Subulussalam",
    "Sukabumi",
    "Sungai Penuh",
    "Surabaya",
    "Surakarta",
    "Tangerang",
    "Tangerang Selatan",
    "Tanjungbalai",
    "Tanjungpinang",
    "Tarakan",
    "Tasikmalaya",
    "Tebing Tinggi",
    "Tegal",
    "Ternate",
    "Tidore Kepulauan",
    "Tomohon",
    "Tual",
    "Yogyakarta"
  ]

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Image source={require('../assets/image/kostkuLogo150.png')} style={{ width: 100, height: 100, marginTop: 30 }} />
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 32, color: 'black', marginVertical: 5}} >Buat Rumah Kost</Text>
        { image == '' ?
          <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgray', borderRadius: 100, width: 80, height: 80, marginVertical: 10}} onPress={() => openLibrary()}>
            <Icon size={30} name='image-plus' color='white' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
          </TouchableOpacity>
        :
          <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10}} onPress={() => openLibrary()}>
            <Image source={{uri: 'data:image/jpeg;base64,' + image}} style={{ width: 80, height: 80, borderRadius: 100 }} />
          </TouchableOpacity>
        }
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
          { namaError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{namaError}</Text> : null }
          <View style={[styles.form, { borderColor: kodeError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='pound' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={[styles.input, { borderLeftWidth: 1, borderColor: '#FFB700', marginLeft: 5 }]}
              placeholder="Kode kost"
              placeholderTextColor='#ccc'
              onChangeText={kode => setKode(kode.toUpperCase())}
              value={kode}
              autoCapitalize='characters'
              maxLength={6}
            />
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => {setModal(true)}} >
              <Icon size={15} name='information-outline' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            </TouchableOpacity>
          </View>
          { kodeError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{kodeError}</Text> : null }
          <View style={[styles.form, { borderColor: kotaError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='map-marker-outline' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            {/* <TextInput
              style={styles.input}
              placeholder="Kota"
              placeholderTextColor='#ccc'
              onChangeText={setKota}
              value={kota}
            /> */}
            <Picker
              selectedValue={kota}
              onValueChange={(itemValue, itemIndex) =>
                setKota(itemValue)
              }
              dropdownIconColor='#FFB700'
              style={[styles.input, { width: '90%' }]}
              itemStyle={{fontFamily: 'PlusJakartaSans-Regular'}}
              >
              {/* <Picker.Item label="Java" value="java"/>
              <Picker.Item label="JavaScript" value="js" fontFamily='PlusJakartaSans-Regular' style={styles.pickerItem} /> */}
              {dataKota.map((item, index) => {
                return (
                  <Picker.Item label={item} value={item} key={index} />
                )
              })}
            </Picker>
          </View>
          { kotaError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{kotaError}</Text> : null }
          <View style={[styles.form, { borderColor: alamatError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='directions' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Alamat"
              placeholderTextColor='#ccc'
              onChangeText={setAlamat}
              value={alamat}
            />
          </View>
          { alamatError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{alamatError}</Text> : null }
          <View style={[styles.form, { borderColor: nomorError ? 'red' : '#FFB700' }]}>
            <Icon size={18} name='cellphone' color='#FFB700' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Nomor pengelola"
              placeholderTextColor='#ccc'
              onChangeText={setNomor}
              value={nomor}
              keyboardType='numeric'
            />
          </View>
          { nomorError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{nomorError}</Text> : null }
        </View>
        <TouchableOpacity onPress={() => handleRegister()} style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '40%', borderRadius: 5, marginVertical: 20 }}>
          <Text style={{ fontSize: 20, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }}>Daftar</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='information-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Kode rumah kost</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center', marginBottom: 10 }} >Kode rumah kost dibutuhkan untuk penghuni/penjaga masuk rumah kost. Minimum 3 karakter & maksimal 6 karakter dan unik.</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Contoh: RMHKOS, MWK123</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => setModal(false)}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Mengerti</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* <Modal
        isVisible={modal2}
        onBackdropPress={() => setModal2(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='information-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Terjadi kesalahan</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center', marginBottom: 10 }} >Kode rumah kost dibutuhkan untuk penghuni/penjaga masuk rumah kost. Minimum 3 karakter & maksimal 6 karakter dan unik.</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => setModal2(false)}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Mengerti</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    // height: Dimensions.get('window').height
  },
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    padding: 10,
    alignSelf:  'center',
    fontFamily: 'PlusJakartaSans-Regular'
  },
  pickerItem: {
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