import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment';
import 'moment/locale/id'

const JatuhTempoListScreen = ({navigation, route}) => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const dataRumah = route.params.dataRumah
  const kostImage = dataRumah.Rumah_Image
  const jatuhTempo = route.params.jatuhTempo

  const goBack = () => {
    navigation.goBack()
  }

  const RoomItem = ({item}) => {
    return (
      <View style={{ flexDirection: 'row', paddingVertical: 8 }} >
        <View style={{ backgroundColor: '#FFB700', padding: 10, borderRadius: 15, width: 80, alignItems: 'center' }} >
          <Text style={{ color: 'white', fontFamily: 'UbuntuTitling-Bold', fontSize: 20 }} >{item.Kamar_Nomor}</Text>
        </View>
        <View style={{ marginHorizontal: 5, width: '42%' }} >
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15 }} >{item.DataPenghuni.Penghuni_Name}</Text>
          <View style={{flexDirection: 'row' }} >
            <Icon size={15} name='calendar-blank-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 4 }} />
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} >{moment(item.Tanggal_Berakhir, 'YYYY MM DD').format('D MMMM')}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }} >
          <Icon size={15} name='clock-outline' color='black' style={{ paddingHorizontal: 4 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} >{moment().diff(moment(item.Tanggal_Berakhir, 'YYYY MM DD'), 'day')} hari</Text>
        </View>
      </View>
    )
  }

  const renderItem = ({item}) => {

    return (
      <RoomItem
        item={item}
      />
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => goBack()}>
            <Icon size={25} name='arrow-left' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 32, color: 'black'}} >Jatuh tempo</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Daftar kamar jatuh tempo</Text>
          </View>
        </View>
        <Image source={kostImage == '' ? require('../assets/image/RumahKost_Default.png') : { uri: kostImage }} style={{ height: 50, width: 50, borderRadius: 100}} />
      </View>
      <View style={{ flexDirection: 'column', marginVertical: 10 , alignSelf: 'flex-start' }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: 'black' }} >Kamar jatuh tempo</Text>
      </View>
      <FlatList
        data={jatuhTempo}
        renderItem={renderItem}
        style={{ width: '100%' }}
        ListEmptyComponent={<Image source={require('../assets/image/EmptyStateImg_General.png')} style={{ alignSelf: 'center', width: 150, height: 150, marginTop: 50 }} />}
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

export default JatuhTempoListScreen;