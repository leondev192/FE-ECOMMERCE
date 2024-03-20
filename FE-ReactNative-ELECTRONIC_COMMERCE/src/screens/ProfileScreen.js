import React from 'react';
import { View,Button, Text, StyleSheet } from 'react-native';


const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
    
    <Text>Home Screen</Text>
  
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Loading')}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(245, 245, 245, 1)',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width:'100%',
    height:'100%',
  },
  
});

export default HomeScreen;
