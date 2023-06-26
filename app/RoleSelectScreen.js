import React, { useState }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const RoleSelectScreen = ({navigation}) => {
  const [search, setSearch] = useState('')
  const [date, setDate] = useState('')

  const navigate = (role) => {
    navigation.navigate('Login', { role })
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
        <View style={{flexDirection: 'row', alignItems: 'center' }} >
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 32, color: 'black'}} >Selamat datang!</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Masuk akun untuk menggunakan aplikasi</Text>
          </View>
        </View>
        <Image source={require('../assets/image/kostkuLogo150.png')} style={{ borderRadius: 50, width: 50, height: 50 }} />
      </View>
      <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 25, color: 'black', alignSelf: 'flex-start', marginVertical: 10}} >Masuk sebagai</Text>
      <View style={{ flex: 1, flexDirection: 'column',  width: '100%', alignItems: 'center', justifyContent: 'space-between' }} >
        <TouchableOpacity style={{ flexDirection: 'row', height: '30%', width: '100%', alignItems: 'center', borderRadius: 20, borderWidth: 2, borderColor: '#FFB700', elevation: 10, backgroundColor: 'white', shadowColor: '#FFB700', justifyContent: 'center' }} onPress={() => navigate('Penghuni')} >
          <Image source={require('../assets/image/Role1_Penghuni.png')} style={{ width: 150, height: 150 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: '#FF7A00'}} >Penghuni Kost</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', height: '30%', width: '100%', alignItems: 'center', borderRadius: 20, borderWidth: 2, borderColor: '#FFB700', elevation: 10, backgroundColor: 'white', shadowColor: '#FFB700', justifyContent: 'center' }} onPress={() => navigate('Pengelola')} >
          <Image source={require('../assets/image/Role2_Pemilik.png')} style={{ width: 150, height: 150 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: '#FF7A00'}} >Pengelola Kost</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', height: '30%', width: '100%', alignItems: 'center', borderRadius: 20, borderWidth: 2, borderColor: '#FFB700', elevation: 10, backgroundColor: 'white', shadowColor: '#FFB700', justifyContent: 'center' }} onPress={() => navigate('Penjaga')} >
          <Image source={require('../assets/image/Role3_Penjaga.png')} style={{ width: 150, height: 150 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: '#FF7A00'}} >Penjaga Kost</Text>
        </TouchableOpacity>
      </View>
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

export default RoleSelectScreen;