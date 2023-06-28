import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TabView, TabBar } from 'react-native-tab-view';
import axios from 'axios';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const BroadcastScreen = ({navigation, route}) => {
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const dataRumah = route.params.dataRumah
  const role = route.params.role
  const dataPenghuni = route.params.dataPenghuni

  useEffect(() => {
    // init()
    navigation.addListener('focus', () => {init()})
  }, [])

  const init = () => {
    setIsLoading(true)
    axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=broadcast&RumahID=${dataRumah.Rumah_ID}`)
      .then(({data}) => {
        if (data.error.msg == '' && data.data != null) {
          let data1 = []
          let data2 = []

          data.data.forEach((item) => {
            const now = moment()
            const broadcastDate = moment(item.Tanggal_Format, 'YYYY MM DD')
            const range = moment.range(broadcastDate, now)
            if (range.diff('day') <= 7) {
              data1.push(item)
            } else {
              data2.push(item)
            }
          })

          setData1(data1.reverse())
          setData2(data2)
          // setRefreshing(false)
        }
        setIsLoading(false)
      }).catch((e) => {
        console.log(e, 'error dashboard')
      })
  }

  const goBack = () => {
    navigation.goBack()
  }

  const goToCreateBroadcast = () => {
    // Code to handle login
    navigation.navigate('CreateBroadcast', {dataRumah: dataRumah})
  }

  const goToBroadcastDetail = (item) => {
    // Code to handle login
    navigation.navigate('BroadcastDetail', {dataRumah: dataRumah, broadcast: item})
  }

  const RoomItem = ({item}) => {
    return (
      <View style={{ flexDirection: 'column', padding: 15, backgroundColor: 'white', elevation: 5, marginVertical: 10, width: '90%', borderRadius: 15, alignItems: 'center' }} >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%' }} >
          <View style={{ backgroundColor: '#EFF1F3', padding: 10, borderRadius: 100 }} >
            <Icon size={25} name='message-text-outline' color='#FFB700' style={{  }} />
          </View>
          <View style={{ marginHorizontal: 5, width: '70%' }} >
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15 }} >Pesan terkirim</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} >{item.Tanggal_Buat} - {item.Jam_Buat}</Text>
          </View>
        </View>
        <View style={{ alignSelf: 'flex-start' }} >
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 20 }} >{item.Judul_Broadcast}</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 15 }} >{item.Pesan_Broadcast}</Text>
        </View>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '45%', borderRadius: 7, marginTop: 20 }} onPress={() => goToBroadcastDetail(item)}>
          <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Lihat Pesan</Text>
        </TouchableOpacity>
      </View>
      
    )
  }

  const renderItem = ({item}) => {

    return (
      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center'  }} >
        <RoomItem
          item={item}
        />
      </View>
    )
  }


  const FirstRoute = () => { 
    return (
      isLoading ? 
        <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
      :
        <View>
          <FlatList
            data={data1}
            renderItem={renderItem}
            style={{ width: '100%', marginVertical: 10 }}
            ListEmptyComponent={<Image source={require('../assets/image/EmptyStateImg_General.png')} style={{ alignSelf: 'center', width: 150, height: 150, marginTop: 50 }} />}
            />
            
        </View>
    )
  };
  
  const SecondRoute = () => { 
    return (
      isLoading ? 
        <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
      :
        <View>
          <FlatList
            data={data2}
            renderItem={renderItem}
            style={{ width: '100%', marginVertical: 10 }}
            ListEmptyComponent={<Image source={require('../assets/image/EmptyStateImg_General.png')} style={{ alignSelf: 'center', width: 150, height: 150, marginTop: 50 }} />}
            />
            
        </View>
    )
  };

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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
        <View style={{flexDirection: 'row', alignItems: 'center' }} >
          <TouchableOpacity onPress={() => goBack()} >
            <Icon size={25} name='arrow-left' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >Broadcast</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Kirim pesan broadcast untuk penghuni</Text>
          </View>
        </View>
        { role == 'Penghuni' ?
            <Image source={dataPenghuni.Penghuni_Image == '' ? require('../assets/image/Large.png') : { uri: dataPenghuni.Penghuni_Image }} style={{ height: 50, width: 50, borderRadius: 100}} />
          :
            <Image source={dataRumah.Rumah_Image == '' ? require('../assets/image/RumahKost_Default.png') : { uri: dataRumah.Rumah_Image }} style={{ height: 50, width: 50, borderRadius: 100}} />
        }
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
      />
      { role == 'Penghuni' ?
          null
        :
          <TouchableOpacity style={{ backgroundColor: '#FF7A00', borderRadius: 100, padding: 10, position: 'absolute', right: 20, bottom: 40 }} onPress={() => goToCreateBroadcast()} >
            <Icon size={35} name='plus' color='white' style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
      }
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