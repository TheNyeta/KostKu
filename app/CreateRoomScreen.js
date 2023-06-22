import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Picker } from '@react-native-picker/picker/typings/Picker'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Collapsible from 'react-native-collapsible';
import { launchImageLibrary } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import axios from 'axios';
import RadioGroup from 'react-native-radio-buttons-group';
import moment from 'moment';
import 'moment/locale/id'
import { UpdateContext } from './GlobalState';

const CreateRoomScreen = ({navigation, route}) => {
  const [imagePenghuni, setImagePenghuni] = useState('');
  const [nomorKamar, setNomorKamar] = useState('');
  const [nomorKamarError, setNomorKamarError] = useState('');
  const [statusKamar, setStatusKamar] = useState('Pilih status kamar');
  const [statusKamarError, setStatusKamarError] = useState('');
  const [hargaKamar, setHargaKamar] = useState('');
  const [hargaKamarError, setHargaKamarError] = useState('');
  const [tanggalMasuk, setTanggalMasuk] = useState('');
  const [tanggalMasukError, setTanggalMasukError] = useState('');
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
  const [date, setDate] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [isUpdate, setIsUpdate] = useContext(UpdateContext)
  const dataRumah = route.params.dataRumah
  const kostImage = dataRumah.Rumah_Image
  const namaKelompok = route.params.namaKelompok

  LocaleConfig.locales['id'] = {
    monthNames: [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ],
    dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    dayNamesShort: ['MIN', 'SEN', 'SEL', 'RAB.', 'KAM', 'JUM', 'SAB']
  };

  LocaleConfig.defaultLocale = 'id';

  const goBack = () => {
    navigation.goBack()
  }

  const radioButton = [
      {
          id: '0',
          label: 'Terisi',
          labelStyle: { color: 'black', fontSize: 16, fontFamily: 'PlusJakartaSans-Regular' },
          containerStyle: { paddingVertical: 2 },
          value: 'Terisi',
          color: selectedId == '0' ? '#FFB700' : 'lightgray'

      },
      {
          id: '1',
          label: 'Kosong',
          labelStyle: { color: 'black', fontSize: 16, fontFamily: 'PlusJakartaSans-Regular' },
          containerStyle: { paddingVertical: 2 },
          value: 'Kosong',
          color: selectedId == '1' ? '#FFB700' : 'lightgray'
      },
      {
          id: '2',
          label: 'Tidak bisa digunakan',
          labelStyle: { color: 'black', fontSize: 16, fontFamily: 'PlusJakartaSans-Regular' },
          containerStyle: { paddingVertical: 2 },
          value: 'Tidak Disewakan',
          color: selectedId == '2' ? '#FFB700' : 'lightgray'
      }
  ]

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
  
  const CustomArrow = (direction) => {
    return (
      <View style={{ backgroundColor: '#FFB700', padding: 0, borderRadius: 100 }}>
        <Icon size={30} name={`chevron-${direction}`} color='white' style={{ alignSelf: 'center' }} />
      </View>
    )
  }

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
    if (nomorKamar == '') {
      setNomorKamarError('Masukan nomor kamar')
      error = true
    } else if (nomorKamar.length != 3) {
      setNomorKamarError('Hanya boleh 3 karakter')
      error = true
    } else {
      setNomorKamarError('')
    }

    if (statusKamar == 'Pilih status kamar') {
      setStatusKamarError('Masukan status kamar')
      error = true
    } else {
      setStatusKamarError('')
    }

    let hargare = /^[0-9]*$/
    if (hargaKamar == '') {
      setHargaKamarError('Masukan harga kamar per bulan')
      error = true
    } else if (!hargare.test(hargaKamar)) {
      setHargaKamarError('Harga kamar hanya boleh angka')
      error = true
    } else {
      setHargaKamarError('')
    }

    if (statusKamar == 'Terisi') {

      if (tanggalMasuk == '') {
        setTanggalMasukError('Pilih tanggal masuk')
        error = true
      } else {
        setTanggalMasukError('')
      }

      let namere = /^[a-zA-Z]*$/
      if (nama == '') {
        setNamaError('Masukan nama')
        error = true
      } else if (nama.length < 3) {
        setNamaError('Minimal 3 karakter')
        error = true
      } else if (nama.length > 50) {
        setNamaError('Maksimal 50 karakter')
        error = true
      } else if (!namere.test(nama)) {
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
        setNamaDaruratError('Masukan namaDarurat')
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

    }

    if (!error) {
      addKamar()
    }
  }

  const addKamar = () => {
    let url = 'https://api-kostku.pharmalink.id/skripsi/kostku?register=kamar'

    let data = {
      Rumah_ID: dataRumah.Rumah_ID,
      Kamar_Status: statusKamar,
      Kamar_Nomor: nomorKamar,
      Kamar_Harga: Number(hargaKamar),
      Kamar_Kelompok: namaKelompok,
      Tanggal_Masuk: moment(tanggalMasuk, 'YYYY MM DD').format('YYYY/MM/DD'),
      Tanggal_Berakhir: moment(tanggalMasuk, 'YYYY MM DD').add(1, 'months').format('YYYY/MM/DD'),
      DataPenghuni: {}
    }

    if (statusKamar == 'Terisi') {
      data['DataPenghuni'] = {
        Penghuni_ID: '',
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
      url = 'https://api-kostku.pharmalink.id/skripsi/kostku?register=kamarTerisi'

    }

    axios.post(url, data)
    .then(({data}) => {
      console.log(data)
      if (data.error.msg == '') {
        setIsUpdate({
          ...isUpdate,
          updateDashboard: true
        })
        goBack()
        navigation.replace('RoomList', {dataRumah: dataRumah, namaKelompok: namaKelompok})
      } else if (data.error.code == 103) {
        setNomorKamarError('Nomor kamar sudah digunakan')
      }
    }).catch((e) => {
      console.log(e, 'error post kamar')
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
              <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >Data Kamar</Text>
            </View>
          </View>
          { statusKamar == 'Terisi' ?
              imagePenghuni == '' ?
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgray', borderRadius: 100, width: 100, height: 100, marginVertical: 10}} onPress={() => openLibrary('penghuni')}>
                  <Icon size={40} name='image-plus' color='white' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
                </TouchableOpacity>
              :
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10}} onPress={() => openLibrary('penghuni')}>
                  <Image source={{uri: 'data:image/png;base64,' + imagePenghuni}} style={{ width: 100, height: 100, borderRadius: 100 }} />
                </TouchableOpacity>
            :
              <Image source={kostImage == '' ? require('../assets/image/RumahKost_Default.png') : { uri: kostImage }} style={{ margin: 10 , borderRadius: 100, width: 100, height: 100}} />
          }
          <View style={{ backgroundColor: '#FF7A00', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} >
            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'UbuntuTitling-Bold' }} >{dataRumah.Nama_Rumah}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Data Kamar</Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Nomor Kamar</Text>
          <View style={[styles.form, { borderColor: nomorKamarError ? 'red' : 'black' }]}>
            <Icon size={18} name='format-list-numbered' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Nomor Kamar'
              placeholderTextColor='#ccc'
              onChangeText={setNomorKamar}
              value={nomorKamar}
            />
          </View>
          { nomorKamarError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{nomorKamarError}</Text> : null }
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Status Kamar</Text>
          <TouchableOpacity style={[styles.form, { borderColor: statusKamarError ? 'red' : 'black' }]} onPress={() => setModal2(true)}>
            <Icon size={18} name='tag-outline' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Status Kamar'
              placeholderTextColor='#ccc'
              onChangeText={setStatusKamar}
              value={statusKamar}
              editable={false}
            />
          </TouchableOpacity>
          { statusKamarError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{statusKamarError}</Text> : null }
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Harga Kamar</Text>
          <View style={[styles.form, { borderColor: hargaKamarError ? 'red' : 'black' }]}>
            <Icon size={18} name='cash-multiple' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Harga Kamar'
              placeholderTextColor='#ccc'
              onChangeText={setHargaKamar}
              value={hargaKamar}
              keyboardType='numeric'
            />
          </View>
          { hargaKamarError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{hargaKamarError}</Text> : null }
          { statusKamar != 'Terisi' ?
              null
            :
              <>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Tanggal Masuk</Text>
                <TouchableOpacity style={[styles.form, { borderColor: tanggalMasukError ? 'red' : 'black' }]} onPress={() => setModal3(true)} >
                  <Icon size={18} name='login' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='Tanggal Masuk'
                    placeholderTextColor='#ccc'
                    onChangeText={setTanggalMasuk}
                    value={tanggalMasuk == '' ? 'Pilih tanggal masuk' : moment(tanggalMasuk, 'YYYY MM DD').format('dddd, D MMMM YYYY')}
                    editable={false}
                  />
                </TouchableOpacity>
                { tanggalMasukError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{tanggalMasukError}</Text> : null }
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
              </>
          }
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
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Apakah Anda yakin untuk batal mengisi data kamar?</Text>
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
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: 'white', width: 250, padding: 20, borderRadius: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Text style={{fontSize: 20, fontFamily: 'PlusJakartaSans-SemiBold', color: 'black', textAlign: 'center' }} >Status kamar</Text>
            <TouchableOpacity onPress={() => setModal2(false)}>
              <Icon size={30} name='close' color='lightgray' style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          </View>
          <RadioGroup 
            radioButtons={radioButton} 
            onPress={setSelectedId}
            selectedId={selectedId}
            containerStyle={{ alignItems: 'flex-start' }}
          />
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150, alignSelf: 'center' }} onPress={() => {setStatusKamar(radioButton[selectedId].label); setStatusKamarError(''); setModal2(false)}}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Simpan</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={modal3}
        onBackdropPress={() => setModal3(false)}
      >
        <View style={{flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', borderRadius: 20, width: '100%' }}>
        <Calendar
          style={{ width: Dimensions.get('window').width*0.8, marginVertical: 10 }}
          theme={{
            // textSectionTitleColor: '#FFB700',
            monthTextColor: '#FFB700',
            textMonthFontFamily: 'PlusJakartaSans-Bold',
            textDayFontFamily: 'PlusJakartaSans-Regular',
            dotColor: '#FFB700',
            indicatorColor: '#FFB700',
            todayTextColor: '#FFB700',
            selectedDotColor: '#FFFFFF',
          }}
          firstDay={1}
          enableSwipeMonths
          onDayPress={day => {
            setDate(day.dateString)
          }}
          renderArrow={(direction) => CustomArrow(direction)}
          markedDates={{
            [date]: { selected: true, disableTouchEvent: true, selectedColor: '#FFB700' },
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', alignSelf: 'flex-end', marginVertical: 10 }}>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {setDate(''); setModal3(false)}}>
            <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Batal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: 30 }} onPress={() => {setTanggalMasuk(date); setModal3(false)}}>
            <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Ok</Text>
          </TouchableOpacity>
        </View>
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


export default CreateRoomScreen;