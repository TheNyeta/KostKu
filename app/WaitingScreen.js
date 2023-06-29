import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Collapsible from 'react-native-collapsible';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const WaitingScreen = ({navigation}) => {
  const [image, setImage] = useState('')
  const [modal, setModal] = useState(false)
  const [orderID, setOrderId] = useState('')
  const [role, setRole] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('@user_role').then((data) => {
      setRole(data)
      AsyncStorage.getItem('@order_id').then((data) => {
        setOrderId(data)
        checkOrderStatus(data)
      })
    })
  }, [])

  const checkOrderStatus = (orderid) => {
    axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=order&OrderID=${orderid}`)
    .then(({data}) => {
      if (data.data != null) {
        console.log(data)
        if (data.data.Order_Status == 'Berhasil') {
          if (role == 'Penghuni') {
            let value = JSON.stringify(data.data.DataPenghuni)
            AsyncStorage.setItem('@penghuni_data', value).then(() => {
              AsyncStorage.removeItem('@order_id')
              navigation.replace('HomePenghuni')
            })
          } else {
            axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=rumah&PenjagaID=${data.data.DataPenjaga.Penjaga_ID}`)
              .then(({data}) => {
                console.log(data)
                if (data.error.msg == '') {
                  let jsonValue = JSON.stringify(data.data)
                  AsyncStorage.setItem('@kost_data', jsonValue).then(() => {
                    AsyncStorage.removeItem('@order_id')
                    navigation.replace('Home')
                  })
                }
              })
          }
        } else if (data.data.Order_Status == 'Tolak') {
          setModal(true)
        }
      }
      setIsLoading(false)
    }).catch((e) => {
      console.log(e, 'error check kost')
      setIsLoading(false)
    })
  }

  const ditolak = () => {
    AsyncStorage.removeItem('@order_id')
      .then(() => {
        navigation.replace('EnterCode')
      })
  }

  return (
    <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={isLoading} colors={['#FFB700']} onRefresh={() => {setIsLoading(true); checkOrderStatus()}} />} >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 20 }} >
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >Halo!</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Silahkan menunggu</Text>
        </View>
        <View>
          <Image source={require('../assets/image/Large.png')} style={{ height: 50, width: 50, borderRadius: 100}} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', backgroundColor: '#339900', width: '100%', padding: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 7 }}>
        <Icon size={20} name='information-outline' color='white' style={{ alignSelf: 'center', marginHorizontal: 5 }} />
        <Text style={{ fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'white', flex: 1 }} >Kamu sudah mengirim data untuk masuk ke rumah kost. Mohon tunggu untuk dikonfirmasi</Text>
      </View>
      <Image source={require('../assets/image/Waiting_MoveInConfirmationImg.png')} style={{ width: Dimensions.get('window').width*0.7 }} resizeMode='contain' />
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Permintaan masuk ditolak</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Permintaan masuk Anda telah ditolak. Mohon mengajukan permintaan masuk baru.</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => ditolak()}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Mengerti</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    padding: 10,
    alignSelf:  'center',
    color: 'black',
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16
  },
  form: {
    width: '85%',
    height: 40,
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    flexDirection: 'row'
  },
});

export default WaitingScreen;