import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NativeBaseProvider, Box } from "native-base";
import firestore from '@react-native-firebase/firestore';


const DashboardPage = () => {
  
  // firestore().collection('Kostku-Acc').doc('User').collection('Penghuni').get()
  // .then( (data) => {
  //   data.forEach( (document) => {
  //     console.log(document.data(), 'test aja')
  //   })  
  //   });

  const penghuniRef = firestore().collection('Kostku-Acc').doc('User').collection('Penghuni')

  const [ loading, setLoading ] = useState(true);
  const [ todos, setTodos ] = useState([]);

  useEffect(() => {
    return penghuniRef.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        list.push(doc.data());
      });
      setTodos(list);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is dashboard page!</Text>
      <NativeBaseProvider>
        <Box>asdasdasd</Box>
      </NativeBaseProvider>
      <FlatList 
        style={{flex: 1}}
        data={todos}
        renderItem={({ item }) => <Text>{item.PenghuniEmail}</Text>}
      />
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