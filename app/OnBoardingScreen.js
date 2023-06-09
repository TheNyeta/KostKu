import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Dimensions } from 'react-native';

const OnBoardingScreen = ({navigation}) => {
  const [count, setCount] = useState(0)
  var width = Dimensions.get('window').width
  var data = {}

  useEffect(() => {
    switch (count) {
      case 1:
        data = {
          title: '',
          image: '',
          image: '',
          image: '',
          image: '',
        }
        break;
    
      default:
        break;
    }
  }, [count])

  const onboard1 = () => {
    return (
      <View style={styles.container}>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black'}} >Selamat Datang</Text>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black'}} >di
          <Text style={{ fontFamily: 'UbuntuTitling-Bold', fontSize: 32, color: '#FFB700'}} > KostKu</Text>
        </Text>
        <View style={{ flexDirection: 'column', alignItems: 'center', padding: 10, marginVertical: 30 }} >
          <Image source={require('../assets/image/OnboardingPengelola_Penjaga_1.png')} style={{ width: width*0.5, height: width*0.5 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 20, color: 'black', textAlign: 'center', marginBottom: 20 }} >
            Dengan<Text style={{ fontFamily: 'UbuntuTitling-Bold', fontSize: 20, color: '#FFB700'}} > KostKu</Text>
            , tidak perlu pusing lagi mengelola rumah kost.
          </Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 20, color: 'black', textAlign: 'center' }} >
            Cukup dengan satu aplikasi, Anda dapat menyimpan berbagai data yang diperlukan rumah kost.
          </Text>
        </View>
        <TouchableOpacity style={{ backgroundColor: '#FFB700', alignItems: 'center', width: '50%', borderRadius: 10, padding: 5 }}>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 24, color: 'white'}} >Lanjut</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const onboard2 = () => {
    return (
      <View style={styles.container}>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black'}} >Selamat Datang</Text>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black'}} >di
          <Text style={{ fontFamily: 'UbuntuTitling-Bold', fontSize: 32, color: '#FFB700'}} > KostKu</Text>
        </Text>
        <View style={{ flexDirection: 'column', alignItems: 'center', padding: 10, marginVertical: 30 }} >
          <Image source={require('../assets/image/OnboardingPengelola_Penjaga_1.png')} style={{ width: width*0.5, height: width*0.5 }} />
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 20, color: 'black', textAlign: 'center', marginBottom: 20 }} >
            Dengan<Text style={{ fontFamily: 'UbuntuTitling-Bold', fontSize: 20, color: '#FFB700'}} > KostKu</Text>
            , tidak perlu pusing lagi mengelola rumah kost.
          </Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 20, color: 'black', textAlign: 'center' }} >
            Cukup dengan satu aplikasi, Anda dapat menyimpan berbagai data yang diperlukan rumah kost.
          </Text>
        </View>
        <TouchableOpacity style={{ backgroundColor: '#FFB700', alignItems: 'center', width: '50%', borderRadius: 10, padding: 5 }}>
        <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 24, color: 'white'}} >Lanjut</Text>
        </TouchableOpacity>
      </View>
    )
  }

  switch (count) {
    case 0:
      return (
        <View style={styles.container}>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black'}} >Selamat Datang</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black'}} >di
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
      break;
    case 1:
      return (
        <View style={styles.container}>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black'}} >Catat dan hitung</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black'}} >jumlah kamar kosong</Text>
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
      break;
    case 2:
      return (
        <View style={styles.container}>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black'}} >Lihat data tiap kamar</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black'}} >kost dengan mudah</Text>
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
      break;
    case 3:
      return (
        <View style={styles.container}>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black'}} >Dan masih banyak</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black'}} >lagi fitur yang ada!</Text>
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
      break;
  
    default:
      break;
  }

  // return (
  //   <View style={styles.container}>
  //     <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black'}} >Selamat Datang</Text>
  //     <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 30, color: 'black'}} >di
  //       <Text style={{ fontFamily: 'UbuntuTitling-Bold', fontSize: 32, color: '#FFB700'}} > KostKu</Text>
  //     </Text>
  //     <View style={{ flexDirection: 'column', alignItems: 'center', padding: 10, marginVertical: 30 }} >
  //       <Image source={require('../assets/image/OnboardingPengelola_Penjaga_1.png')} style={{ width: width*0.5, height: width*0.5 }} />
  //       <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 20, color: 'black', textAlign: 'center', marginBottom: 20 }} >
  //         Dengan<Text style={{ fontFamily: 'UbuntuTitling-Bold', fontSize: 20, color: '#FFB700'}} > KostKu</Text>
  //         , tidak perlu pusing lagi mengelola rumah kost.
  //       </Text>
  //       <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 20, color: 'black', textAlign: 'center' }} >
  //         Cukup dengan satu aplikasi, Anda dapat menyimpan berbagai data yang diperlukan rumah kost.
  //       </Text>
  //     </View>
  //     <TouchableOpacity style={{ backgroundColor: '#FFB700', alignItems: 'center', width: '50%', borderRadius: 10, padding: 5 }}>
  //     <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 24, color: 'white'}} >Lanjut</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
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