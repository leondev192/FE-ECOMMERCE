import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import LoadingScreen from './src/screens/LoadingScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const [isHomeLoaded, setIsHomeLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading && !isHomeLoaded) {
      setIsHomeLoaded(true);
    }
  }, [isLoading, isHomeLoaded]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.content}>
          {isHomeLoaded && <HomeScreen/>}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },
  content: {
    flex: 1,
    width: '100%',
    
  },
});
