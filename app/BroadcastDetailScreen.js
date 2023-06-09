import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';

const BroadcastDetailScreen = ({navigation}) => {
  const [judul, setJudul] = useState('');
  const [pesan, setPesan] = useState('');

  const goBack = () => {
    navigation.goBack()
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
              <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >Broadcast Terkirim</Text>
            </View>
          </View>
          <Image source={require('../assets/image/Large.png')} style={{ margin: 10 , borderRadius: 100}} />
          <View style={{ backgroundColor: '#FFDB80', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} >
            <Text style={{ color: 'white', fontSize: 20, fontFamily: 'UbuntuTitling-Bold' }} >nama kost</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Pesan Broadcast</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 6 }} >
            <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Pengirim</Text>
            <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular' }} >Penjaga</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 6 }} >
            <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Tanggal kirim</Text>
            <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular' }} >Sabtu 8 December 2021</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 6 }} >
            <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Waktu kirim</Text>
            <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular' }} >15:02</Text>
          </View>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Judul broadcast</Text>
          <View style={styles.form}>
            <Icon size={18} name='pencil' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Judul broadcast'
              placeholderTextColor='#ccc'
              onChangeText={setJudul}
              value={judul}
              editable={false}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%', marginVertical: 10 }} >
            <Icon size={25} name='playlist-edit' color='black' style={{ alignSelf: 'center', marginRight: 5 }} />
            <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold', textAlignVertical: 'top' }} >Isi pesan</Text>
          </View>
          <View style={{ width: '100%', marginTop: 5, borderWidth: 1, borderColor: 'black', borderRadius: 5, marginBottom: 20 }}>
            <TextInput
              style={{ width: '100%', color: 'black', fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, height: 200, textAlignVertical: 'top', padding: 5 }}
              placeholder='Isi pesan'
              placeholderTextColor='#ccc'
              onChangeText={setPesan}
              value={pesan}
              multiline
              maxLength={500}
              editable={false}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
  }
});


export default BroadcastDetailScreen;