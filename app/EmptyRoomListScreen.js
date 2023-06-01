import React, { useState }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TabView, TabBar } from 'react-native-tab-view';

const EmptyRoomListScreen = ({navigation}) => {
  const [search, setSearch] = useState('')


  const goBack = () => {
    navigation.goBack()
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
        <View style={{ backgroundColor: '#FFB700', padding: 10, borderRadius: 15, paddingHorizontal: 25}} >
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

  const FirstRoute = () => (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        style={{ width: '100%', marginVertical: 10 }}/>
    </View>
  );
  
  const SecondRoute = () => (
    <View>
      <Text>tes aja 2</Text>
    </View>
  );

  //react tab view
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Kosong' },
    { key: 'second', title: 'Tidak Bisa Digunakan' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ borderColor: '#FFB700', borderWidth: 1, borderRadius: 10 }}
      style={{ backgroundColor: 'white', elevation: 0, shadowOffset: { width: 0, height: 0 }, width: '100%', alignSelf: 'center' }}
      activeColor='#FFB700'
      inactiveColor='#FFDB80'
      pressColor='transparent'
      labelStyle={{ fontFamily: 'PlusJakartaSans-Bold', textTransform: 'none' }}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute />;
      case 'second':
        return <SecondRoute />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }} >
        <TouchableOpacity onPress={() => goBack()} >
          <Icon size={25} name='arrow-left' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >Daftar Kamar</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Kelompok Kamar</Text>
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
        <TouchableOpacity style={{ alignSelf: 'center', padding: 5 }} onPress={() => setSearch('')}>
          <Icon size={20} name='close' color='#ccc' style={{ alignSelf: 'center' }} />
        </TouchableOpacity>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={{ width: '100%' }}
        renderTabBar={renderTabBar}
      />
      {/* <FlatList
        data={data}
        renderItem={renderItem}
        style={{ width: '100%', marginVertical: 20 }}
      /> */}
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

export default EmptyRoomListScreen;