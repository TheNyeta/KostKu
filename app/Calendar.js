import React, { useState }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions, Image } from 'react-native';
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
      'October',
      'November',
      'December'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    dayNamesShort: ['MIN', 'SEN', 'SEL', 'RAB.', 'KAM', 'JUM', 'SAB']
  };
  
  LocaleConfig.defaultLocale = 'id';

  const data = [
    {
      num: '101',
      name: 'test a',
      date: 'Sabtu 5 Desemqweber 2022 - 12:12',
      price: 'Rp 12.000.000',
      text: 'asdasd asd sa as as asasrrwer wrwer wewe rrrr rrr',
      rating: '4'
    },
    {
      num: '102',
      name: 'test b',
      date: '22 Desemeber',
      price: 'Rp 1.000.000',
      text: 'asdas wqeq  d asd sa adasa ae wes as asas rrwer wrwera sda asd wewe rrrrrrr',
      rating: '2'
    },
    {
      num: '103',
      name: 'test c',
      date: '31 Desemasdber',
      price: 'Rp 11.000.000',
      text: 'asdasd asd sa as as asasrrwer wrwer wewe rrrr rrr',
      rating: '5'
    }
  ]

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
        <View style={{flexDirection: 'row', alignItems: 'center' }} >
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 32, color: 'black'}} >Kalendar</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Tanggal pembayaran & agenda rumah kost</Text>
          </View>
        </View>
        <Image source={require('../assets/image/Large.png')} style={{ borderRadius: 50, width: 50, height: 50 }} />
      </View>
      <Calendar
        style={{ width: Dimensions.get('window').width*0.9 }}
        theme={{
          // textSectionTitleColor: '#FFB700',
          monthTextColor: '#FFB700',
          textMonthFontFamily: 'PlusJakartaSans-Bold',
          dotColor: '#FFB700',
          indicatorColor: '#FFB700',
        }}
        firstDay={1}
        enableSwipeMonths
        onDayPress={day => {
          setDate(day.dateString)
        }}
        markedDates={{
          '2023-06-17': { marked: true },
          '2023-06-18': { marked: true, dotColor: 'red' },
          [date]: { selected: true, disableTouchEvent: true, selectedColor: '#FFB700',  marked: true },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  search: {
    height: 40,
    width: '80%',
    alignSelf:  'center',
    color: 'black'
  }
});

export default CalendarScreen;