import React, { useState, useEffect, useContext }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';
import axios from 'axios';
import { UpdateContext } from './GlobalState';

const NewPenghuniListScreen = ({navigation, route}) => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [penjaga, setPenjaga] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)
  const [isUpdate, setIsUpdate] = useContext(UpdateContext)
  const dataRumah = route.params.dataRumah
  const kostImage = dataRumah.Rumah_Image

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    setIsLoading(true)
    axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=order&RumahID=${dataRumah.Rumah_ID}`)
      .then(({data}) => {
        if (data.error.msg == '' && data.data != null) {

          setData(data.data)
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

  const terima = () => {
    setModal(false)
    setModal2(true)
    axios.put(`https://api-kostku.pharmalink.id/skripsi/kostku?update=orderBerhasil&OrderID=${penjaga.Order_ID}&RumahID=${dataRumah.Rumah_ID}&PenjagaID=${penjaga.DataPenjaga.Penjaga_ID}`)
      .then(({data}) => {
        console.log(data)
        if (data.error.msg == '') {
          setIsUpdate({
            ...isUpdate,
            updateDashboard: true
          })
          navigation.replace('NewPenghuniList', {dataRumah: dataRumah})
        }
        setModal2(false)
      }).catch((e) => {
        console.log(e, 'error terima penjaga')
      })
  }

  const tolak = () => {
    setModal(false)
    setModal2(true)
    axios.put(`https://api-kostku.pharmalink.id/skripsi/kostku?update=orderBatal&OrderID=${penjaga.Order_ID}`)
      .then(({data}) => {
        console.log(data)
        if (data.error.msg == '') {
          setIsUpdate({
            ...isUpdate,
            updateDashboard: true
          })
          navigation.replace('NewPenghuniList', {dataRumah: dataRumah})
        }
        setModal2(false)
      }).catch((e) => {
        console.log(e, 'error tolak penjaga')
      })
  }

  const PenghuniItem = ({item}) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'center' }} onPress={() => goToNewPenghuniDetail(item)}>
        <View style={{ backgroundColor: '#FFB700', padding: 8, borderRadius: 10, width: 75, alignItems: 'center'}} >
          <Icon size={25} name='account-plus-outline' color='white' style={{ alignSelf: 'center', paddingHorizontal: 4 }} />
        </View>
        <View style={{ marginHorizontal: 10, width: '100%'}} >
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15 }} numberOfLines={1} >{item.DataPenghuni.Penghuni_Name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const PenjagaItem = ({item}) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'center' }} onPress={() => {setPenjaga(item); setModal(true)}}>
        <View style={{ backgroundColor: '#FFB700', padding: 8, borderRadius: 10, width: 75, alignItems: 'center'}} >
          <Icon size={25} name='home-city-outline' color='white' style={{ alignSelf: 'center', paddingHorizontal: 4 }} />
        </View>
        <View style={{ marginHorizontal: 10, width: '100%' }} >
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15}} numberOfLines={1} >{item.DataPenjaga.Penjaga_Name}</Text>
          <View style={{flexDirection: 'row', width: '100%' }} >
              <Icon size={15} name='cellphone' color='black' style={{ alignSelf: 'center', paddingHorizontal: 4 }} />
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} numberOfLines={1} >{item.DataPenjaga.Penjaga_Number }</Text>
            </View>
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
      {/* <View style={{ flexDirection: 'row', backgroundColor: '#E8EAED', width: '100%', marginTop: 20, borderRadius: 100 }} >
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
      </View> */}
      { isLoading ? 
          <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
        :
          <FlatList
            data={data}
            renderItem={({item}) => {
              if (item.Roles == 'Penghuni') {
                return (<PenghuniItem item={item}/>)
              } else {
                return (<PenjagaItem item={item}/>)
              }
            }}
            style={{ width: '100%', marginVertical: 10 }}
            ListEmptyComponent={<Image source={require('../assets/image/EmptyStateImg_General.png')} style={{ alignSelf: 'center', width: 150, height: 150, marginTop: 50 }} />}
          />
      }
      { Object.keys(penjaga).length == 0 ?
          null
        :
          <Modal
            isVisible={modal}
            onBackdropPress={() => setModal(false)}
          >
            <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', paddingBottom: 30, paddingTop: 10, paddingHorizontal: 20, borderRadius: 20, width: '90%' }}>
              <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => setModal(false)}>
                <Icon size={30} name='close' color='lightgray' style={{ alignSelf: 'flex-end' }} />
              </TouchableOpacity>
              <Icon size={50} name='alert-outline' color='#FFB700' style={{ alignSelf: 'center' }} />
              <Text style={{fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Terima sebagai penjaga</Text>
              <Text style={{fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', color: 'black', textAlign: 'center' }} >{`Terima ${penjaga.DataPenjaga.Penjaga_Name}/${penjaga.DataPenjaga.Penjaga_Number} sebagai penjaga rumah kost?`}</Text>
              <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: '#FFB700', padding: 5, borderRadius: 7, marginTop: 10, width: 150 }} onPress={() => terima()}>
                <Text style={{ fontSize: 18, color: 'white', fontFamily: 'PlusJakartaSans-Bold' }} >Terima</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center' ,backgroundColor: 'white', padding: 5, borderRadius: 7, borderColor: '#FFB700', borderWidth: 2, marginTop: 10, width: 150 }} onPress={() => tolak()}>
                <Text style={{ fontSize: 18, color: '#FFB700', fontFamily: 'PlusJakartaSans-Bold' }} >Tolak</Text>
              </TouchableOpacity>
            </View>
          </Modal>
      }
      <Modal
        isVisible={modal2}
      >
        <View style={{flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 20, width: 200, height: 200 }}>
          <Text style={{fontSize: 25, fontFamily: 'PlusJakartaSans-SemiBold', color: '#FFB700', textAlign: 'center' }} >Memproses</Text>
          <ActivityIndicator color={'#FFB700'} size={100} style={{ alignSelf: 'center', marginVertical: 20 }} />
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

export default NewPenghuniListScreen;