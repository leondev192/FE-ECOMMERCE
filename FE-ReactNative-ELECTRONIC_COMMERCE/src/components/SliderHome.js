// SliderHome.js
import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const SliderHome = () => {
  const data = [
    { image: require('../assets/images/slider1.jpg') },
    { image: require('../assets/images/slider2.png') },
    { image: require('../assets/images/slider3.png') },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      sliderWidth={Dimensions.get('window').width}
      itemWidth={Dimensions.get('window').width / 3}
      loop
      autoplay
      autoplayInterval={3000}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    width: Dimensions.get('window').width / 3,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 90,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
});

export default SliderHome;
