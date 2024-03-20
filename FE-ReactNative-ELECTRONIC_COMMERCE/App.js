// App.js
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, TouchableOpacity } from 'react-native';

import LoadingScreen from './src/screens/LoadingScreen';
import HomeScreen from './src/screens/HomeScreen';
import ShopScreen from './src/screens/ShopScreen';
import BlogScreen from './src/screens/BlogScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

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
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Shop') {
              iconName = focused ? 'storefront' : 'storefront-outline';
            } else if (route.name === 'Blog') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#BD9B38',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 20 }}>
                <Ionicons name="cart" size={24} color="black" />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ marginLeft: 20 }}>
                <Ionicons name="search" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Tab.Screen 
          name="Shop" 
          component={ShopScreen} 
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 20 }}>
                <Ionicons name="cart" size={24} color="black" />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ marginLeft: 20 }}>
                <Ionicons name="search" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Tab.Screen 
          name="Blog" 
          component={BlogScreen} 
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 20 }}>
                <Ionicons name="cart" size={24} color="black" />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ marginLeft: 20 }}>
                <Ionicons name="search" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 20 }}>
                <Ionicons name="cart" size={24} color="black" />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ marginLeft: 20 }}>
                <Ionicons name="search" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
