import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { launchImageLibrary } from 'react-native-image-picker';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Modal from 'react-native-modal';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id'
import RadioGroup from 'react-native-radio-buttons-group';
import { Picker } from '@react-native-picker/picker';
import { UpdateContext } from './GlobalState';

const CreateLaporanScreen = ({navigation, route}) => {
  const [perihal, setPerihal] = useState('');
  const [perihalError, setPerihalError] = useState('');
  const [laporan, setLaporan] = useState('');
  const [laporanError, setLaporanError] = useState('');
  const [bulan, setBulan] = useState('');
  const [bulanError, setBulanError] = useState('');
  const [tanggalKeluar, setTanggalKeluar] = useState('');
  const [tanggalKeluarError, setTanggalKeluarError] = useState('');
  const [imageLaporan, setImageLaporan] = useState('');
  const [date, setDate] = useState('')
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [modal3, setModal3] = useState(false)
  const [isUpdate, setIsUpdate] = useContext(UpdateContext)
  const dataRumah = route.params.dataRumah
  const dataPenghuni = route.params.dataPenghuni
  const dataKamar = route.params.dataKamar

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

  const radioButton = [
    {
        id: 'Pembayaran',
        label: 'Pembayaran',
        labelStyle: { color: 'black', fontSize: 16, fontFamily: 'PlusJakartaSans-Regular' },
        containerStyle: { padding: 2 },
        value: 'Pembayaran',
        color: perihal == 'Pembayaran' ? '#FFB700' : 'lightgray'

    },
    {
      id: 'Info Keluar Kost',
      label: 'Info Keluar Kost',
      labelStyle: { color: 'black', fontSize: 16, fontFamily: 'PlusJakartaSans-Regular' },
      containerStyle: { padding: 2 },
      value: 'Info Keluar Kost',
      color: perihal == 'Info Keluar Kost' ? '#FFB700' : 'lightgray'
    },
    {
        id: 'Lainnya',
        label: 'Lainnya',
        labelStyle: { color: 'black', fontSize: 16, fontFamily: 'PlusJakartaSans-Regular' },
        containerStyle: { padding: 2 },
        value: 'Lainnya',
        color: perihal == 'Lainnya' ? '#FFB700' : 'lightgray'

    }
  ]

  const CustomArrow = (direction) => {
    return (
      <View style={{ backgroundColor: '#FFB700', padding: 0, borderRadius: 100 }}>
        <Icon size={30} name={`chevron-${direction}`} color='white' style={{ alignSelf: 'center' }} />
      </View>
    )
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
      } else {
        setImageLaporan(res.assets[0].base64)
      }
    })
  }

  const validate = () => {
    let error = false

    if (perihal == '') {
      setPerihalError('Pilih perihal laporan')
      error = true
    } else if (perihal == 'Pembayaran') {
      if (bulan == '') {
        setBulanError('Masukan bulan')
        error = true
      } else {
        setBulanError('')
      }
    } else if (perihal == 'Info Keluar Kost') {
      if (tanggalKeluar == '') {
        setTanggalKeluarError('Masukan tanggal keluar')
        error = true
      } else {
        setTanggalKeluarError('')
      }
    }

    if (laporan == '') {
      setLaporanError('Masukan laporan')
      error = true
    } else if (laporan.length > 225) {
      setLaporanError('Maksimal 225 karakter')
      error = true
    } else {
      setLaporanError('')
    }

    if (!error) {
      createLaporan()
    } 
  }

  const createLaporan = () => {
    setModal2(true)
    let data = {}
    switch (perihal) {
      case 'Pembayaran':
        data = {
          Rumah_ID:dataRumah.Rumah_ID,
          Kamar_ID: dataKamar.Kamar_ID,
          Kamar_Nomor: dataKamar.Kamar_Nomor,
          Kamar_Kelompok: dataKamar.Kamar_Kelompok,
          Penghuni_ID: dataKamar.DataPenghuni.Penghuni_ID,
          Penghuni_Name: dataKamar.DataPenghuni.Penghuni_Name,
          Penghuni_Number: dataKamar.DataPenghuni.Penghuni_Number,
          Penghuni_Image: dataKamar.DataPenghuni.Penghuni_Image,
          Penghuni_Pekerjaan: dataKamar.DataPenghuni.Penghuni_Pekerjaan,
          Perihal_Laporan: perihal,
          Pembayaran_Bulan: bulan,
          Tanggal_Berakhir: dataKamar.Tanggal_Berakhir,
          Bukti_Transfer: "",
          Tanggal_Keluar: "",
          Foto_Laporan: imageLaporan,
          Pesan_Laporan: laporan
        }
        break;
      case 'Info Keluar Kost':
        data = {
          Rumah_ID:dataRumah.Rumah_ID,
          Kamar_ID: dataKamar.Kamar_ID,
          Kamar_Nomor: dataKamar.Kamar_Nomor,
          Kamar_Kelompok: dataKamar.Kamar_Kelompok,
          Penghuni_ID: dataKamar.DataPenghuni.Penghuni_ID,
          Penghuni_Name: dataKamar.DataPenghuni.Penghuni_Name,
          Penghuni_Number: dataKamar.DataPenghuni.Penghuni_Number,
          Penghuni_Image: dataKamar.DataPenghuni.Penghuni_Image,
          Penghuni_Pekerjaan: dataKamar.DataPenghuni.Penghuni_Pekerjaan,
          Perihal_Laporan: perihal,
          Pembayaran_Bulan: "",
          Bukti_Transfer: "",
          Tanggal_Keluar: tanggalKeluar,
          Foto_Laporan: "",
          Pesan_Laporan: laporan
        }
        break;
      case 'Lainnya':
        data = {
          Rumah_ID:dataRumah.Rumah_ID,
          Kamar_ID: dataKamar.Kamar_ID,
          Kamar_Nomor: dataKamar.Kamar_Nomor,
          Kamar_Kelompok: dataKamar.Kamar_Kelompok,
          Penghuni_ID: dataKamar.DataPenghuni.Penghuni_ID,
          Penghuni_Name: dataKamar.DataPenghuni.Penghuni_Name,
          Penghuni_Number: dataKamar.DataPenghuni.Penghuni_Number,
          Penghuni_Image: dataKamar.DataPenghuni.Penghuni_Image,
          Penghuni_Pekerjaan: dataKamar.DataPenghuni.Penghuni_Pekerjaan,
          Perihal_Laporan: perihal,
          Pembayaran_Bulan: "",
          Bukti_Transfer: "",
          Tanggal_Keluar: "",
          Foto_Laporan: imageLaporan,
          Pesan_Laporan: laporan
        }
        break;
    
      default:
        break;
    }

    axios.post(`https://api-kostku.pharmalink.id/skripsi/kostku?register=laporan`, data)
    .then(({data}) => {
      if (data.error.msg == '') {
        setModal2(false)
        setIsUpdate({
          ...isUpdate,
          updateDashboard: true
        })
        goBack()
        navigation.replace('LaporanList', {dataRumah: dataRumah, dataPenghuni: dataPenghuni, dataKamar: dataKamar, role: 'Penghuni'})
      }
    }).catch((e) => {
      console.log(e, 'error create laporan')
    })
  }

  const dataBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "December"
  ]

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container} >
        <View style={{ height: 'auto', width: '100%', backgroundColor: '#FFB700', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', paddingBottom: 10 }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 , width: '100%'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => goBack()}>
                <Icon size={22} name='arrow-left' color='white' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
              </TouchableOpacity>
              <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >Buat Laporan</Text>
            </View>
          </View>
          <Image source={dataPenghuni.Penghuni_Image == '' ? require('../assets/image/Large.png') : { uri: dataPenghuni.Penghuni_Image }} style={{ margin: 10 , borderRadius: 100, width: 100, height: 100}} />
          <View style={{ backgroundColor: '#FF7A00', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} >
            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'UbuntuTitling-Bold' }} >{dataKamar.Kamar_Nomor}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Laporan</Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Perihal</Text>
          <RadioGroup 
            radioButtons={radioButton} 
            onPress={setPerihal}
            selectedId={perihal}
            containerStyle={{ alignItems: 'flex-start', alignSelf: 'flex-start' }}
          />
          { perihalError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{perihalError}</Text> : null }
          { perihal == 'Pembayaran' ?
              <>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Bulan pembayaran</Text>
                <View style={[styles.form, { borderColor: bulanError ? 'red' : 'black' }]} onPress={() => setModal3(true)} >
                  <Icon size={18} name='login' color='black' style={{ alignSelf: 'center' }} />
                  <Picker
                    selectedValue={bulan}
                    onValueChange={(itemValue, itemIndex) =>
                      setBulan(itemValue)
                    }
                    dropdownIconColor='#FFB700'
                    style={[styles.input, { width: '100%' }]}
                    itemStyle={{fontFamily: 'PlusJakartaSans-Regular'}}
                    placeholder='Pilih bulan'
                    >
                    {dataBulan.map((item, index) => {
                      return (
                        <Picker.Item label={item} value={item} key={index} />
                      )
                    })}
                  </Picker>
                </View>
                { bulanError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{bulanError}</Text> : null }
              </>
            :
              null
          }
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%', marginVertical: 10 }} >
            <Icon size={25} name='playlist-edit' color='black' style={{ alignSelf: 'center', marginRight: 5 }} />
            <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Isi laporan</Text>
          </View>
          <View style={{ width: '100%', marginTop: 5, borderWidth: 1, borderColor: laporanError ? 'red' : 'black', borderRadius: 5 }}>
            <TextInput
              style={{ width: '100%', color: 'black', fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, height: 200, textAlignVertical: 'top', padding: 10 }}
              placeholder='Isi laporan'
              placeholderTextColor='#ccc'
              onChangeText={setLaporan}
              value={laporan}
              multiline
              // maxLength={255}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: laporanError ? 'space-between' : 'flex-end', width: '100%' }}>
            { laporanError ? <Text style={{ color: 'red', margin: 5, marginTop: -2, fontFamily: 'PlusJakartaSans-Regular' }} >{laporanError}</Text> : null }
            
            <Text style={{ alignSelf: 'flex-end', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular' }} >{laporan.length}/225</Text>
          </View>
          { perihal == 'Info Keluar Kost' ?
              <>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Tanggal Keluar</Text>
                <TouchableOpacity style={[styles.form, { borderColor: tanggalKeluarError ? 'red' : 'black' }]} onPress={() => setModal3(true)} >
                  <Icon size={18} name='login' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='Tanggal keluar'
                    placeholderTextColor='#ccc'
                    onChangeText={setTanggalKeluar}
                    value={tanggalKeluar == '' ? 'Pilih tanggal keluar' : moment(tanggalKeluar, 'YYYY MM DD').format('dddd, D MMMM YYYY')}
                    editable={false}
                  />
                </TouchableOpacity>
                { tanggalKeluarError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{tanggalKeluarError}</Text> : null }
              </>
            :
              <>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%', marginVertical: 10 }} >
                  <Icon size={25} name='playlist-edit' color='black' style={{ alignSelf: 'center', marginRight: 5 }} />
                  <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Isi laporan</Text>
                </View>
                <TouchableOpacity style={{ width: '100%', height: 150, alignItems: 'center', justifyContent: 'center', marginTop: 5, borderWidth: 1, borderRadius: 5, backgroundColor: imageLaporan == '' ? 'lightgray' : 'white' }} onPress={() => openLibrary()} >
                  { imageLaporan == '' ?
                      <Icon size={50} name='image-plus' color='gray' style={{ alignSelf: 'center' }} />
                    :
                    <Image source={{ uri: 'data:image/png;base64,' + imageLaporan }} style={{ width: '100%', height: '100%' }} resizeMode={'contain'} />
                  }
                </TouchableOpacity>
              </>
          }
        </View>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '35%', borderRadius: 7, marginTop: 20 }} onPress={() => validate()} >
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
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Batal membuat laporan?</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >laporan tidak akan tersimpan jika Anda keluar. Apakah Anda yakin?</Text>
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
          <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: 30 }} onPress={() => {setTanggalKeluar(date); setModal3(false)}}>
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
  }
});


export default CreateLaporanScreen;