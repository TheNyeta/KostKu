import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {

  useEffect(() => {

    
    setTimeout(async () => {
      const user_data = await getData('@user_data')
      const kost_data = await getData('@kost_data')
      const order_id = await getData('@order_id')
      const penghuni_data = await getData('@penghuni_data')
      if (kost_data !== null) {
        navigation.replace('Home')
      } else if (penghuni_data !== null) {
        navigation.replace('HomePenghuni')
      } else if (order_id !== null) {
        navigation.replace('Waiting')
      } else if (user_data !== null) {
        navigation.replace('OnBoarding') //ntar ganti ke onboarding
      } else {
        navigation.replace('RoleSelect')
      }

    }, 3000)
  })

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log(e, 'error')
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/image/kostkuLogo150.png')} style={{ width: 150, height: 150 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  }
});

export default SplashScreen;