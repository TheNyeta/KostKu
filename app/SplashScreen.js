import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

const SplashScreen = ({navigation}) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('RoleSelect')
    }, 3000)
  })

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