import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Collapsible from 'react-native-collapsible';

const SettingPage = () => {
  const [collapNotif, setCollapNotif] = useState(true)
  const [bayaranToggle, setBayaranTogle] = useState(false)
  const [keluhanToggle, setKeluhanTogle] = useState(false)
  const [laporanToggle, setLaporanTogle] = useState(false)
  

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 20 }} >
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 31, color: 'black'}} >Daftar Kamar</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Kelompok Kamar</Text>
        </View>
        <Image source={require('../assets/image/Large.png')} style={{ width: 50, height: 50 }} />
      </View>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 10 }} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
          <Icon size={25} name='home-city-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 18, color: 'black' }} >Rumah kost</Text>
        </View>
        <Icon size={30} name='chevron-right' color='black' style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 10 }} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
          <Icon size={25} name='account-multiple-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 18, color: 'black' }} >Akun penjaga</Text>
        </View>
        <Icon size={30} name='chevron-right' color='black' style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 10 }} onPress={() => setCollapNotif(!collapNotif)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
          <Icon size={25} name='bell-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 18, color: 'black' }} >Notifikasi</Text>
        </View>
        <Icon size={30} name={collapNotif ? 'chevron-down' : 'chevron-up' } color='black' style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
      <Collapsible collapsed={collapNotif} style={{ flexDirection: 'column', width: Dimensions.get('window').width-40 }} >
        {/* <View style={{ flexDirection: 'column', backgroundColor: 'gray', width: '100%' }} > */}
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: 10 }} onPress={() => setBayaranTogle(!bayaranToggle)}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 18, color: 'black' }} >Bayaran</Text>
            <Switch 
              trackColor={{false: '#D1D5DB', true: '#FFB700'}}
              thumbColor={bayaranToggle ? '#FFB700' : '#f4f3f4'}
              style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
              onValueChange={() => setBayaranTogle(!bayaranToggle)}
              value={bayaranToggle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: 10 }} onPress={() => setKeluhanTogle(!keluhanToggle)}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 18, color: 'black' }} >Keluhan baru</Text>
            <Switch 
              trackColor={{false: '#D1D5DB', true: '#FFB700'}}
              thumbColor={keluhanToggle ? '#FFB700' : '#f4f3f4'}
              style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
              onValueChange={() => setKeluhanTogle(!keluhanToggle)}
              value={keluhanToggle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: 10 }} onPress={() => setLaporanTogle(!laporanToggle)}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 18, color: 'black' }} >Laporan baru</Text>
            <Switch 
              trackColor={{false: '#D1D5DB', true: '#FFB700'}}
              thumbColor={laporanToggle ? '#FFB700' : '#f4f3f4'}
              style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
              onValueChange={() => setLaporanTogle(!laporanToggle)}
              value={laporanToggle}
            />
          </TouchableOpacity>
        {/* </View> */}
      </Collapsible>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 10 }} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
          <Icon size={25} name='help-circle-outline' color='black' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 18, color: 'black' }} >Bantuan</Text>
        </View>
        <Icon size={30} name='chevron-right' color='black' style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 10 }} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
          <Icon size={25} name='logout' color='black' style={{ alignSelf: 'center', paddingHorizontal: 10 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 18, color: 'black' }} >Keluar</Text>
        </View>
        <Icon size={30} name='chevron-right' color='black' style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
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