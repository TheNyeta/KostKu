import React, { useState }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Rating } from 'react-native-ratings';

const RatingListScreen = ({navigation}) => {
  const [search, setSearch] = useState('')
  const [rating, setRating] = useState('4.5')


  const goBack = () => {
    navigation.goBack()
  }

  const ReviewItem = ({review}) => {
    return (
      <View style={{ flexDirection: 'column', padding: 15, backgroundColor: 'white', elevation: 5, marginVertical: 10, width: '90%', borderRadius: 15, alignItems: 'center', alignSelf: 'center' }} >
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }} >
        <Image source={require('../assets/image/Large.png')} style={{ borderRadius: 50, width: 50, height: 50 }} />
          <View style={{ marginHorizontal: 5, width: '70%' }} >
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15 }} >{review.name}</Text>
            <Rating 
              type='custom'
              ratingColor='#ffb700'
              imageSize={15}
              fractions={0}
              startingValue={review.rating}
              readonly
              style={{ alignSelf: 'flex-start' }}
            />
          </View>
          <View style={{ backgroundColor: '#FFB700', padding: 2, paddingHorizontal: 10, borderRadius: 50 }} >
            <Text style={{ fontFamily: 'UbuntuTitling-Bold', color: 'white', fontSize: 15 }} >{review.num}</Text>
          </View>
        </View>
        <View style={{ alignSelf: 'flex-start', width: '100%' }} >
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 15 }} >{review.text}</Text>
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 15, alignSelf: 'flex-end' }} >{review.date}</Text>
        </View>
      </View>
    )
  }

  const renderItem = ({item}) => {

    return (
      <ReviewItem
        review={item}
      />
    )
  }

  const data = [
    {
      num: '101',
      name: 'test a',
      date: 'Sabtu 5 Desemqweber 2022 - 12:12',
      price: 'Rp 12.000.000',
      text: 'asdasd asd sa as as asasrrwer wrwer wewe rrrr rrr',
      rating: '4'
    },
    {
      num: '102',
      name: 'test b',
      date: '22 Desemeber',
      price: 'Rp 1.000.000',
      text: 'asdas wqeq  d asd sa adasa ae wes as asas rrwer wrwera sda asd wewe rrrrrrr',
      rating: '2'
    },
    {
      num: '103',
      name: 'test c',
      date: '31 Desemasdber',
      price: 'Rp 11.000.000',
      text: 'asdasd asd sa as as asasrrwer wrwer wewe rrrr rrr',
      rating: '5'
    }
  ]

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
        <View style={{flexDirection: 'row', alignItems: 'center' }} >
          <TouchableOpacity onPress={() => goBack()}>
            <Icon size={25} name='arrow-left' color='black' style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 32, color: 'black'}} >Ulasan kost</Text>
            <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black'}} >Ulasan & komentar dari penghuni</Text>
          </View>
        </View>
        <Image source={require('../assets/image/Large.png')} style={{ borderRadius: 50, width: 50, height: 50 }} />
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 20 }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 25, color: 'black' }} >Nama kost</Text>
        <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 25, color: 'black' }} >{rating}</Text>
        <Rating 
            type='custom'
            ratingColor='#ffb700'
            imageSize={30}
            fractions={1}
            startingValue={rating}
            onFinishRating={(rating) => setRating(rating)}
            // readonly
          />
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black' }} >
            dari
            <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 15, color: 'black' }} > 13 ulasan </Text>
            penghuni
          </Text>
      </View>
      <View style={{ flexDirection: 'column', marginVertical: 10 , alignSelf: 'flex-start' }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 25, color: 'black' }} >Ulasan</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        style={{ width: Dimensions.get('window').width }}
      />
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

export default RatingListScreen;