// App.js

import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoadingScreen from './src/screens/LoadingScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';



function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <MainTabNavigator/>
    </NavigationContainer>
  );
}

export default App;
