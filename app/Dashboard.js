import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const DashboardPage = ({navigation}) => {
  
  // firestore().collection('Kostku-Acc').doc('User').collection('Penghuni').get()
  // .then( (data) => {
  //   data.forEach( (document) => {
  //     console.log(document.data(), 'test aja')
  //   })  
  //   });

  // const penghuniRef = firestore().collection('Kostku-Acc').doc('User').collection('Penghuni')

  // const [ loading, setLoading ] = useState(true);
  // const [ todos, setTodos ] = useState([]);

  // useEffect(() => {
  //   return penghuniRef.onSnapshot(querySnapshot => {
  //     const list = [];
  //     querySnapshot.forEach(doc => {
  //       list.push(doc.data());
  //     });
  //     setTodos(list);
  //     if (loading) {
  //       setLoading(false);
  //     }
  //   });
  // }, []);

  const goToRoomGroupList = () => {
    // Code to handle login
    navigation.navigate('RoomGroupList')
  }

  return (
    <View style={{ flex:1 }}>
      <ScrollView contentContainerStyle={styles.container} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }} >
          <View style={{}} >
            <Text style={{ color: 'black', fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold' }}>kostku</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular' }}>Jakarta Pusat</Text>
              <Icon size={15} name='star' color='#FFB700' style={{ alignSelf: 'center', paddingHorizontal: 2 }} />
              <Text style={{ color: '#FFB700', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>4</Text>
            </View>
          </View>
          <Image source={require('../assets/image/Large.png')} style={{height: 50, width: 50}} />
        </View>
        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginVertical: 20, padding: 10, borderRadius: 10, backgroundColor: 'white', elevation: 5 }} >
          <Icon size={30} name='calendar' color='#FFB700' style={{ alignSelf: 'center', paddingRight: 10 }} />
          <View style={{ flexDirection: 'column', width: '100%' }} >
            <Text style={{ color: '#FFB700', fontSize: 15, fontFamily: 'PlusJakartaSans-SemiBold' }} >11 September 2022</Text>
            <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular', width: '90%' }} numberOfLines={1} >test aja ini mah ya makasi</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'column', width: '100%' }} >
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 20 }} >
            <TouchableOpacity style={{ flexDirection: 'column', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '47%' }} >
              <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center' }} >
                <Icon size={25} name='door' color='#FFB700' style={{ alignSelf: 'center' }} />
              </View>
              <Text style={{ color: 'white', fontSize: 35, fontFamily: 'PlusJakartaSans-Bold' }}>10</Text>
              <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>Kamar kosong</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'column', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '47%' }} onPress={() => goToRoomGroupList()} >
              <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center' }} >
                <Icon size={25} name='account-multiple' color='#FFB700' style={{ alignSelf: 'center' }} />
              </View>
              <Text style={{ color: 'white', fontSize: 35, fontFamily: 'PlusJakartaSans-Bold' }}>30</Text>
              <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>Jumlah penghuni</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: 20 }} >
            <View style={{ flexDirection: 'column' }} >
              <Text style={{ color: 'white', fontSize: 35, fontFamily: 'PlusJakartaSans-Bold' }}>5</Text>
              <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>Penghuni</Text>
            </View>
            <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center' }} >
              <Icon size={25} name='account-multiple' color='#FFB700' style={{ alignSelf: 'center' }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#FFB700', padding: 12, borderRadius: 20, justifyContent: 'space-between', width: '100%', alignItems: 'center' }} >
            <View style={{ flexDirection: 'column' }} >
              <Text style={{ color: 'white', fontSize: 35, fontFamily: 'PlusJakartaSans-Bold' }}>5</Text>
              <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }}>Penghuni</Text>
            </View>
            <View style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: 'center' }} >
              <Icon size={25} name='account-multiple' color='#FFB700' style={{ alignSelf: 'center' }} />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={{ color: 'black', fontSize: 30, fontFamily: 'PlusJakartaSans-SemiBold', alignSelf: 'flex-start', marginVertical: 20 }}>Notifikasi</Text>
        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, padding: 15, borderRadius: 10, backgroundColor: 'white', elevation: 5 }} >
          <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Keluhan dari penghuni</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            <View style={{ backgroundColor: '#CC3300', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 10 }} >
              <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >99+</Text>
            </View>
            <Icon size={40} name='chevron-right' color='black' style={{ alignSelf: 'center' }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, padding: 15, borderRadius: 10, backgroundColor: 'white', elevation: 5 }} >
          <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Laporan kost</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            <View style={{ backgroundColor: '#FF7A00', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 10 }} >
              <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >50</Text>
            </View>
            <Icon size={40} name='chevron-right' color='black' style={{ alignSelf: 'center' }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, padding: 15, borderRadius: 10, backgroundColor: 'white', elevation: 5, marginBottom: 80 }} >
          <Text style={{ color: 'black', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >Pesan broadcast</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }} >
            {/* <View style={{ backgroundColor: '#CC3300', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 10 }} >
              <Text style={{ color: 'white', fontSize: 15, fontFamily: 'PlusJakartaSans-Bold' }} >99+</Text>
            </View> */}
            <Icon size={40} name='chevron-right' color='black' style={{ alignSelf: 'center' }} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20
  }
});

export default DashboardPage;