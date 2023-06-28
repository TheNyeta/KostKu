import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';
import axios from 'axios';

const PeraturanDetailScreen = ({navigation, route}) => {
  const [modal, setModal] = useState(false)
  const [peraturan, setPeraturan] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const dataRumah = route.params.dataRumah
  const role = route.params.role

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=peraturan&RumahID=${dataRumah.Rumah_ID}`)
    .then(({data}) => {
      if (data.error.msg == '') {

        setPeraturan(data.data)
      }
      setIsLoading(false)
    }).catch((e) => {
      console.log(e, 'error post kelompok kamar')
    })
  }

  const goBack = () => {
    navigation.goBack()
  }

  const goToPeraturanDetailEdit = () => {
    navigation.navigate('PeraturanDetailEdit', {dataRumah: dataRumah, aturan: peraturan})
  }

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container} >
        <View style={{ height: 'auto', width: '100%', backgroundColor: '#FFB700', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', paddingBottom: 10 }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 , width: '100%'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => goBack()}>
                <Icon size={22} name='arrow-left' color='white' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
              </TouchableOpacity>
              <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >Peraturan Rumah Kost</Text>
            </View>
          </View>
          <Image source={dataRumah.Rumah_Image == '' ? require('../assets/image/RumahKost_Default.png') : { uri: dataRumah.Rumah_Image }} style={{ margin: 10 , borderRadius: 100, width: 100, height: 100}} />
          <View style={{ backgroundColor: '#FF7A00', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} >
            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'UbuntuTitling-Bold' }} >{dataRumah.Nama_Rumah}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Peraturan rumah kost</Text>
          { isLoading ?
              <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
            :
              <>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%', marginBottom: 10 }} >
                  <Icon size={25} name='playlist-edit' color='black' style={{ alignSelf: 'center', marginRight: 5 }} />
                  <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Peraturan</Text>
                </View>
                <View style={{ width: Dimensions.get('window').width*0.9, minHeight: 300, marginTop: 5, borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
                  <TextInput
                    style={{ width: '100%', color: 'black', fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, minHeight: 300, textAlignVertical: 'top', padding: 10 }}
                    placeholder='Isi pesan'
                    placeholderTextColor='#ccc'
                    onChangeText={setPeraturan}
                    value={peraturan.Text}
                    multiline
                    editable={false}
                    // maxLength={255}
                  />
                </View>
              </>
          }
        </View>
        { role == 'Penghuni' ?
            null
          :
            <>
              <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '35%', borderRadius: 7, marginTop: 20 }} onPress={() => goToPeraturanDetailEdit()}>
                <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Edit</Text>
              </TouchableOpacity>
            </>
        }
      </View>
    </KeyboardAwareScrollView>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingBottom: 20
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


export default PeraturanDetailScreen;