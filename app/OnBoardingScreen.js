import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoardingScreen = ({navigation}) => {
  const [count, setCount] = useState(0)
  const [role, setRole] = useState('')
  var width = Dimensions.get('window').width

  useEffect(() => {
    AsyncStorage.getItem('@user_role').then((item) => {
      setRole(item)
    })
    
  }, [])

  switch (count) {
    case 0:
      if (role == 'Pengelola') {
        return (
          <View style={styles.container}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black', textAlign: 'center'}} >Selamat Datang</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black', textAlign: 'center'}} >di
              <Text style={{ fontFamily: 'UbuntuTitling-Bold', fontSize: 32, color: '#FFB700'}} > KostKu</Text>
            </Text>
            <View style={{ flexDirection: 'column', alignItems: 'center', padding: 10, marginVertical: 30 }} >
              <Image source={require('../assets/image/OnboardingPengelola_Penjaga_1.png')} style={{ width: width*0.5, height: width*0.5 }} />
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black', textAlign: 'center', margin: 20 }} >
                Dengan<Text style={{ fontFamily: 'UbuntuTitling-Bold', fontSize: 18, color: '#FFB700'}} > KostKu</Text>
                , tidak perlu pusing lagi mengelola rumah kost.
              </Text>
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black', textAlign: 'center' }} >
                Cukup dengan satu aplikasi, Anda dapat menyimpan berbagai data yang diperlukan rumah kost.
              </Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#FFB700', alignItems: 'center', width: '50%', borderRadius: 10, padding: 5 }} onPress={() => {setCount(1)}}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: 'white'}} >Lanjut</Text>
            </TouchableOpacity>
          </View>
        )
      } else if (role == 'Penghuni') {
        return (
          <View style={styles.container}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black', textAlign: 'center'}} >Selamat Datang</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black', textAlign: 'center'}} >di
              <Text style={{ fontFamily: 'UbuntuTitling-Bold', fontSize: 32, color: '#FFB700'}} > KostKu</Text>
            </Text>
            <View style={{ flexDirection: 'column', alignItems: 'center', padding: 10, marginVertical: 30 }} >
              <Image source={require('../assets/image/OnboardingPenghuni_1.png')} style={{ width: width*0.5, height: width*0.5 }} />
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black', textAlign: 'center', margin: 20 }} >
                Dengan<Text style={{ fontFamily: 'UbuntuTitling-Bold', fontSize: 18, color: '#FFB700'}} > KostKu</Text>
                , kamu tidak perlu lagi repot-repot untuk administrasi selama di rumah kost!
              </Text>
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black', textAlign: 'center' }} >
                Kamu juga bisa mendapatkan informasi terbaru rumah kostmu dengan mudah lho.
              </Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#FFB700', alignItems: 'center', width: '50%', borderRadius: 10, padding: 5 }} onPress={() => {setCount(1)}}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: 'white'}} >Lanjut</Text>
            </TouchableOpacity>
          </View>
        )
      }

      break;
    case 1:
      if (role == 'Pengelola') {
        return (
          <View style={styles.container}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black', textAlign: 'center'}} >Jadilah penghuni rumah</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black', textAlign: 'center'}} >kost pilihanmu tanpa ribet</Text>
            <View style={{ flexDirection: 'column', alignItems: 'center', padding: 10, marginVertical: 30 }} >
              <Image source={require('../assets/image/OnboardingPengelola_Penjaga_2.png')} style={{ width: width*0.5, height: width*0.5 }} />
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black', textAlign: 'center', margin: 20 }} >
                Selalu bingung ketika ditanya pencari berapa kamar yang kosong?
              </Text>
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black', textAlign: 'center' }} >
                Sekarang bisa lihat jumlah, nomor, dan harga kamar yang kosong dengan cepat di
                <Text style={{ fontFamily: 'UbuntuTitling-Bold', fontSize: 18, color: '#FFB700'}} > KostKu</Text>.
              </Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#FFB700', alignItems: 'center', width: '50%', borderRadius: 10, padding: 5 }} onPress={() => {setCount(2)}}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: 'white'}} >Lanjut</Text>
            </TouchableOpacity>
          </View>
        )
      } else if (role == 'Penghuni') {
        return (
          <View style={styles.container}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black', textAlign: 'center'}} >Catat dan hitung</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black', textAlign: 'center'}} >jumlah kamar kosong</Text>
            <View style={{ flexDirection: 'column', alignItems: 'center', padding: 10, marginVertical: 30 }} >
              <Image source={require('../assets/image/OnboardingPenghuni_2.png')} style={{ width: width*0.5, height: width*0.5 }} />
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black', textAlign: 'center', margin: 20 }} >
                Setelah dapat rumah kost yang kamu inginkan, mausk sebagai penghuni dan mulai tempati rumah kost dengan pengalaman yang baru!
              </Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#FFB700', alignItems: 'center', width: '50%', borderRadius: 10, padding: 5 }} onPress={() => {setCount(2)}}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: 'white'}} >Lanjut</Text>
            </TouchableOpacity>
          </View>
        )
      }
      break;
    case 2:
      if (role == 'Pengelola') {
        return (
          <View style={styles.container}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black', textAlign: 'center'}} >Lihat data tiap kamar</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black', textAlign: 'center'}} >kost dengan mudah</Text>
            <View style={{ flexDirection: 'column', alignItems: 'center', padding: 10, marginVertical: 30 }} >
              <Image source={require('../assets/image/OnboardingPengelola_Penjaga_3.png')} style={{ width: width*0.5, height: width*0.5 }} />
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black', textAlign: 'center', margin: 20 }} >
                Nama penghuni, nomor kamar, tanggal bayaran?
              </Text>
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black', textAlign: 'center' }} >
                Semuanya bisa Anda simpan dan lihat dengan rapih di
                <Text style={{ fontFamily: 'UbuntuTitling-Bold', fontSize: 18, color: '#FFB700'}} > KostKu</Text>.
              </Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#FFB700', alignItems: 'center', width: '50%', borderRadius: 10, padding: 5 }} onPress={() => {setCount(3)}}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: 'white'}} >Lanjut</Text>
            </TouchableOpacity>
          </View>
        )
      } else if (role == 'Penghuni') {
        return (
          <View style={styles.container}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black', textAlign: 'center'}} >Dapatkan informasi</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black', textAlign: 'center'}} >terkini rumah kostmu</Text>
            <View style={{ flexDirection: 'column', alignItems: 'center', padding: 10, marginVertical: 30 }} >
              <Image source={require('../assets/image/OnboardingPenghuni_3.png')} style={{ width: width*0.5, height: width*0.5 }} />
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black', textAlign: 'center', margin: 20 }} >
                Sering lupa tanggal pembayaran? Kelewatan informasi pengting dari Ibu kost?
              </Text>
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black', textAlign: 'center' }} >
                Tenang saja,<Text style={{ fontFamily: 'UbuntuTitling-Bold', fontSize: 18, color: '#FFB700'}} > KostKu </Text>
                akan ingetin kamu dan memberi update terkini lainnya!
              </Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#FFB700', alignItems: 'center', width: '50%', borderRadius: 10, padding: 5 }} onPress={() => {setCount(3)}}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: 'white'}} >Lanjut</Text>
            </TouchableOpacity>
          </View>
        )
      }
      break;
    case 3:
      if (role == 'Pengelola') {
        return (
          <View style={styles.container}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black', textAlign: 'center'}} >Dan masih banyak</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black', textAlign: 'center'}} >lagi fitur yang ada!</Text>
            <View style={{ flexDirection: 'column', alignItems: 'center', padding: 10, marginVertical: 30 }} >
              <Image source={require('../assets/image/OnboardingPengelola_Penjaga_4.png')} style={{ width: width*0.5, height: width*0.5 }} />
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black', textAlign: 'center', margin: 20 }} >
                Sudah siap untuk mengelola kost dengan lebih mudah?
              </Text>
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black', textAlign: 'center' }} >
                Mulai gunakan<Text style={{ fontFamily: 'UbuntuTitling-Bold', fontSize: 18, color: '#FFB700'}} > KostKu </Text>
                dan maksimalkan rumah kostmu!
              </Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#FFB700', alignItems: 'center', width: '50%', borderRadius: 10, padding: 5 }} onPress={() => {navigation.replace('CreateKost')}}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: 'white'}} >Mulai</Text>
            </TouchableOpacity>
          </View>
        )
      } else if (role == 'Penghuni') {
        return (
          <View style={styles.container}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black', textAlign: 'center'}} >Dan masih banyak</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black', textAlign: 'center'}} >lagi fitur yang ada!</Text>
            <View style={{ flexDirection: 'column', alignItems: 'center', padding: 10, marginVertical: 30 }} >
              <Image source={require('../assets/image/OnboardingPenghuni_4.png')} style={{ width: width*0.5, height: width*0.5 }} />
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black', textAlign: 'center', margin: 20 }} >
                Sudah siap untuk tinggal di kost dengan lebih nyaman dan menyenangkan?
              </Text>
              <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 16, color: 'black', textAlign: 'center' }} >
                Mulai menggunakan<Text style={{ fontFamily: 'UbuntuTitling-Bold', fontSize: 18, color: '#FFB700'}} > KostKu </Text>
                dan buat pengalaman tinggal di rumah kost yang berbeda!
              </Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#FFB700', alignItems: 'center', width: '50%', borderRadius: 10, padding: 5 }} onPress={() => {navigation.replace('EnterCode')}}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20, color: 'white'}} >Mulai</Text>
            </TouchableOpacity>
          </View>
        )
      }
      break;
  
    default:
      break;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20
  }
});

export default OnBoardingScreen;