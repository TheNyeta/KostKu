import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, Dimensions, Modal as Modal1, ScrollView, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Picker } from '@react-native-picker/picker/typings/Picker'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Collapsible from 'react-native-collapsible';
import Modal from 'react-native-modal';
import RadioGroup from 'react-native-radio-buttons-group';
import moment from 'moment';
import 'moment/locale/id'
import ImageViewer from 'react-native-image-zoom-viewer';
import axios from 'axios';

const NewPenghuniDetailScreen = ({navigation, route}) => {
  const [nomorKamar, setNomorKamar] = useState('');
  const [statusKamar, setStatusKamar] = useState('');
  const [hargaKamar, setHargaKamar] = useState('');
  const [tanggalMasuk, setTanggalMasuk] = useState('');
  const [nama, setNama] = useState('')
  const [gender, setGender] = useState('')
  const [nohp, setNoHp] = useState('')
  const [pekerjaan, setPekerjaan] = useState('')
  const [email, setEmail] = useState('')
  const [namaDarurat, setNamaDarurat] = useState('')
  const [nohpDarurat, setNoHpDarurat] = useState('')
  const [hubungan, setHubungan] = useState('')
  const [image, setImage] = useState('')
  const [imageKtp, setImageKtp] = useState('')
  const [imageNikah, setImageNikah] = useState('')
  const [collapKtp, setCollapKtp] = useState(true)
  const [collapBukuNikah, setCollapBukuNikah] = useState(true)
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [modal3, setModal3] = useState(false)
  const [modal4, setModal4] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [listKamar, setListKamar] = useState(true)
  const [index, setIndex] = useState(0)
  const [kamar, setKamar] = useState([])
  const [radio, setRadio] = useState([])
  const [date, setDate] = useState('')
  const [selectedId, setSelectedId] = useState(0)
  const data = route.params.data
  const dataRumah = route.params.dataRumah

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

  const CustomArrow = (direction) => {
    return (
      <View style={{ backgroundColor: '#FFB700', padding: 0, borderRadius: 100 }}>
        <Icon size={30} name={`chevron-${direction}`} color='white' style={{ alignSelf: 'center' }} />
      </View>
    )
  }

  const radioButtonGender = [
    {
        id: 'Pria',
        label: 'Pria',
        labelStyle: { color: 'black', fontSize: 16, fontFamily: 'PlusJakartaSans-Regular' },
        containerStyle: { marginRight: 50, padding: 2 },
        value: 'Pria',
        color: gender == 'Pria' ? '#FFB700' : 'lightgray',
        // disabled: true

    },
    {
        id: 'Wanita',
        label: 'Wanita',
        labelStyle: { color: 'black', fontSize: 16, fontFamily: 'PlusJakartaSans-Regular' },
        containerStyle: { padding: 2 },
        value: 'Wanita',
        color: gender == 'Wanita' ? '#FFB700' : 'lightgray',
        // disabled: true
    }
  ]

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    setNama(data.DataPenghuni.Penghuni_Name)
    setNoHp(data.DataPenghuni.Penghuni_Gender)
    setNoHp(data.DataPenghuni.Penghuni_Number)
    setPekerjaan(data.DataPenghuni.Penghuni_Pekerjaan)
    setEmail(data.DataPenghuni.Penghuni_Email)
    setImage(data.DataPenghuni.Penghuni_Image)
    setImageKtp(data.DataPenghuni.Penghuni_FotoKTP)
    setImageNikah(data.DataPenghuni.Penghuni_FotoBukuNikah)
    setNamaDarurat(data.DataPenghuni.Penghuni_KontakDaruratNama)
    setNoHpDarurat(data.DataPenghuni.Penghuni_KontakDaruratNoHP)
    setHubungan(data.DataPenghuni.Penghuni_KontakDaruratHubungan)

    getKamarList()

  }

  const goBack = () => {
    navigation.goBack()
  }

  const goToCreateRoom = () => {
    setModal2(false)
    navigation.navigate('CreateRoom', {dataRumah: dataRumah})
  }

  const getKamarList = () => {
    setIsLoading(true)
    axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=KamarKosong&RumahID=${dataRumah.Rumah_ID}`)
      .then(({data}) => {
        if (data.error.msg == '') {
          setListKamar(data.data)

          let radio = []
          let id = 0
          data.data.forEach((item) => {
            let button = {
              id: id,
              label: `Kamar ${item.Kamar_Nomor} - ${item.Kamar_Kelompok}`,
              labelStyle: { color: 'black', fontSize: 16, fontFamily: 'PlusJakartaSans-Regular' },
              containerStyle: { paddingVertical: 2 },
              value: item.KelompokKamar_Nama,
              color: '#FFB700'
            }
            radio.push(button)
            id = id + 1
          })

          setRadio(radio)
        }
        setIsLoading(false)
      }).catch((e) => {
        console.log(e, 'error get list kamar kosong')
      })
  }

  const terima = () => {
    axios.put(`https://api-kostku.pharmalink.id/skripsi/kostku?update=orderBerhasil&OrderID=${data.Order_ID}&KamarID=${kamar.Kamar_ID}&tanggalMasuk=${tanggalMasuk}&tanggalKeluar=${moment(tanggalMasuk, 'YYYY MM DD').add(1, 'months')}&kamarStatus=Terisi`)
      .then(({data}) => {
        if (data.error.msg == '') {
          goBack()
          navigation.replace('NewPenghuniList', {dataRumah: dataRumah})
        }
      }).catch((e) => {
        console.log(e, 'error get list kamar kosong')
      })
  }

  const formatHarga = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(price)
  }


  const handlePilihKamar = () => {
    setModal2(false)
    setKamar(listKamar[selectedId])
    setNomorKamar(listKamar[selectedId].Kamar_Nomor)
    setHargaKamar(formatHarga(listKamar[selectedId].Kamar_Harga))

  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container} >
        <View style={{ height: 'auto', width: '100%', backgroundColor: '#FFB700', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', paddingBottom: 10 }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', padding: 5 , width: '100%'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => goBack()} >
                <Icon size={22} name='arrow-left' color='white' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
              </TouchableOpacity>
              <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >Data Penghuni</Text>
            </View>
          </View>
          {/* <Image source={require('../assets/image/Large.png')} style={{ margin: 10 , borderRadius: 100}} /> */}
          <Image source={image == '' ? require('../assets/image/Large.png') : { uri: image }} style={{ height: 100, width: 100, borderRadius: 100, marginVertical: 5}} />
          <View style={{ backgroundColor: '#FF7A00', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} >
            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'UbuntuTitling-Bold' }} >101</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Data Kamar</Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Nomor Kamar</Text>
          <TouchableOpacity style={styles.form} onPress={() => setModal2(true)}>
            <Icon size={18} name='format-list-numbered' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Pilih Nomor Kamar'
              placeholderTextColor='#ccc'
              onChangeText={setNomorKamar}
              value={nomorKamar}
              editable={false}
            />
          </TouchableOpacity>
          { nomorKamar == '' ?
              null
            :
              <>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Harga Kamar</Text>
                <View style={styles.form}>
                  <Icon size={18} name='cash-multiple' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='Harga Kamar'
                    placeholderTextColor='#ccc'
                    onChangeText={setHargaKamar}
                    value={hargaKamar}
                    editable={false}
                  />
                </View>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Tanggal Masuk</Text>
                <TouchableOpacity style={styles.form} onPress={() => setModal4(true)}>
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
              </>
            }
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Data Pribadi</Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Nama</Text>
          <View style={styles.form}>
            <Icon size={18} name='pencil' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Nama'
              placeholderTextColor='#ccc'
              onChangeText={setNama}
              value={nama}
              editable={false}
            />
          </View>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Jenis Kelamin</Text>
          <RadioGroup 
            radioButtons={radioButtonGender} 
            // onPress={setGender}
            selectedId={gender}
            layout='row'
            containerStyle={{ alignItems: 'flex-start', alignSelf: 'flex-start' }}
          />
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >No.HP</Text>
          <View style={styles.form}>
            <Icon size={18} name='cellphone' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='No.HP'
              placeholderTextColor='#ccc'
              onChangeText={setNoHp}
              value={nohp}
              editable={false}
            />
          </View>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Pekerjaan</Text>
          <View style={styles.form}>
            <Icon size={18} name='briefcase-outline' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Pekerjaan'
              placeholderTextColor='#ccc'
              onChangeText={setPekerjaan}
              value={pekerjaan}
              editable={false}
            />
          </View>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Email</Text>
          <View style={styles.form}>
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
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginVertical: 5 }} onPress={() => setCollapKtp(!collapKtp)} >
            <View style={{ flexDirection: 'row' }} >
              <Icon size={18} name='credit-card-outline' color='black' style={{ alignSelf: 'center', marginRight: 5 }} />
              <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Foto KTP</Text>
            </View>
            <Icon size={18} name={collapKtp ? 'chevron-down' : 'chevron-up' } color='black' style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
          <Collapsible collapsed={collapKtp} >
            { imageKtp == '' ?
                <Icon size={50} name='image-off' color='lightgray' style={{ alignSelf: 'center' }} />
              :
                <View style={{ width: Dimensions.get('window').width*0.9, height: Dimensions.get('window').height*0.3 }}>
                  <TouchableOpacity onPress={() => {setIndex(0); setModal3(true)}} style={{ width: '100%' }}>
                    <Image source={{ uri: imageKtp }} style={{ width: '100%', height: '100%' }} resizeMode={'contain'} />
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
                <Icon size={50} name='image-off' color='lightgray' style={{ alignSelf: 'center' }} />
              :
                <View style={{ width: Dimensions.get('window').width*0.9, height: Dimensions.get('window').height*0.3 }}>
                  <TouchableOpacity onPress={() => {setIndex(1); setModal3(true)}} style={{ width: '100%' }}>
                    <Image source={{ uri: imageNikah }} style={{ width: '100%', height: '100%' }} resizeMode={'contain'} />
                  </TouchableOpacity>
                </View>
            }
          </Collapsible>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Data Kontak Darurat</Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Nama</Text>
          <View style={styles.form}>
            <Icon size={18} name='pencil' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Nama'
              placeholderTextColor='#ccc'
              onChangeText={setNamaDarurat}
              value={namaDarurat}
              editable={false}
            />
          </View>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >No.HP</Text>
          <View style={styles.form}>
            <Icon size={18} name='cellphone' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='No.HP'
              placeholderTextColor='#ccc'
              onChangeText={setNoHpDarurat}
              value={nohpDarurat}
              editable={false}
            />
          </View>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Hubungan</Text>
          <View style={styles.form}>
            <Icon size={18} name='account-multiple' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Hubungan'
              placeholderTextColor='#ccc'
              onChangeText={setHubungan}
              value={hubungan}
              editable={false}
            />
          </View>
        </View>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '35%', borderRadius: 7, marginTop: 20 }} >
          <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Terima</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, width: '35%', borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginBottom: 20, marginTop: 10 }} onPress={() => {setModal(true)}}>
          <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Tolak</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Tolak penghuni</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Apakah Anda yakin untuk tolak penghuni? Penghuni perlu mengirim ulang kembali setelah ini.</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => {}}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Ya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginTop: 10, width: 150 }} onPress={() => setModal(false)}>
            <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Tidak</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={modal2}
        onBackdropPress={() => setModal2(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20, borderRadius: 20, width: '100%', height: Dimensions.get('window').height*0.8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Text style={{fontSize: 20, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Pilih nomor kamar</Text>
            <TouchableOpacity onPress={() => setModal2(false)}>
              <Icon size={30} name='close' color='black' style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          </View>
          { isLoading ? 
              <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginVertical: 100 }} />
            :
              <>
                {radio.length == 0 ?
                  <Image source={require('../assets/image/EmptyStateImg_General.png')} style={{ alignSelf: 'center', width: 150, height: 150, marginTop: 50 }} />
                :
                  <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start', paddingVertical: 10}}>
                    <RadioGroup 
                      radioButtons={radio}
                      onPress={setSelectedId}
                      selectedId={selectedId}
                      containerStyle={{ alignItems: 'flex-start', alignSelf: 'flex-start', width: '100%' }}
                    />
                  </ScrollView>  
                }
                <TouchableOpacity onPress={() => goToCreateRoom()}>
                  <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Bold', color: '#FFB700', textAlign: 'center' }} >Tidak ada di daftar? Buat kamar baru</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => handlePilihKamar()}>
                  <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Pilih Kamar</Text>
                </TouchableOpacity>
              </>
          }
        </View>
      </Modal>
      <Modal1
        visible={modal3}
        transparent={true}
        onRequestClose={() => setModal3(false)}
      >
        <ImageViewer imageUrls={imageNikah == '' ? [{ url: imageKtp }] : [{ url: imageKtp }, { url: imageNikah }]} index={index}/>
      </Modal1>
      <Modal
        isVisible={modal4}
        onBackdropPress={() => setModal4(false)}
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
            console.log(day)
            setDate(day.dateString)
          }}
          renderArrow={(direction) => CustomArrow(direction)}
          markedDates={{
            [date]: { selected: true, disableTouchEvent: true, selectedColor: '#FFB700' },
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', alignSelf: 'flex-end', marginVertical: 10 }}>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {setDate(''); setModal4(false)}}>
            <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Batal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: 30 }} onPress={() => {setTanggalMasuk(date); setModal4(false)}}>
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


export default NewPenghuniDetailScreen;