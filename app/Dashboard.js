import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeBaseProvider, Box } from "native-base";

const DashboardPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is dashboard page!</Text>
      <NativeBaseProvider>
      <Box>Hello worasdld</Box>
    </NativeBaseProvider>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DashboardPage;