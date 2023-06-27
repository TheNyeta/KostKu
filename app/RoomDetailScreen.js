import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, Modal as Modal1  } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Collapsible from 'react-native-collapsible';
import Modal from 'react-native-modal';
import moment from 'moment';
import 'moment/locale/id'
import ImageViewer from 'react-native-image-zoom-viewer';
import axios from 'axios';
import { UpdateContext } from './GlobalState';

const RoomDetailScreen = ({navigation, route}) => {
  const [image, setImage] = useState('')
  const [nomorKamar, setNomorKamar] = useState('');
  const [statusKamar, setStatusKamar] = useState('');
  const [hargaKamar, setHargaKamar] = useState('');
  const [tanggalMasuk, setTanggalMasuk] = useState('');
  const [nama, setNama] = useState('')
  const [nohp, setNoHp] = useState('')
  const [pekerjaan, setPekerjaan] = useState('')
  const [email, setEmail] = useState('')
  const [namaDarurat, setNamaDarurat] = useState('')
  const [nohpDarurat, setNoHpDarurat] = useState('')
  const [hubungan, setHubungan] = useState('')
  const [imageKtp, setImageKtp] = useState('')
  const [imageNikah, setImageNikah] = useState('')
  const [collapKtp, setCollapKtp] = useState(true)
  const [collapBukuNikah, setCollapBukuNikah] = useState(true)
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [modal3, setModal3] = useState(false)
  const [index, setIndex] = useState(0)
  const [isUpdate, setIsUpdate] = useContext(UpdateContext)
  const dataRumah = route.params.dataRumah
  const kamar = route.params.kamar
  const namaKelompok = route.params.namaKelompok

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    console.log(kamar)
    setImage(kamar.DataPenghuni.Penghuni_Image)
    setNomorKamar(kamar.Kamar_Nomor)
    setStatusKamar(kamar.Kamar_Status)
    setHargaKamar(kamar.Kamar_Harga)
    setTanggalMasuk(kamar.Tanggal_Masuk)
    setNama(kamar.DataPenghuni.Penghuni_Name)
    setNoHp(kamar.DataPenghuni.Penghuni_Number)
    setPekerjaan(kamar.DataPenghuni.Penghuni_Pekerjaan)
    setEmail(kamar.DataPenghuni.Penghuni_Email)
    setImageKtp(kamar.DataPenghuni.Penghuni_FotoKTP)
    setImageNikah(kamar.DataPenghuni.Penghuni_FotoBukuNikah)
    setNamaDarurat(kamar.DataPenghuni.Penghuni_KontakDaruratNama)
    setNoHpDarurat(kamar.DataPenghuni.Penghuni_KontakDaruratNoHP)
    setHubungan(kamar.DataPenghuni.Penghuni_KontakDaruratHubungan)

  }

  const goBack = () => {
    navigation.goBack()
  }

  const goToPaymentLogList = () => {
    navigation.navigate('PaymentLogList', {dataRumah: dataRumah, dataKamar: kamar})
  }

  const goToPembayaranDetail = () => {
    navigation.navigate('PaymentDetail', {dataRumah: dataRumah, kamar: kamar})
  }
  
  const formatHarga = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(price)
  }

  const deleteKamar = () => {
    axios.delete(`https://api-kostku.pharmalink.id/skripsi/kostku?delete=kamar&KamarID=${kamar.Kamar_ID}`)
    .then(({data}) => {
      console.log(data)
      if (data.error.msg == '') {
        setIsUpdate({
          ...isUpdate,
          updateDashboard: true
        })
        goBack()
        navigation.replace('RoomList', {dataRumah: dataRumah, namaKelompok: namaKelompok})
      }
    }).catch((e) => {
      console.log(e, 'error delete kamar')
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
            <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >Data Penghuni</Text>
          </View>
          <TouchableOpacity onPress={() => setModal2(true)} >
            <Icon size={25} name='delete-outline' color='white' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
          </TouchableOpacity>
        </View>
        <Image source={image == '' ? require('../assets/image/Large.png') : { uri: image }} style={{ margin: 10 , borderRadius: 100, width: 100, height: 100}} />
        <View style={{ backgroundColor: '#FF7A00', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} >
          <Text style={{ color: 'white', fontSize: 20, fontFamily: 'UbuntuTitling-Bold' }} >{nomorKamar}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
        <View style={{ flexDirection: 'row', width: '100%', borderRadius: 100, justifyContent: 'space-between', marginTop: 20 }} >
          <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '48%', alignItems: 'center' }} onPress={() => goToPaymentLogList()} disabled={statusKamar != 'Terisi' ? true : false} >
            <View style={{ flexDirection: 'column' }} >
              <Text style={{ color: 'white', fontSize: 30, fontFamily: 'PlusJakartaSans-Bold' }}>{statusKamar == 'Terisi' ? moment(tanggalMasuk, 'YYYY MM DD').format('D MMM') : 'n/a'}</Text>
              <Text style={{ color: 'white', fontSize: 14, fontFamily: 'PlusJakartaSans-Bold' }}>Tanggal masuk</Text>
            </View>
            <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center' }} >
              <Icon size={25} name='login' color='#FFB700' style={{ alignSelf: 'center' }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '48%', alignItems: 'flex-end' }} onPress={() => goToPembayaranDetail()} disabled={statusKamar != 'Terisi' ? true : false} >
            <View style={{ flexDirection: 'column' }} >
              <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold', marginBottom: 5 }}>{formatHarga(hargaKamar)}</Text>
              <Text style={{ color: 'white', fontSize: 14, fontFamily: 'PlusJakartaSans-Bold' }}>Harga sewa</Text>
            </View>
            <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, alignSelf: 'center', justifyContent: 'center' }} >
              <Icon size={25} name='cash-multiple' color='#FFB700' style={{ alignSelf: 'center' }} />
            </View>
          </TouchableOpacity>
        </View>
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
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '50%', borderRadius: 7, marginTop: 20 }} >
          <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, width: '50%', borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginBottom: 20, marginTop: 10 }} onPress={() => setModal(true)} >
          <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Tandai Selesai</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Tandai sebagai selesai</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Apakah Anda yakin untuk tandai penghuni ini telah selesai kost?</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => {}}>
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
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Hapus kamar</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Nomor kamar dan data penghuni akan dihapus seluruhnya. Apakah Anda yakin?</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => deleteKamar()}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Ya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginTop: 10, width: 150 }} onPress={() => {setModal2(false)}}>
            <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Tidak</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal1
        visible={modal3}
        transparent={true}
        onRequestClose={() => setModal3(false)}
      >
        <ImageViewer imageUrls={imageNikah == '' ? [{ url: imageKtp }] : [{ url: imageKtp }, { url: imageNikah }]} index={index}/>
      </Modal1>
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


export default RoomDetailScreen;