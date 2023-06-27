import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions  } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id'
import { UpdateContext } from './GlobalState';

const CreateEventScreen = ({navigation, route}) => {
  const [judul, setJudul] = useState('')
  const [judulError, setJudulError] = useState('')
  const [tanggal, setTanggal] = useState(route.params.tanggalDipilih)
  const [jam, setJam] = useState('00:00')
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [date, setDate] = useState(new Date(new Date().setHours(24,0,0,0)))
  const [date2, setDate2] = useState('')
  const [open, setOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useContext(UpdateContext)
  const dataRumah = route.params.dataRumah
  const tanggalDipilih = route.params.tanggalDipilih

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

  const CustomArrow = (direction) => {
    return (
      <View style={{ backgroundColor: '#FFB700', padding: 0, borderRadius: 100 }}>
        <Icon size={30} name={`chevron-${direction}`} color='white' style={{ alignSelf: 'center' }} />
      </View>
    )
  }

  const validate = () => {
    let error = false
    if (judul == '') {
      setJudulError('Masukan judul agenda')
      error = true
    } else if (judul.length > 32) {
      setJudulError('Maksimal 32 karakter')
      error = true
    } else {
      setJudulError('')
    }

    if (!error) {
      addEvent()
    }

  }

  const addEvent = () => {
    let data = {
      Rumah_ID: dataRumah.Rumah_ID,
      Event_Nama: judul,
      Event_Tanggal: tanggal,
      Event_Jam: jam
    }
    axios.post(`https://api-kostku.pharmalink.id/skripsi/kostku?register=event`, data)
    .then(({data}) => {
      console.log(data)
      if (data.error.msg == '') {
        setIsUpdate({
          ...isUpdate,
          updateCalendar: true,
          updateDashboard: true
        })
        goBack()
      }
    }).catch((e) => {
      console.log(e, 'error post event')
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
            <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >Buat Agenda Baru</Text>
          </View>
        </View>
        <Image source={dataRumah.Rumah_Image == '' ? require('../assets/image/RumahKost_Default.png') : { uri: dataRumah.Rumah_Image }} style={{ width: 100, height: 100, margin: 10 , borderRadius: 100}} />
        <View style={{ backgroundColor: '#FF7A00', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} >
          <Text style={{ color: 'white', fontSize: 20, fontFamily: 'UbuntuTitling-Bold' }} >{dataRumah.Nama_Rumah}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Agenda Kost</Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Nama agenda</Text>
          <View style={[styles.form, { borderColor: judulError ? 'red' : 'black' }]}>
            <Icon size={18} name='pencil' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Nama agenda'
              placeholderTextColor='#ccc'
              onChangeText={setJudul}
              value={judul}
            />
          </View>
          { judulError ? <Text style={{ alignSelf: 'flex-start', color: 'red', margin: 5, marginTop: -5, fontFamily: 'PlusJakartaSans-Regular' }} >{judulError}</Text> : null }
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold', marginTop: 10 }} >Tanggal</Text>
          <TouchableOpacity style={styles.form} onPress={() => setModal2(true)}>
            <Icon size={18} name='calendar-outline' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Tanggal agenda'
              placeholderTextColor='#ccc'
              onChangeText={setTanggal}
              value={tanggal == '' ? 'Pilih tanggal' : moment(tanggal, 'YYYY-MM-DD').format('dddd, D MMMM YYYY')}
              editable={false}
            />
          </TouchableOpacity>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold', marginTop: 10 }} >Jam</Text>
          <TouchableOpacity style={styles.form} onPress={() => setOpen(true)}>
            <Icon size={18} name='clock-outline' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='00:00'
              placeholderTextColor='#ccc'
              onChangeText={setJam}
              value={jam}
              editable={false}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '35%', borderRadius: 7, marginTop: 20 }} onPress={() => validate()} >
          <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Simpan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, width: '35%', borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginBottom: 20, marginTop: 10 }} onPress={() => setModal(true)} >
          <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Batal</Text>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(jam) => {
          setOpen(false)
          setDate(jam)
          setJam(moment(jam).format('HH:mm'))
        }}
        onCancel={() => {
          setOpen(false)
        }}
        mode='time'
        locale='id-ID'
        is24hourSource='locale'
      />
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Batal membuat agenda?</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Apakah Anda yakin untuk batal membuat agenda?</Text>
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
          initialDate={tanggalDipilih}
          enableSwipeMonths
          onDayPress={day => {
            console.log(day)
            setDate2(day.dateString)
          }}
          renderArrow={(direction) => CustomArrow(direction)}
          markedDates={{
            [date2]: { selected: true, disableTouchEvent: true, selectedColor: '#FFB700' },
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', alignSelf: 'flex-end', marginVertical: 10 }}>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {setDate2(''); setModal2(false)}}>
            <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Batal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: 30 }} onPress={() => {setTanggal(date2); setModal2(false)}}>
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
    height: Dimensions.get('window').height
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


export default CreateEventScreen;