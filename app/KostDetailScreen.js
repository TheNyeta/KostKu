import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KostDetailScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [image, setImage] = useState('')
  const [nama, setNama] = useState('')
  const [kode, setKode] = useState('')
  const [kota, setKota] = useState('')
  const [alamat, setAlamat] = useState('')
  const [nohp1, setNoHp1] = useState('')
  const [nohp2, setNoHp2] = useState('')
  const [modal, setModal] = useState(false)
  const dataRumah = route.params.dataRumah

  useEffect(() => {
    init()
  }, [])

  const init = () => {
      setIsLoading(false)
      setImage(dataRumah.Rumah_Image)
      setNama(dataRumah.Nama_Rumah)
      setKode(dataRumah.Special_Code)
      setKota(dataRumah.Kota_Name)
      setAlamat(dataRumah.Lokasi_Rumah)
      setNoHp1(dataRumah.Nomor_Hp_Rumah1)
      setNoHp2(dataRumah.Nomor_Hp_Rumah2)

  }

  const goBack = () => {
    navigation.goBack()
  }

  const goToKostEdit = () => {
    navigation.navigate('KostEdit', {dataRumah: dataRumah})
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container} >
        <View style={{ height: 'auto', width: '100%', backgroundColor: '#FFB700', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', paddingBottom: 10 }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 , width: '100%'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => goBack()}>
                <Icon size={22} name='arrow-left' color='white' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
              </TouchableOpacity>
              <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >Data Rumah Kost</Text>
            </View>
          </View>
          <Image source={image == '' ? require('../assets/image/Large.png') : { uri: image }} style={{ width: 100, height: 100, margin: 10 , borderRadius: 100}} />
          <View style={{ backgroundColor: '#FF7A00', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} >
            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'UbuntuTitling-Bold' }} >{nama}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Data Rumah Kost</Text>
          { isLoading ? 
              <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center' }} />
            :
              <>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Nama rumah kost</Text>
                <View style={styles.form}>
                  <Icon size={18} name='home-city-outline' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='Nama'
                    placeholderTextColor='#ccc'
                    onChangeText={setNama}
                    value={nama}
                    editable={false}
                  />
                </View>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Kode rumah kost</Text>
                <View style={styles.form}>
                  <Icon size={18} name='pound' color='black' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
                  <TextInput
                    style={[styles.input, { borderLeftWidth: 1, borderColor: 'black', marginLeft: 5 }]}
                    placeholder="Kode kost"
                    placeholderTextColor='#ccc'
                    onChangeText={kode => setKode(kode.toUpperCase())}
                    value={kode}
                    autoCapitalize='characters'
                    maxLength={6}
                    editable={false}
                  />
                  <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }} onPress={() => {setModal(true)}} >
                    <Icon size={15} name='information-outline' color='black' style={{ alignSelf: 'center', marginLeft: 5, marginRight: 5 }} />
                  </TouchableOpacity>
                </View>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Kota</Text>
                <View style={styles.form}>
                  <Icon size={18} name='map-marker-outline' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='Nama'
                    placeholderTextColor='#ccc'
                    onChangeText={setKota}
                    value={kota}
                    editable={false}
                  />
                </View>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Alamat</Text>
                <View style={styles.form}>
                  <Icon size={18} name='directions' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='Alamat kost'
                    placeholderTextColor='#ccc'
                    onChangeText={setAlamat}
                    value={alamat}
                    editable={false}
                  />
                </View>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >No. pengelola kost</Text>
                <View style={styles.form}>
                  <Icon size={18} name='cellphone' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='No. Telepon'
                    placeholderTextColor='#ccc'
                    onChangeText={setNoHp1}
                    value={nohp1}
                    editable={false}
                  />
                </View>
                <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >No. penjaga kost</Text>
                <View style={styles.form}>
                  <Icon size={18} name='cellphone' color='black' style={{ alignSelf: 'center' }} />
                  <TextInput
                    style={styles.input}
                    placeholder='No. Telepon'
                    placeholderTextColor='#ccc'
                    onChangeText={setNoHp2}
                    value={nohp2}
                    editable={false}
                  />
                </View>
              </>
          }
        </View>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '35%', borderRadius: 7, marginVertical: 20 }} onPress={() => goToKostEdit()} >
          <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Edit</Text>
        </TouchableOpacity>
        <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
        >
          <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
            <Icon size={50} name='information-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
            <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Kode rumah kost</Text>
            <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center', marginBottom: 10 }} >Kode rumah kost dibutuhkan untuk penghuni/penjaga masuk rumah kost. Minimum 3 karakter & maksimal 6 karakter dan unik.</Text>
            <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Contoh: RMHKOS, MWK123</Text>
            <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => setModal(false)}>
              <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Mengerti</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
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


export default KostDetailScreen;