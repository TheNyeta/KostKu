import React, { useState }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const RoomListScreen = ({navigation}) => {
  const [search, setSearch] = useState('')

  const goBack = () => {
    navigation.goBack()
  }

  const goToCreateRoom = () => {
    navigation.navigate('CreateRoom')
  }

  const data = [
    {
      num: '101',
      name: 'test a',
      date: '5 Desemqweber',
      price: 'Rp 12.000.000'
    },
    {
      num: '102',
      name: 'test b',
      date: '22 Desemeber',
      price: 'Rp 1.000.000'
    },
    {
      num: '103',
      name: 'test c',
      date: '31 Desemasdber',
      price: 'Rp 11.000.000'
    }
  ]

  const RoomItem = ({room}) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 8 }} >
        <View style={{ backgroundColor: '#FFB700', padding: 10, borderRadius: 10, paddingHorizontal: 25}} >
          <Text style={{ color: 'white', fontFamily: 'UbuntuTitling-Bold', fontSize: 20 }} >{room.num}</Text>
        </View>
        <View style={{ marginHorizontal: 5, width: '42%' }} >
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15 }} >{room.name}</Text>
          <View style={{flexDirection: 'row' }} >
            <Icon size={15} name='calendar-blank-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 4 }} />
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} >{room.date}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }} >
          <Icon size={15} name='cash-multiple' color='black' style={{ paddingHorizontal: 4 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} >{room.price}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderItem = ({item}) => {

    return (
      <RoomItem
        room={item}
      />
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }} >
        <TouchableOpacity onPress={() => goBack()} >
          <Icon size={25} name='arrow-left' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >Daftar Kamar</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Reguler', fontSize: 15, color: 'black'}} >Kelompok Kamar</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', backgroundColor: '#E8EAED', width: '100%', marginVertical: 20, borderRadius: 100 }} >
        <View style={{ flexDirection: 'row' }} >
          <Icon size={25} name='magnify' color='black' style={{ alignSelf: 'center', paddingLeft: 15 }} />
          <TextInput
            style={styles.search}
            placeholder='Cari nama penghuni/nomor kamar'
            placeholderTextColor='#ccc'
            onChangeText={setSearch}
            value={search}
          />
        </View>
        <Icon size={20} name='close' color='#ccc' style={{ alignSelf: 'center' }} />
      </View>
      <View style={{ flexDirection: 'row', width: '100%', borderRadius: 100, justifyContent: 'space-between' }} >
        <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '48%', alignItems: 'center' }} >
          <View style={{ flexDirection: 'column' }} >
            <Text style={{ color: 'white', fontSize: 35, fontFamily: 'PlusJakartaSans-Bold' }}>4</Text>
            <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>Kamar</Text>
          </View>
          <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center' }} >
            <Icon size={25} name='door' color='#FFB700' style={{ alignSelf: 'center' }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '48%', alignItems: 'center' }} >
          <View style={{ flexDirection: 'column' }} >
            <Text style={{ color: 'white', fontSize: 35, fontFamily: 'PlusJakartaSans-Bold' }}>5</Text>
            <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>Penghuni</Text>
          </View>
          <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center' }} >
            <Icon size={25} name='account-multiple' color='#FFB700' style={{ alignSelf: 'center' }} />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        style={{ width: '100%', marginVertical: 20 }}
      />
      <TouchableOpacity style={{ backgroundColor: '#FF7A00', borderRadius: 100, padding: 10, position: 'absolute', right: 20, bottom: 40 }} onPress={() => goToCreateRoom()} >
        <Icon size={35} name='plus' color='white' style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  search: {
    height: 40,
    width: '80%',
    alignSelf:  'center',
    color: 'black'
  }
});

export default RoomListScreen;