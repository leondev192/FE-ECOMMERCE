import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      {/* Đặt hình ảnh trong phần nội dung của màn hình */}
      
      
      <Image style={styles.imageheader} source={require('../assets/images/imageheader.png')} />
      <Image style={styles.imagelogo1} source={require('../assets/images/logo-loading.png')}/>
      <Image style={styles.imagelogo2} source={require('../assets/images/logo-loadding2.png')}/>
      <Image style={styles.imagefooter} source={require('../assets/images/imageheader.png')} />
      
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    position: 'relative',
    
  },
  imageheader: { 
    width: '100%',
    height: 90,
  },
  imagelogo1:{
    width: '90%',
    height: '15.5%',
    marginLeft: '5%',
    marginRight:'5%',
    borderRadius:20,
    marginTop:60,
  },
  imagelogo2:{
    width: 150.88,
    height: 208.2,
    marginTop: '20%',

  },
  imagefooter: { 
    width: '100%',
    height: 90,
    marginTop:'30%',
    position: 'absolute',
    bottom: 0,
  },
});

export default LoadingScreen;
