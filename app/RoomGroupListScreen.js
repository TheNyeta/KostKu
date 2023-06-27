import React, { useState, useEffect, useRef }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios';
import Modal from 'react-native-modal';

const RoomGroupListScreen = ({navigation, route}) => {
  const [search, setSearch] = useState('')
  const [dataKelompok, setDataKelompok] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [kelompok, setKelompok] = useState({})
  const dataRumah = route.params.dataRumah
  const kostImage = dataRumah.Rumah_Image

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    setIsLoading(true)
    axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=kamarKelompok&RumahID=${dataRumah.Rumah_ID}`)
      .then(({data}) => {
        if (data.error.msg == '') {
          setDataKelompok(data.data)
        }
        setIsLoading(false)
      }).catch((e) => {
        console.log(e, 'error get laporan')
      })
  }

  const RoomGroupItem = ({item}) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }} onPress={() => goToRoomList(item.KelompokKamar_Nama)} onLongPress={() => {setKelompok(item); setModal(true)}} delayLongPress={300}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon size={25} name='door' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 15, color: 'black'}} >{item.KelompokKamar_Nama}</Text>
        </View>
        <Icon size={30} name='chevron-right' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
      </TouchableOpacity>
    )
  }

  const renderItem = ({item}) => {
    if (search == '') {
      return <RoomGroupItem item={item}/>
    } 
    if (item.KelompokKamar_Nama.toLowerCase().includes(search.toLowerCase())) {
      return <RoomGroupItem item={item}/>
    }
  }

  const goBack = () => {
    navigation.goBack()
  }

  const goToRoomList = (namaKelompok) => {
    navigation.navigate('RoomList', {dataRumah: dataRumah, namaKelompok: namaKelompok})
  }

  const goToCreateRoomGroup = () => {
    navigation.navigate('CreateRoomGroup', {dataRumah: dataRumah, edit: false})
  }

  const goToEditRoomGroup = () => {
    navigation.navigate('CreateRoomGroup', {dataRumah: dataRumah, edit: true, kelompok: kelompok})
  }

  const deleteGroup = () => {
    axios.delete(`https://api-kostku.pharmalink.id/skripsi/kostku?delete=kelompokKamar&KelompokKamarID=${kelompok.KelompokKamar_ID}`)
      .then(({data}) => {
        if (data.error.msg == '') {
          setModal2(false)
          init()
        }
      }).catch((e) => {
        console.log(e, 'error delete kelompok')
      })
  }



  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => goBack()}>
            <Icon size={25} name='arrow-left' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >Daftar Kamar</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Pilih lantai/kelompok kamar kost</Text>
          </View>
        </View>
        <Image source={kostImage == '' ? require('../assets/image/RumahKost_Default.png') : { uri: kostImage }} style={{ height: 50, width: 50, borderRadius: 100}} />
      </View>
      <View style={{ flexDirection: 'row', backgroundColor: '#E8EAED', width: '100%', marginVertical: 20, borderRadius: 100 }} >
        <View style={{ flexDirection: 'row' }} >
          <Icon size={25} name='magnify' color='black' style={{ alignSelf: 'center', paddingLeft: 15 }} />
          <TextInput
            style={styles.search}
            placeholder='Cari nama kelompok kamar'
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
          dataKelompok == null ?
            <Image source={require('../assets/image/EmptyStateImg_General.png')} style={{ alignSelf: 'center', width: 150, height: 150, marginTop: 50 }} />
          :
            <>
              <FlatList
                data={dataKelompok}
                renderItem={renderItem}
                style={{ width: '100%' }}
              />
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'lightgray'}} >Tekan lama kelompok untuk edit atau hapus</Text>
            </>
      }
      <TouchableOpacity style={{ backgroundColor: '#FF7A00', borderRadius: 100, padding: 10, position: 'absolute', right: 20, bottom: 40 }} onPress={() => goToCreateRoomGroup()} >
        <Icon size={35} name='plus' color='white' style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
      <Modal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
        swipeDirection='down'
        onSwipeComplete={() => setModal(false)}
        style={{ justifyContent: 'flex-end', alignItems: 'center' }}
      >
        <View style={{ width: Dimensions.get('window').width, alignItems: 'center', backgroundColor: 'white', marginBottom: -25, padding: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
          <View style={{ backgroundColor: 'black', height: 5, width: '20%', marginVertical: 5, borderRadius: 10}}></View>
          <Text style={{ fontSize: 20, color: 'black', fontFamily: 'PlusJakartaSans-Bold', alignSelf: 'flex-start', marginLeft: 10 }} >{kelompok.KelompokKamar_Nama}</Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' , padding: 5, width: '100%' }} onPress={() => goToEditRoomGroup()}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <Icon size={20} name='pencil' color='black' style={{ alignSelf: 'center', marginHorizontal: 10 }} />
              <Text style={{ fontSize: 16, color: 'black', fontFamily: 'PlusJakartaSans-Regular' }} >Edit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' , padding: 5, marginVertical: 10, width: '100%' }} onPress={() => {setModal(false); setModal2(true)}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <Icon size={20} name='delete-outline' color='black' style={{ alignSelf: 'center', marginHorizontal: 10 }} />
              <Text style={{ fontSize: 16, color: 'black', fontFamily: 'PlusJakartaSans-Regular' }} >Hapus kelompok kamar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={modal2}
        onBackdropPress={() => setModal2(false)}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 30, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
          <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
          <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >{`Hapus ${kelompok.KelompokKamar_Nama}?`}</Text>
          <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >Kelompok kamar dan semua data kamar yang ada akan dihapus. Apakah Anda yakin?</Text>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => deleteGroup()}>
            <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Ya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginTop: 10, width: 150 }} onPress={() => {setModal2(false)}}>
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
    // alignItems: 'center',
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

export default RoomGroupListScreen;