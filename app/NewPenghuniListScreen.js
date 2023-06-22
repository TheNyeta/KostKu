import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios';

const NewPenghuniListScreen = ({navigation, route}) => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const dataRumah = route.params.dataRumah
  const kostImage = dataRumah.Rumah_Image

  useEffect(() => {
    // init()
    navigation.addListener('focus', () => {init()})
  }, [])

  const init = () => {
    setIsLoading(true)
    console.log('check aja')
    axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=order&RumahID=${dataRumah.Rumah_ID}`)
      .then(({data}) => {
        if (data.error.msg == '' && data.data != null) {

          setData(data.data)
          // setRefreshing(false)
        }
        setIsLoading(false)
      }).catch((e) => {
        console.log(e, 'error get laporan')
      })
  }

  const goBack = () => {
    navigation.goBack()
  }

  const goToNewPenghuniDetail = (item) => {
    navigation.navigate('NewPenghuniDetail', {data: item, dataRumah: dataRumah})
  }

  const RoomItem = ({item}) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'center' }} onPress={() => goToNewPenghuniDetail(item)}>
        <View style={{ backgroundColor: '#FFB700', padding: 8, borderRadius: 10, width: 75, alignItems: 'center'}} >
          <Icon size={25} name='home-city-outline' color='white' style={{ alignSelf: 'center', paddingHorizontal: 4 }} />
        </View>
        <View style={{ marginHorizontal: 10, width: '100%' }} >
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15 }} numberOfLines={1} >{item.DataPenghuni.Penghuni_Name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
        <View style={{flexDirection: 'row', alignItems: 'center' }} >
          <TouchableOpacity onPress={() => goBack()}>
            <Icon size={25} name='arrow-left' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 32, color: 'black'}} >Penghuni baru</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Klik nomor untuk melihat detail</Text>
          </View>
        </View>
        <Image source={kostImage == '' ? require('../assets/image/RumahKost_Default.png') : { uri: kostImage }} style={{ height: 50, width: 50, borderRadius: 100}} />
      </View>
      <View style={{ flexDirection: 'row', backgroundColor: '#E8EAED', width: '100%', marginTop: 20, borderRadius: 100 }} >
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
      { isLoading ? 
          <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
        :
          <FlatList
            data={data}
            renderItem={({item}) => <RoomItem item={item}/>}
            style={{ width: '100%', marginVertical: 10 }}
            ListEmptyComponent={<Image source={require('../assets/image/EmptyStateImg_General.png')} style={{ alignSelf: 'center', width: 150, height: 150, marginTop: 50 }} />}
          />
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
  },
  search: {
    height: 40,
    width: '80%',
    alignSelf:  'center',
    color: 'black'
  }
});

export default NewPenghuniListScreen;