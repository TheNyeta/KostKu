import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Collapsible from 'react-native-collapsible';
import Modal from 'react-native-modal';

const LaporanDetailScreen = ({navigation}) => {
  const [nama, setNama] = useState('')
  const [perihal, setPerihal] = useState('')
  const [nohp, setNoHp] = useState('')
  const [pekerjaan, setPekerjaan] = useState('')
  const [tanggal, setTanggal] = useState('')
  const [jam, setJam] = useState('')
  const [detail, setDetail] = useState('')
  const [collapDetail, setCollapDetail] = useState(true)
  const [collapFoto, setCollapFoto] = useState(true)
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)

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
            <Text style={{ color: 'white', fontSize: 24, fontFamily: 'PlusJakartaSans-SemiBold' }} >Data Laporan</Text>
          </View>
        </View>
        <Image source={require('../assets/image/Large.png')} style={{ margin: 10 , borderRadius: 100}} />
        <View style={{ backgroundColor: '#FFDB80', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10 }} >
          <Text style={{ color: 'white', fontSize: 20, fontFamily: 'UbuntuTitling-Bold' }} >101</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%' }} >
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', marginVertical: 10 }} >Laporan</Text>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Pelapor</Text>
          <View style={styles.form}>
            <Icon size={18} name='human-greeting' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Nama'
              placeholderTextColor='#ccc'
              onChangeText={setNama}
              value={nama}
              editable={false}
            />
          </View>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >No.HP</Text>
          <View style={styles.form}>
            <Icon size={18} name='playlist-edit' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Perihal'
              placeholderTextColor='#ccc'
              onChangeText={setPerihal}
              value={perihal}
              editable={false}
            />
          </View>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >No.HP</Text>
          <View style={styles.form}>
            <Icon size={18} name='cellphone' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='No.HP'
              placeholderTextColor='#ccc'
              onChangeText={setNoHp}
              value={nohp}
              editable={false}
            />
          </View>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Pekerjaan</Text>
          <View style={styles.form}>
            <Icon size={18} name='briefcase-outline' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Pekerjaan'
              placeholderTextColor='#ccc'
              onChangeText={setPekerjaan}
              value={pekerjaan}
              editable={false}
            />
          </View>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Jam laporan</Text>
          <View style={styles.form}>
            <Icon size={18} name='calendar-blank-outline' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Email'
              placeholderTextColor='#ccc'
              onChangeText={setTanggal}
              value={tanggal}
              editable={false}
            />
          </View>
          <Text style={{ alignSelf: 'flex-start', color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Tanggal laporan</Text>
          <View style={styles.form}>
            <Icon size={18} name='clock-outline' color='black' style={{ alignSelf: 'center' }} />
            <TextInput
              style={styles.input}
              placeholder='Tanggal'
              placeholderTextColor='#ccc'
              onChangeText={setJam}
              value={jam}
              editable={false}
            />
          </View>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginVertical: 5 }} onPress={() => {setCollapDetail(!collapDetail)}} >
            <View style={{ flexDirection: 'row' }} >
              <Icon size={25} name='playlist-edit' color='black' style={{ alignSelf: 'center', marginRight: 5 }} />
              <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Detail laporan</Text>
            </View>
            <Icon size={18} name={collapDetail ? 'chevron-down' : 'chevron-up' } color='black' style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
          <Collapsible collapsed={collapDetail} >
            <View style={{ width: Dimensions.get('window').width*0.9, marginTop: 5, borderWidth: 1, borderColor: 'black', borderRadius: 5, marginBottom: 20 }}>
              <TextInput
                style={{ width: '100%', color: 'black', fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, height: 200, textAlignVertical: 'top', padding: 5 }}
                placeholder='Isi pesan'
                placeholderTextColor='#ccc'
                onChangeText={setDetail}
                value={detail}
                multiline
                maxLength={500}
                editable={false}
              />
            </View>
          </Collapsible>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginVertical: 5 }} onPress={() => {setCollapFoto(!collapFoto)}} >
            <View style={{ flexDirection: 'row' }} >
              <Icon size={25} name='image-outline' color='black' style={{ alignSelf: 'center', marginRight: 5 }} />
              <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Foto laporan</Text>
            </View>
            <Icon size={18} name={collapFoto ? 'chevron-down' : 'chevron-up' } color='black' style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
          <Collapsible collapsed={collapFoto} >
            <Text>test aja</Text>
          </Collapsible>
        </View>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, width: '50%', borderRadius: 7, marginTop: 20 }} onPress={() => setModal(true)} >
          <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Terima Laporan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, width: '50%', borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginBottom: 20, marginTop: 10 }} onPress={() => setModal2(true)} >
          <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Tolak Laporan</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Terima laporan</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Apakah Anda yakin untuk tandai terima laporan ini?</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => {}}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Ya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginTop: 10, width: 150 }} onPress={() => {setModal(false)}}>
            <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Kembali</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={modal2}
        onBackdropPress={() => setModal2(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Tolak laporan</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Apakah Anda yakin untuk tolak laporan ini? Penghuni perlu membuat laporan baru setelahnya</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => {}}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Ya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginTop: 10, width: 150 }} onPress={() => {setModal2(false)}}>
            <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Kembali</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  },
});


export default LaporanDetailScreen;