import React, { useState, useEffect, useContext }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id'
import { UpdateContext } from './GlobalState';
import { useIsFocused } from '@react-navigation/native';

const CalendarScreen = ({navigation}) => {
  const [role, setRole] = useState('')
  const [image, setImage] = useState('')
  const [date, setDate] = useState('')
  const [event, setEvent] = useState([])
  const [markedDate, setMarkedDate] = useState({})
  const [dataRumah, setDataRumah] = useState({})
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdate, setIsUpdate] = useContext(UpdateContext)
  const isFocused = useIsFocused()

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

  useEffect(() => {
    // setDate(moment().format('YYYY-MM-DD'))
    init()
  }, [])

  useEffect(() => {
    // init()
    if (isFocused) {
      if (isUpdate.updateCalendar == true) {
        setIsLoading(true)
        setDate('')
        init()
      }
    }
  }, [isFocused])

  useEffect(() => {
    let event = []
    data.forEach((item) => {
      if (item.Event_Tanggal == date || item.Tanggal_Berakhir == date) {
        event.push(item)
      }
    })
    setFilterData(event)
  }, [date])

  const init = () => {
    // setIsLoading(true)
    AsyncStorage.getItem('@user_role').then((data) => {
      let role = data
      setRole(role)
      if (role == 'Penghuni') {
        AsyncStorage.getItem('@user_data').then((data) => {
          const value = JSON.parse(data)
          setImage(value.Penghuni_Image)
    
          axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=event&RumahID=${value.Penghuni_Tinggal_Rumah}`)
            .then(({data}) => {
              if (data.error.msg == '' && data.data != null) {
      
                let data1 = data.data
                let dates = {}
      
                data.data.forEach((item) => {
                  dates[item.Event_Tanggal] = { marked: true }
                })
      
                setData(data1)
                setMarkedDate(dates)
                setIsUpdate({
                  ...isUpdate,
                  updateCalendar: false
                })
              }
              setIsLoading(false)
            }).catch((e) => {
              console.log(e, 'error get event')
            })
        })

      } else {
        AsyncStorage.getItem('@kost_data').then((data) => {
          const value = JSON.parse(data)
          setDataRumah(value)
          setImage(value.Rumah_Image)
    
          axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=event&RumahID=${value.Rumah_ID}`)
            .then(({data}) => {
              if (data.error.msg == '' && data.data != null) {
      
                let data1 = data.data
                let dates = {}
      
                data.data.forEach((item) => {
                  dates[item.Event_Tanggal] = { marked: true }
                })
      
                axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=pembayaranKamar&RumahID=${value.Rumah_ID}`)
                .then(({data}) => {
                  if (data.error.msg == '' && data.data != null) {
    
                    let data2 = data.data
    
                    data.data.forEach((item) => {
                      dates[item.Tanggal_Berakhir] = { marked: true }
                    })
                    
                    setData([...data1, ...data2])
                    setMarkedDate(dates)
                    // setIsUpdate({
                    //   ...isUpdate,
                    //   updateCalendar: false
                    // })
                  }
                }).catch((e) => {
                  console.log(e, 'error get event')
                })
                
                setIsUpdate({
                  ...isUpdate,
                  updateCalendar: false
                })
              }
              setIsLoading(false)
            }).catch((e) => {
              console.log(e, 'error get event')
            })
        })

      }
    })

  }

  const CustomArrow = (direction) => {
    return (
      <View style={{ backgroundColor: '#FFB700', padding: 0, borderRadius: 100 }}>
        <Icon size={30} name={`chevron-${direction}`} color='white' style={{ alignSelf: 'center' }} />
      </View>
    )
  }

  const goToCreateEvent = () => {
    navigation.navigate('CreateEvent', {dataRumah: dataRumah, tanggalDipilih: date})
  }

  const formatHarga = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(price)
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
          <View style={{flexDirection: 'row', alignItems: 'center' }} >
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 32, color: 'black'}} >Kalender</Text>
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Tanggal pembayaran & agenda rumah kost</Text>
            </View>
          </View>
          { role == 'Penghuni' ?
              <Image source={image == '' ? require('../assets/image/Large.png') : { uri: image }} style={{ height: 50, width: 50, borderRadius: 100}} />
            :
              <Image source={image == '' ? require('../assets/image/RumahKost_Default.png') : { uri: image }} style={{ height: 50, width: 50, borderRadius: 100}} />
          }
        </View>
        { isLoading ?
            <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', margin: 150 }} />
          :  
            <Calendar
              style={{ width: Dimensions.get('window').width*0.9, marginVertical: 10 }}
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
              initialDate={date}
              enableSwipeMonths
              onDayPress={day => {
                setDate(day.dateString)
              }}
              renderArrow={(direction) => CustomArrow(direction)}
              markedDates={{
                ...markedDate,
                [date]: { selected: true, disableTouchEvent: true, selectedColor: '#FFB700',  marked:markedDate.hasOwnProperty(date) ? true : false },
              }}
            />
        }
        <View style={{ backgroundColor: '#FFB700', width: Dimensions.get('window').width, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 100, flex: 1 }} >
          <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 24, color: 'white'}} >Kalender rumah kost</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }} >
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 18, color: 'white'}} >{date == '' ? '' : moment(date, 'YYYY-M-D').format('dddd, D MMMM YYYY')}</Text>
            <TouchableOpacity style={{ backgroundColor: '#FF7A00', borderRadius: 100, padding: 5 }} onPress={() => goToCreateEvent()} >
              <Icon size={30} name='plus' color='white' style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          </View>
          { isLoading ? 
              <ActivityIndicator color={'#FFB700'} size={100} style={{ alignSelf: 'center', marginVertical: 50 }} />
            :
              <FlatList
                data={filterData}
                renderItem={({item, index}) => {
                  if (item.hasOwnProperty('Event_ID')) {
                    return (
                      <View style={{ flexDirection: 'row', padding: 15, width: '100%', backgroundColor: 'white', borderRadius: 10, marginVertical: 5, alignItems: 'center', justifyContent: 'space-between' }} key={index} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }} >
                          <View style={{ backgroundColor: '#FFB700', padding: 5, borderRadius: 10, paddingHorizontal: 20, width: 80, alignItems: 'center' }} >
                            <Icon size={25} name='home-city-outline' color='white' style={{ alignSelf: 'center', paddingHorizontal: 4 }} />
                            {/* <Text style={{ color: 'white', fontFamily: 'UbuntuTitling-Bold', fontSize: 18 }} >{item.Kamar_Nomor}</Text> */}
                          </View>
                          <View style={{ marginHorizontal: 5, flex: 1 }} >
                            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15 }} numberOfLines={2} >{item.Event_Nama}</Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }} >
                          <Icon size={15} name='clock-outline' color='black' style={{ paddingHorizontal: 4 }} />
                          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} >{item.Event_Jam}</Text>
                        </View>
                      </View>
                    )
                  } else if (item.hasOwnProperty('Kamar_Harga')) {
                    return (
                      <View style={{ flexDirection: 'row', padding: 15, width: '100%', backgroundColor: 'white', borderRadius: 10, marginVertical: 5, alignItems: 'center' }} key={index} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '65%' }} >
                          <View style={{ backgroundColor: '#FFB700', padding: 5, borderRadius: 10, paddingHorizontal: 20, width: 80, alignItems: 'center' }} >
                            <Text style={{ color: 'white', fontFamily: 'UbuntuTitling-Bold', fontSize: 21 }} >{item.Kamar_Nomor}</Text>
                          </View>
                          <View style={{ marginHorizontal: 5, flex: 1 }} >
                            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15 }} numberOfLines={2} >Pembayaran</Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                          <Icon size={15} name='cash-multiple' color='#339900' style={{ paddingHorizontal: 4 }} />
                          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: '#339900', fontSize: 13 }} >{formatHarga(item.Kamar_Harga)}</Text>
                        </View>
                      </View>
                    )
                  }
                }}
                scrollEnabled={false}
                style={{ width: '100%', marginVertical: 10 }}
              />
          }
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingBottom: 0
  },
  search: {
    height: 40,
    width: '80%',
    alignSelf:  'center',
    color: 'black'
  }
});

export default CalendarScreen;