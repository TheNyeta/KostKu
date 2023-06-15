import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Rating } from 'react-native-ratings';

const RatingListScreen = ({navigation, route}) => {
  const [search, setSearch] = useState('')
  const [rating, setRating] = useState('')
  const ratings = route.params.ratings

  useEffect(() => {
    setRating(averageRating(ratings))
  }, [])

  const goBack = () => {
    navigation.goBack()
  }

  const ReviewItem = ({review}) => {
    return (
      <View style={{ flexDirection: 'column', padding: 15, backgroundColor: 'white', elevation: 5, marginVertical: 10, width: '90%', borderRadius: 15, alignItems: 'center', alignSelf: 'center' }} >
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }} >
        <Image source={require('../assets/image/Large.png')} style={{ borderRadius: 50, width: 50, height: 50 }} />
          <View style={{ marginHorizontal: 5, width: '70%' }} >
            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', color: 'black', fontSize: 15 }} >{review.Penghuni_Name}</Text>
            <Rating 
              type='custom'
              ratingColor='#ffb700'
              imageSize={15}
              fractions={0}
              startingValue={review.Nilai_Rating}
              readonly
              style={{ alignSelf: 'flex-start' }}
            />
          </View>
          <View style={{ backgroundColor: '#FFB700', padding: 2, paddingHorizontal: 10, borderRadius: 50 }} >
            <Text style={{ fontFamily: 'UbuntuTitling-Bold', color: 'white', fontSize: 15 }} >{review.num}</Text>
          </View>
        </View>
        <View style={{ alignSelf: 'flex-start', width: '100%' }} >
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', color: 'black', fontSize: 15 }} >{review.Ulasan_Rating}</Text>
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

  const averageRating = (rating) => {
    let sum = 0
    rating.map((item) => {
      sum = sum + item.Nilai_Rating
    })

    return sum/rating.length
  }

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
            readonly
          />
          <Text style={{ fontFamily: 'PlusJakartaSans-Regular', fontSize: 15, color: 'black' }} >
            dari
            <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 15, color: 'black' }} > {ratings.length} ulasan </Text>
            penghuni
          </Text>
      </View>
      <View style={{ flexDirection: 'column', marginVertical: 10 , alignSelf: 'flex-start' }} >
        <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 25, color: 'black' }} >Ulasan</Text>
      </View>
      <FlatList
        data={ratings}
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