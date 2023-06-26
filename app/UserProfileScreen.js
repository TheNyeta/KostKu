import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfileScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [image, setImage] = useState('')
  const [nama, setNama] = useState('')
  const [nohp, setNoHp] = useState('')
  const [email, setEmail] = useState('')
  const [dataUser, setDataUser] = useState({})
  const role = route.params.role

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    AsyncStorage.getItem('@user_data')
    .then((data) => {
      console.log(data)
      const value = JSON.parse(data)
      setIsLoading(false)
      setDataUser(value)
      setImage(role == 'Pengelola' ? value.Pengelola_Image : role == 'Penghuni' ? value.Penghuni_Image : value.Penjaga_Image)
      setNama(role == 'Pengelola' ? value.Pengelola_Name : role == 'Penghuni' ? value.Penghuni_Name : value.Penjaga_Name)
      setNoHp(role == 'Pengelola' ? value.Pengelola_Number : role == 'Penghuni' ? value.Penghuni_Number : value.Penjaga_Number)
      setEmail(role == 'Pengelola' ? value.Pengelola_Email : role == 'Penghuni' ? value.Penghuni_Email : value.Penjaga_Email)
    })
  }

  const goBack = () => {
    navigation.goBack()
  }

  const goToUserProfileEdit = () => {
    navigation.navigate('UserProfileEdit', {dataUser: dataUser, role: role})
  }

  return (
      <View style={styles.container} >
        <View style={{ height: 'auto', width: '100%', backgroundColor: '#FFB700', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', paddingBottom: 10 }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 , width: '100%'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => goBack()}>
                <Icon size={22} name='arrow-left' color='white' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
              </TouchableOpacity>
              <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >Profil</Text>
            </View>
          </View>
          { isLoading ?
              <ActivityIndicator color={'white'} size={50} style={{ alignSelf: 'center' }} />
            :
              <Image source={image == '' ? require('../assets/image/Large.png') : { uri: image }} style={{ width: 100, height: 100, margin: 10 , borderRadius: 100}} />
          }
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Informasi Akun</Text>
          { isLoading ? 
              <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center' }} />
            :
              <>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Nama</Text>
                <View style={styles.form}>
                  <Icon size={18} name='pencil' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='Nama'
                    placeholderTextColor='#ccc'
                    onChangeText={setNama}
                    value={nama}
                    editable={false}
                  />
                </View>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >No. Telepon</Text>
                <View style={styles.form}>
                  <Icon size={18} name='cellphone' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='No. Telepon'
                    placeholderTextColor='#ccc'
                    onChangeText={setNoHp}
                    value={nohp}
                    editable={false}
                  />
                </View>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Email</Text>
                <View style={styles.form}>
                  <Icon size={18} name='email-outline' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='Email'
                    placeholderTextColor='#ccc'
                    onChangeText={setEmail}
                    value={email}
                    editable={false}
                  />
                </View>
              </>
          }
        </View>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '35%', borderRadius: 7, marginTop: 20 }} onPress={() => goToUserProfileEdit()} >
          <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Edit</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    // justifyContent: 'center'
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
    width: '100%',
    height: 40,
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    flexDirection: 'row'
  },
});


export default UserProfileScreen;