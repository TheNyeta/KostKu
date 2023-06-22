import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Collapsible from 'react-native-collapsible';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateContext } from './GlobalState';
import { useIsFocused } from '@react-navigation/native';

const SettingPage = ({navigation}) => {
  const [image, setImage] = useState('')
  const [modal, setModal] = useState(false)
  const [isUpdate, setIsUpdate] = useContext(UpdateContext)
  const isFocused = useIsFocused()

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (isFocused) {
      if (isUpdate.updateSetting == true) {
        init()
      }
    }
  }, [isFocused])

  const init = () => {
    AsyncStorage.getItem('@user_data').then((data) => {
      const value = JSON.parse(data)
      setImage(value.Pengelola_Image)
      setIsUpdate({
        ...isUpdate,
        updateSetting: false
      })
    })
  }

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['@user_data', '@kost_data', '@user_role'])
      navigation.reset({
        index: 0,
        routes: [{name: 'RoleSelect'}],
      })
    } catch(e) {
      console.log(e, 'error logout')
    }
  
  }

  const goToUserProfile = () => {
    navigation.navigate('UserProfile')
  }

  const goToKostDetail = () => {
    navigation.navigate('Kost')
  }

  const goToPenjagaKost = () => {
    navigation.navigate('PenjagaKost')
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 20 }} >
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >Pengaturan</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Atur akun dan lainnya</Text>
        </View>
        <TouchableOpacity onPress={() => goToUserProfile()}>
          <Image source={image == '' ? require('../assets/image/Large.png') : { uri: image }} style={{ height: 50, width: 50, borderRadius: 100}} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 10 }} onPress={() => goToKostDetail()} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
          <Icon size={25} name='home-city-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 18, color: 'black' }} >Rumah kost</Text>
        </View>
        <Icon size={30} name='chevron-right' color='black' style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 10 }} onPress={() => goToPenjagaKost()} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
          <Icon size={25} name='account-multiple-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 18, color: 'black' }} >Akun penjaga</Text>
        </View>
        <Icon size={30} name='chevron-right' color='black' style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 10 }} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
          <Icon size={25} name='help-circle-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 18, color: 'black' }} >Bantuan</Text>
        </View>
        <Icon size={30} name='chevron-right' color='black' style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 10 }} onPress={() => setModal(true)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
          <Icon size={25} name='logout' color='black' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 18, color: 'black' }} >Keluar</Text>
        </View>
        <Icon size={30} name='chevron-right' color='black' style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Keluar dari akun?</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Anda akan keluar dan tidak dapat melihat data rumah kost. Apakah Anda yakin?</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => logout()}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Ya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginTop: 10, width: 150 }} onPress={() => {setModal(false)}}>
            <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Kembali</Text>
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
  }
});

export default SettingPage;