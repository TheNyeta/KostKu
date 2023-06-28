import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, Modal as Modal1 } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Collapsible from 'react-native-collapsible';
import Modal from 'react-native-modal';
import axios from 'axios';
import moment from 'moment';
import ImageViewer from 'react-native-image-zoom-viewer';
import { UpdateContext } from './GlobalState';

const LaporanDetailScreen = ({navigation, route}) => {
  const [image, setImage] = useState('')
  const [imageLaporan, setImageLaporan] = useState('')
  const [noKamar, setNoKamar] = useState('')
  const [nama, setNama] = useState('')
  const [perihal, setPerihal] = useState('')
  const [nohp, setNoHp] = useState('')
  const [pekerjaan, setPekerjaan] = useState('')
  const [bulan, setBulan] = useState('')
  const [tanggal, setTanggal] = useState('')
  const [tanggalKeluar, setTanggalKeluar] = useState('')
  const [jam, setJam] = useState('')
  const [detail, setDetail] = useState('')
  const [status, setStatus] = useState('')
  const [collapDetail, setCollapDetail] = useState(false)
  const [collapFoto, setCollapFoto] = useState(true)
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [modal3, setModal3] = useState(false)
  const [isUpdate, setIsUpdate] = useContext(UpdateContext)
  const laporan = route.params.laporan
  const dataRumah = route.params.dataRumah
  const role = route.params.role

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    setImage(laporan.Penghuni_Image)
    setNoKamar(laporan.Kamar_Nomor)
    setNama(laporan.Penghuni_Name)
    setPerihal(laporan.Perihal_Laporan)
    setNoHp(laporan.Penghuni_Number)
    setPekerjaan(laporan.Penghuni_Pekerjaan)
    setBulan(laporan.Pembayaran_Bulan)
    setTanggal(laporan.Tanggal_Laporan)
    setTanggalKeluar(moment(laporan.Tanggal_Keluar, 'YYYY MM DD').format('dddd, D MMMM YYYY'))
    setJam(laporan.Jam_Laporan)
    setDetail(laporan.Pesan_Laporan)
    setStatus(laporan.Status_Laporan)
    setImageLaporan(laporan.Foto_Laporan)

  }

  const goBack = () => {
    navigation.goBack()
  }

  const updateLaporan = (status) => {
    setModal(false)
    setModal2(false)
    axios.put(`https://api-kostku.pharmalink.id/skripsi/kostku?laporan=${status}&LaporanID=${laporan.Laporan_ID}`)
      .then(({data}) => {
        if (data.error.msg == '') {

          if (perihal == 'Pembayaran') {
            let log = {
              Rumah_ID: dataRumah.Rumah_ID,
              Kamar_ID: laporan.Kamar_ID,
              Kamar_Nomor: laporan.Kamar_Nomor,
              Kamar_Kelompok: laporan.Kamar_Kelompok,
              Kamar_Harga: laporan.Kamar_Harga,
              Penghuni_ID: laporan.Penghuni_ID,
              Tanggal_Berakhir: laporan.Tanggal_Berakhir
            }
            axios.post(`https://api-kostku.pharmalink.id/skripsi/kostku?register=logPembayaran`, log)
              .then(() => {
                let kontrak = {
                  Tanggal_Berakhir: moment(laporan.Tanggal_Berakhir, 'YYYY MM DD').add(1, 'months').format('YYYY-MM-DD')
                }
                console.log(kontrak, 'yang baru')
                axios.put(`https://api-kostku.pharmalink.id/skripsi/kostku?update=pembaruanKontrak&KamarID=${laporan.Kamar_ID}`, kontrak)
                  .then(() => {
                    console.log('post log and update kontrak done')
                  }).catch((e) => {
                    console.log(e, 'error update kontrak')
                  })
            }).catch((e) => {
              console.log(e, 'error post log pembayaran')
            })
          }
          
          setIsUpdate({
            ...isUpdate,
            updateDashboard: true
          })
          goBack()
          navigation.replace('LaporanList', {dataRumah: dataRumah})
        }
      }).catch((e) => {
        console.log(e, 'error update laporan')
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
            <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >Data Laporan</Text>
          </View>
        </View>
        <Image source={image == '' ? require('../assets/image/Large.png') : { uri: image }} style={{ height: 100, width: 100, borderRadius: 100, marginVertical: 5 }} />
        <View style={{ backgroundColor: '#FF7A00', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} >
          <Text style={{ color: 'white', fontSize: 20, fontFamily: 'UbuntuTitling-Bold' }} >{noKamar}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Laporan</Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Pelapor</Text>
          <View style={styles.form}>
            <Icon size={18} name='human-greeting' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Nama'
              placeholderTextColor='#ccc'
              onChangeText={setNama}
              value={nama}
              editable={false}
            />
          </View>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Perihal</Text>
          <View style={styles.form}>
            <Icon size={18} name='playlist-edit' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Perihal'
              placeholderTextColor='#ccc'
              onChangeText={setPerihal}
              value={perihal}
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
          { perihal == 'Pembayaran' ? 
              <>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Pembayaran Bulan</Text>
                <View style={styles.form}>
                  <Icon size={18} name='calendar-blank-outline' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='Pekerjaan'
                    placeholderTextColor='#ccc'
                    onChangeText={setBulan}
                    value={bulan}
                    editable={false}
                  />
                </View>
              </>
            :
              null
            }
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Tanggal laporan</Text>
          <View style={styles.form}>
            <Icon size={18} name='calendar-blank-outline' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Tanggal'
              placeholderTextColor='#ccc'
              onChangeText={setTanggal}
              value={tanggal}
              editable={false}
            />
          </View>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Jam laporan</Text>
          <View style={styles.form}>
            <Icon size={18} name='clock-outline' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Jam'
              placeholderTextColor='#ccc'
              onChangeText={setJam}
              value={jam}
              editable={false}
            />
          </View>
          { perihal == 'Info Keluar Kost' ? 
              <>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Tanggal Keluar</Text>
                <View style={styles.form}>
                  <Icon size={18} name='calendar-blank-outline' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='Pekerjaan'
                    placeholderTextColor='#ccc'
                    onChangeText={setTanggalKeluar}
                    value={tanggalKeluar}
                    editable={false}
                  />
                </View>
              </>
            :
              null
            }
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginVertical: 5 }} onPress={() => {setCollapDetail(!collapDetail)}} >
            <View style={{ flexDirection: 'row' }} >
              <Icon size={25} name='playlist-edit' color='black' style={{ alignSelf: 'center', marginRight: 5 }} />
              <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Detail laporan</Text>
            </View>
            <Icon size={18} name={collapDetail ? 'chevron-down' : 'chevron-up' } color='black' style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
          <Collapsible collapsed={collapDetail} >
            <View style={{ width: Dimensions.get('window').width*0.9, marginTop: 5, borderWidth: 1, borderColor: 'black', borderRadius: 5, marginBottom: 20 }}>
              <TextInput
                style={{ width: '100%', color: 'black', fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, height: 200, textAlignVertical: 'top', padding: 10 }}
                placeholder='Isi pesan'
                placeholderTextColor='#ccc'
                onChangeText={setDetail}
                value={detail}
                multiline
                maxLength={500}
                editable={false}
              />
            </View>
          </Collapsible>
          { perihal == 'Info Keluar Kost' ?
              null
            :
              <>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginVertical: 5 }} onPress={() => {setCollapFoto(!collapFoto)}} >
                  <View style={{ flexDirection: 'row' }} >
                    <Icon size={25} name='image-outline' color='black' style={{ alignSelf: 'center', marginRight: 5 }} />
                    <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >{perihal == 'Pembayaran' ? 'Foto Bukti Transfer' : 'Foto Laporan'}</Text>
                  </View>
                  <Icon size={18} name={collapFoto ? 'chevron-down' : 'chevron-up' } color='black' style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
                <Collapsible collapsed={collapFoto} >
                { imageLaporan == '' ?
                    <Icon size={50} name='image-off' color='lightgray' style={{ alignSelf: 'center' }} />
                  :
                    <View style={{ width: Dimensions.get('window').width*0.9, height: Dimensions.get('window').height*0.5 }}>
                      <TouchableOpacity onPress={() => setModal3(true)} style={{ width: '100%' }}>
                        <Image source={{ uri: imageLaporan }} style={{ width: '100%', height: '100%' }} resizeMode={'contain'} />
                      </TouchableOpacity>
                    </View>
                }
                </Collapsible>
              </>
          }
        </View>
        { role == 'Penghuni' ?
            null
          :
            status != 'Dilaporkan' ? 
              null
            :
              <>
                <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '50%', borderRadius: 7, marginTop: 20 }} onPress={() => setModal(true)} >
                  <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Terima Laporan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, width: '50%', borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginBottom: 20, marginTop: 10 }} onPress={() => setModal2(true)} >
                  <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Tolak Laporan</Text>
                </TouchableOpacity>
              </>
        }
      </View>
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Terima laporan</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Apakah Anda yakin untuk tandai terima laporan ini?</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => updateLaporan('diterima')}>
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
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Tolak laporan</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Apakah Anda yakin untuk tolak laporan ini? Penghuni perlu membuat laporan baru setelahnya</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => updateLaporan('ditolak')}>
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
        <ImageViewer imageUrls={[{ url: imageLaporan }]} />
      </Modal1>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingBottom: 20
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


export default LaporanDetailScreen;