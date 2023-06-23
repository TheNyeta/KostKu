import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { UpdateContext } from './GlobalState';

const KostEditScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [image, setImage] = useState('')
  const [nama, setNama] = useState('')
  const [namaError, setNamaError] = useState('')
  const [kode, setKode] = useState('')
  const [kota, setKota] = useState('')
  const [kotaError, setKotaError] = useState('')
  const [alamat, setAlamat] = useState('')
  const [alamatError, setAlamatError] = useState('')
  const [nohp1, setNoHp1] = useState('')
  const [nohp1Error, setNoHp1Error] = useState('')
  const [nohp2, setNoHp2] = useState('')
  const [nohp2Error, setNoHp2Error] = useState('')
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [isUpdate, setIsUpdate] = useContext(UpdateContext)
  const dataRumah = route.params.dataRumah

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

  useEffect(() => {
    init()
  }, [])

  const init = () => {
      setIsLoading(false)
      setNama(dataRumah.Nama_Rumah)
      setKode(dataRumah.Special_Code)
      setKota(dataRumah.Kota_Name)
      setAlamat(dataRumah.Lokasi_Rumah)
      setNoHp1(dataRumah.Nomor_Hp_Rumah1)
      setNoHp2(dataRumah.Nomor_Hp_Rumah2)

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

  const goBack = () => {
    navigation.goBack()
  }

  const validate = () => {
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
    if (nohp1 != '') {
      if (nohp1.length < 8) {
        setNoHp1Error('Minimal 8 digit')
        error = true
      } else if (nohp1.length > 12) {
        setNoHp1Error('Maksimal 12 digit')
        error = true
      } else if (!phonere.test(nohp1)) {
        setNoHp1Error('Nomor HP hanya boleh angka')
        error = true
      } else {
        setNoHp1Error('')
      }
    } 

    if (nohp2 != '') {
      if (nohp2.length < 8) {
        setNoHp2Error('Minimal 8 digit')
        error = true
      } else if (nohp2.length > 12) {
        setNoHp2Error('Maksimal 12 digit')
        error = true
      } else if (!phonere.test(nohp2)) {
        setNoHp2Error('Nomor HP hanya boleh angka')
        error = true
      } else {
        setNoHp2Error('')
      }
    } 

    if (!error) {
      updateKost()
    }

  }

  const updateKost = () => {
    setModal2(true)
    let data = {
      Rumah_ID: dataRumah.Rumah_ID,
      Nama_Rumah: nama,
      Kota_Name: kota,
      Lokasi_Rumah: alamat,
      Nomor_Hp_Rumah1: nohp1,
      Nomor_Hp_Rumah2: nohp2,
      Rumah_Image: image == '' ? dataRumah.Rumah_Image : ('data:image/png;base64,' + image)
    }
    axios.put(`https://api-kostku.pharmalink.id/skripsi/kostku?update=rumah`, data)
      .then(({data}) => {
        console.log(data)
        if (data.error.msg == '') {
          let kostdata = {
            ...dataRumah,
            Nama_Rumah: nama,
            Kota_Name: kota,
            Lokasi_Rumah: alamat,
            Nomor_Hp_Rumah1: nohp1,
            Nomor_Hp_Rumah2: nohp2,
            Rumah_Image: image == '' ? dataRumah.Rumah_Image : ('data:image/png;base64,' + image)
          }
          const value = JSON.stringify(kostdata)
          AsyncStorage.setItem('@kost_data', value)
            .then(() => {
              setModal2(false)
              setIsUpdate({
                ...isUpdate,
                updateDashboard: true,
                updateCalendar: true
              })
              goBack()
              goBack()
              navigation.replace('Kost')
            })
            
        }
      }).catch((e) => {
        console.log(e, 'error edit kost')
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
              <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >Data Rumah Kost</Text>
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
          <View style={{ backgroundColor: '#FF7A00', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} >
            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'UbuntuTitling-Bold' }} >{nama}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Data Rumah Kost</Text>
          { isLoading ? 
              <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center' }} />
            :
              <>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Nama rumah kost</Text>
                <View style={[styles.form, { borderColor: namaError ? 'red' : 'black' }]}>
                  <Icon size={18} name='home-city-outline' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='Nama'
                    placeholderTextColor='#ccc'
                    onChangeText={setNama}
                    value={nama}
                  />
                </View>
                { namaError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{namaError}</Text> : null }
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Kode rumah kost</Text>
                <View style={[styles.form, { backgroundColor: 'gray', opacity: 0.2 }]}>
                  <Icon size={18} name='pound' color='black' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
                  <TextInput
                    style={[styles.input, { borderLeftWidth: 1, borderColor: 'black', marginLeft: 5 }]}
                    placeholder="Kode kost"
                    placeholderTextColor='#ccc'
                    onChangeText={kode => setKode(kode.toUpperCase())}
                    value={kode}
                    autoCapitalize='characters'
                    maxLength={6}
                    editable={false}
                  />
                </View>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Kota</Text>
                <View style={[styles.form, { borderColor: kotaError ? 'red' : 'black' }]}>
                  <Icon size={18} name='map-marker-outline' color='black' style={{ alignSelf: 'center' }} />
                  {/* <TextInput
                    style={styles.input}
                    placeholder='Kota'
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
                    style={[styles.input, { width: '100%' }]}
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
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Alamat</Text>
                <View style={[styles.form, { borderColor: alamatError ? 'red' : 'black' }]}>
                  <Icon size={18} name='directions' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='Alamat'
                    placeholderTextColor='#ccc'
                    onChangeText={setAlamat}
                    value={alamat}
                  />
                </View>
                { alamatError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{alamatError}</Text> : null }
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >No. pengelola kost</Text>
                <View style={[styles.form, { borderColor: nohp1Error ? 'red' : 'black' }]}>
                  <Icon size={18} name='cellphone' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='No. pengelola'
                    placeholderTextColor='#ccc'
                    onChangeText={setNoHp1}
                    value={nohp1}
                    keyboardType='numeric'
                  />
                </View>
                { nohp1Error ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{nohp1Error}</Text> : null }
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >No. penjaga kost</Text>
                <View style={[styles.form, { borderColor: nohp2Error ? 'red' : 'black' }]}>
                  <Icon size={18} name='cellphone' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='No. penjaga'
                    placeholderTextColor='#ccc'
                    onChangeText={setNoHp2}
                    value={nohp2}
                    keyboardType='numeric'
                  />
                </View>
                { nohp2Error ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{nohp2Error}</Text> : null }
              </>
          }
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
            <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Batal mengisi</Text>
            <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Apakah Anda yakin untuk batal mengisi informasi rumah kost?</Text>
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
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
    // justifyContent: 'center'
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


export default KostEditScreen;