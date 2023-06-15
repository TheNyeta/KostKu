import React, { useState }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Calendar, LocaleConfig } from 'react-native-calendars';

const CalendarScreen = ({navigation}) => {
  const [search, setSearch] = useState('')
  const [date, setDate] = useState('')

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
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    dayNamesShort: ['MIN', 'SEN', 'SEL', 'RAB.', 'KAM', 'JUM', 'SAB']
  };
  
  LocaleConfig.defaultLocale = 'id';

  const roomdata = [
    {
      Kamar_Nomor: '101',
      name: 'test aasd jjj i hsksksshh kshjk timoth hsi is h hklsiss jsj',
      date: 'Sabtu 5 Desemqweber 2022 - 12:12',
      Kamar_Harga: 'Rp 12.000.000',
      text: 'asdasd asd sa as as asasrrwer wrwer wewe rrrr rrr',
      rating: '4'
    },
    {
      Kamar_Nomor: '102',
      name: 'test b',
      date: '22 Desemeber',
      Kamar_Harga: 'Rp 1.000.000',
      text: 'asdas wqeq  d asd sa adasa ae wes as asas rrwer wrwera sda asd wewe rrrrrrr',
      rating: '2'
    },
    {
      Kamar_Nomor: '103',
      name: 'test c',
      date: '31 Desemasdber',
      Kamar_Harga: 'Rp 11.000.000',
      text: 'asdasd asd sa as as asasrrwer wrwer wewe rrrr rrr',
      rating: '5'
    }
  ]

  const CustomArrow = (direction) => {
    return (
      <View style={{ backgroundColor: '#FFB700', padding: 0, borderRadius: 100 }}>
        <Icon size={30} name={`chevron-${direction}`} color='white' style={{ alignSelf: 'center' }} />
      </View>
    )
  }

  const goToCreateEvent = () => {
    navigation.navigate('CreateEvent')
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
          <Image source={require('../assets/image/Large.png')} style={{ borderRadius: 50, width: 50, height: 50 }} />
        </View>
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
          enableSwipeMonths
          onDayPress={day => {
            setDate(day.dateString)
          }}
          renderArrow={(direction) => CustomArrow(direction)}
          markedDates={{
            '2023-06-17': { marked: true },
            '2023-06-18': { marked: true, dotColor: 'red' },
            [date]: { selected: true, disableTouchEvent: true, selectedColor: '#FFB700',  marked: true },
          }}
        />
        <View style={{ backgroundColor: '#FFB700', width: Dimensions.get('window').width, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 100 }} >
          <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 24, color: 'white'}} >Kalender rumah kost</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }} >
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 18, color: 'white'}} >22 Sept 2023</Text>
            <TouchableOpacity style={{ backgroundColor: '#FF7A00', borderRadius: 100, padding: 5 }} onPress={() => goToCreateEvent()} >
              <Icon size={30} name='plus' color='white' style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          </View>
          {roomdata.map((event, index) => {
            return (
              <View style={{ flexDirection: 'row', padding: 15, width: '100%', backgroundColor: 'white', borderRadius: 10, marginVertical: 5, alignItems: 'center' }} key={index} >
                <View style={{ backgroundColor: '#FFB700', padding: 5, borderRadius: 10, paddingHorizontal: 20}} >
                  <Text style={{ color: 'white', fontFamily: 'UbuntuTitling-Bold', fontSize: 18 }} >{event.Kamar_Nomor}</Text>
                </View>
                <View style={{ marginHorizontal: 5, width: '42%' }} >
                  <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15 }} numberOfLines={2} >{event.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }} >
                  <Icon size={15} name='cash-multiple' color='black' style={{ paddingHorizontal: 4 }} />
                  <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} >{event.Kamar_Harga}</Text>
                </View>
              </View>
            )
          })}
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