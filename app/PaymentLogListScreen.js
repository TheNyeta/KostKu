import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment';
import 'moment/locale/id'
import axios from 'axios';

const PaymentLogListScreen = ({navigation, route}) => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const dataRumah = route.params.dataRumah
  const dataPenghuni = route.params.dataPenghuni
  const dataKamar = route.params.dataKamar
  const role = route.params.role

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    setIsLoading(true)
    
    axios.get(`https://api-kostku.pharmalink.id/skripsi/kostku?find=logPembayaran&RumahID=${dataRumah.Rumah_ID}&PenghuniID=${dataKamar.DataPenghuni.Penghuni_ID}`)
      .then(({data}) => {
        if (data.error.msg == '' && data.data != null) {
          setData(data.data.reverse())
        }
        setIsLoading(false)
      }).catch((e) => {
        console.log(e, 'error get log pembayaran')
      })
  }

  const goBack = () => {
    navigation.goBack()
  }

  const formatHarga = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(price)
  }

  const RoomItem = ({item}) => {
    return (
      <View style={{ flexDirection: 'row', paddingVertical: 8 }} >
        <View style={{ backgroundColor: '#FFB700', padding: 10, borderRadius: 15, width: 80, alignItems: 'center' }} >
          <Text style={{ color: 'white', fontFamily: 'UbuntuTitling-Bold', fontSize: 20 }} >{item.Kamar_Nomor}</Text>
        </View>
        <View style={{ marginHorizontal: 5, width: '40%' }} >
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15, paddingLeft: 4 }} >{moment(item.Tanggal_Berakhir, 'YYYY MM DD').format('MMMM')}</Text>
          <View style={{flexDirection: 'row' }} >
            <Icon size={15} name='calendar-blank-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 4 }} />
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} >{moment(item.Tanggal_Berakhir, 'YYYY MM DD').format('D MMMM')}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }} >
          <Icon size={15} name='cash-multiple' color='black' style={{ paddingHorizontal: 4 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 13 }} >{formatHarga(item.Kamar_Harga)}</Text>
        </View>
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
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 25, color: 'black'}} >Status pembayaran</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >{role == 'Penghuni' ? 'Status pembayaran tiap bulan' : `Status pembayaran untuk kamar ${dataKamar.Kamar_Nomor}`}</Text>
          </View>
        </View>
        { role == 'Penghuni' ?
              <Image source={dataPenghuni.Penghuni_Image == '' ? require('../assets/image/Large.png') : { uri: dataPenghuni.Penghuni_Image }} style={{ height: 50, width: 50, borderRadius: 100}} />
            :
              <Image source={dataRumah.Rumah_Image == '' ? require('../assets/image/RumahKost_Default.png') : { uri: dataRumah.Rumah_Image }} style={{ height: 50, width: 50, borderRadius: 100}} />
          }
      </View>
      { isLoading ?
          <ActivityIndicator color={'#FFB700'} size={50} style={{ alignSelf: 'center', marginTop: 50 }} />
        :
          <>
            <View style={{ flexDirection: 'column', alignSelf: 'flex-start', width: '100%' }} >
              <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: 'black', marginVertical: 10 }} >Pembayaran selanjutnya</Text>
              <RoomItem item={dataKamar}/>
            </View>
            { data.length == 0 ?
                null
              :
                <>
                  <View style={{ flexDirection: 'column', marginVertical: 10 , alignSelf: 'flex-start' }} >
                    <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: 'black' }} >Sudah dibayar</Text>
                  </View>
                  <FlatList
                    data={data}
                    renderItem={renderItem}
                    style={{ width: '100%' }}
                  />
                </>
            }
          </>
      }
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

export default PaymentLogListScreen;