import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import moment from 'moment';
import 'moment/locale/id'
import axios from 'axios';

const PenjagaKostScreen = ({navigation, route}) => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [dataKost, setDataKost] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [penjaga, setPenjaga] = useState({})

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    AsyncStorage.getItem('@kost_data')
    .then((data) => {
      const value = JSON.parse(data)
      setDataKost(value)
      getDataPenjaga(value.Rumah_ID)
    })
  }

  const getDataPenjaga = (rumahId) => {
    setIsLoading(true)
    axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=penjaga&RumahID=${rumahId}`)
      .then(({data}) => {
        if (data.error.msg == '' && data.data != null) {
          setData(data.data)
        }
        setIsLoading(false)
      }).catch((e) => {
        console.log(e, 'error get penjaga')
      })
  }

  const deletePenjaga = () => {
    axios.put(`https://api-kostku.pharmalink.id/skripsi/kostku?update=akses&PenjagaID=${penjaga.Penjaga_ID}`)
      .then(({data}) => {
        if (data.error.msg == '') {
          setModal(false)
          getDataPenjaga()
        }
      }).catch((e) => {
        console.log(e, 'error delete penjaga')
      })
  }

  const goBack = () => {
    navigation.goBack()
  }

  const RoomItem = ({item}) => {
    return (
      <View style={{ flexDirection: 'row', paddingVertical: 8, width: '100%', alignItems: 'center', justifyContent: 'space-between' }} >
        <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }} >
        <Icon size={20} name='account-multiple-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 4 }} />
          <View style={{ marginHorizontal: 5, width: '75%' }} >
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15 }} >{item.Penjaga_Name}</Text>
            <View style={{flexDirection: 'row' }} >
              <Icon size={15} name='cellphone' color='black' style={{ alignSelf: 'center', paddingRight: 4 }} />
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} >{item.Penjaga_Number}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => {setPenjaga(item); setModal(true)}}>
          <Icon size={30} name='minus-circle-outline' color='black' style={{ paddingHorizontal: 4 }} />
        </TouchableOpacity>
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
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 32, color: 'black'}} >Akun penjaga</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Atur akun penjaga rumah kost</Text>
          </View>
        </View>
        <Image source={dataKost.Rumah_Image == '' ? require('../assets/image/RumahKost_Default.png') : { uri: dataKost.Rumah_Image }} style={{ height: 50, width: 50, borderRadius: 100}} />
      </View>
      { isLoading ?
          <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
        :
          <FlatList
            data={data}
            renderItem={renderItem}
            style={{ width: '100%' }}
            ListEmptyComponent={<Image source={require('../assets/image/EmptyStateImg_General.png')} style={{ alignSelf: 'center', width: 150, height: 150, marginTop: 50 }} />}
          />
      }
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Hapus akses penjaga kost?</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Anda akan menghapus akun ini dari penjaga rumah kost. Apakah Anda yakin?</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => deletePenjaga()}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Ya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginTop: 10, width: 150 }} onPress={() => {setModal(false)}}>
            <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Tidak</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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

export default PenjagaKostScreen;