// SliderHome.js
import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'deprecated-react-native-prop-types';

const SliderHome = () => {
  const data = [
    { image: require('../assets/images/s0.png') },
    { image: require('../assets/images/s4.png') },
  
    { image: require('../assets/images/s2.png') },
    // { image: require('../assets/images/Slider-4.jpg') },
    
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
      itemWidth={Dimensions.get('window').width / 1}
      loop
      autoplay
      autoplayInterval={3000}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    width: ('100%'),
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10,
   
  },
  image: {
    width: '94%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  }
});

export default SliderHome;
