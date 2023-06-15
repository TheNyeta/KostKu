import React, { useState }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TabView, TabBar } from 'react-native-tab-view';

const BroadcastScreen = ({navigation}) => {

  const goBack = () => {
    navigation.goBack()
  }

  const goToCreateBroadcast = () => {
    // Code to handle login
    navigation.navigate('CreateBroadcast')
  }

  const goToBroadcastDetail = () => {
    // Code to handle login
    navigation.navigate('BroadcastDetail')
  }

  const data = [
    {
      num: '101',
      name: 'Pesan terkirim',
      date: 'Sabtu 3 December 2022 - 17:00',
      price: 'Rp 12.000.000',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    },
    {
      num: '101',
      name: 'Pesan terkirim',
      date: 'Sabtu 3 December 2022 - 17:00',
      price: 'Rp 12.000.000',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    },
    {
      num: '101',
      name: 'Pesan terkirim',
      date: 'Sabtu 3 December 2022 - 17:00',
      price: 'Rp 12.000.000',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
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
      <View style={{ flexDirection: 'column', padding: 15, backgroundColor: 'white', elevation: 5, marginVertical: 10, width: '90%', borderRadius: 15, alignItems: 'center' }} >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%' }} >
          <View style={{ backgroundColor: '#EFF1F3', padding: 10, borderRadius: 100 }} >
            <Icon size={25} name='message-text-outline' color='#FFB700' style={{  }} />
          </View>
          <View style={{ marginHorizontal: 5, width: '70%' }} >
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15 }} >{room.name}</Text>
            <View style={{flexDirection: 'row' }} >
              <Icon size={15} name='calendar-blank-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 4 }} />
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} >{room.date}</Text>
            </View>
          </View>
        </View>
        <View style={{ alignSelf: 'flex-start' }} >
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 20 }} >{room.name}</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 15 }} >{room.text}</Text>
        </View>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '45%', borderRadius: 7, marginTop: 20 }} onPress={() => goToBroadcastDetail()}>
          <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Lihat Pesan</Text>
        </TouchableOpacity>
      </View>
      
    )
  }

  const renderItem = ({item}) => {

    return (
      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center'  }} >
        <RoomItem
          room={item}
        />
      </View>
    )
  }

  const FirstRoute = () => (
    <View style={{ }} >
      <FlatList
        data={data}
        renderItem={renderItem}
        style={{ width: '100%', marginVertical: 10 }}
        onEndReachedThreshold={0.1}
      />
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
    { key: 'first', title: '7 Hari terahkir ' },
    { key: 'second', title: 'Riwayat' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ borderColor: '#FFB700', borderWidth: 1, borderRadius: 10 }}
      style={{ backgroundColor: 'white', elevation: 0, shadowOffset: { width: 0, height: 0 }, width: '90%', alignSelf: 'center' }}
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
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >Broadcast</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Kirim pesan broadcast untuk penghuni</Text>
        </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
      />
      <TouchableOpacity style={{ backgroundColor: '#FF7A00', borderRadius: 100, padding: 10, position: 'absolute', right: 20, bottom: 40 }} onPress={() => goToCreateBroadcast()} >
        <Icon size={35} name='plus' color='white' style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
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
  }
});

export default BroadcastScreen;