// MainTabNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ShopScreen from '../screens/ShopScreen';
import BlogScreen from '../screens/BlogScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import SearchScreen from '../screens/SearchScreen'; 
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OrderScreen from '../screens/OrdersScreen';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabNavigator = () => {
  return (
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
          component={HomeStackScreen} 
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        <Tab.Screen 
          name="Shop" 
          component={ShopStackScreen} 
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        <Tab.Screen 
          name="Blog" 
          component={BlogStackScreen} 
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileStackScreen} 
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
      </Tab.Navigator>
  );
};

const HomeStackScreen = ({navigation}) => {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options=  {{ 
          headerTitle: () => (
              <Image
              source={require('../assets/logo/1.png')} 
              style={{ width: 50, height: 50 }} 
              />
              ),
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
            
            
          }} 
        />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen} 
          options={{
              headerTitle: () => (
                  <Image
                  source={require('../assets/logo/1.png')} 
                  style={{ width: 50, height: 50 }} 
                  />
                  ),
          }}
        />
        <Stack.Screen 
          name="PostDetail" 
          component={PostDetailScreen} 
          options={{
              headerTitle: () => (
                  <Image
                  source={require('../assets/logo/1.png')} 
                  style={{ width: 50, height: 50 }} 
                  />
                  ),
          }}
        />
  
        
        <Stack.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{
              headerTitle: () => (
                  <Image
                  source={require('../assets/logo/1.png')} 
                  style={{ width: 50, height: 50 }} 
                  />
                  ),
          }}
          />
  
        <Stack.Screen 
          name="Cart" 
          component={CartScreen} 
          options={{
              headerTitle: () => (
                  <Image
                  source={require('../assets/logo/1.png')} 
                  style={{ width: 50, height: 50 }} 
                  />
                  ),
          }}
        />
  
      </Stack.Navigator>
      
    );
  };
  

const ShopStackScreen = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Shop" 
        component={ShopScreen} 
        options={{ 
          
          headerTitle: () => (
            <Image
            source={require('../assets/logo/1.png')} 
            style={{ width: 50, height: 50 }} 
            />
            ),
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
        }} 
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={{
            headerTitle: () => (
                <Image
                source={require('../assets/logo/1.png')} 
                style={{ width: 50, height: 50 }} 
                />
                ),
        }}
      
      />
      <Stack.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
            headerTitle: () => (
                <Image
                source={require('../assets/logo/1.png')} 
                style={{ width: 50, height: 50 }} 
                />
                ),
        }}
        />
        <Stack.Screen 
          name="Cart" 
          component={CartScreen} 
          options={{
              headerTitle: () => (
                  <Image
                  source={require('../assets/logo/1.png')} 
                  style={{ width: 50, height: 50 }} 
                  />
                  ),
          }}
        />
    </Stack.Navigator>
  );
};

const BlogStackScreen = ({navigation}) => {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Blog" 
          component={BlogScreen} 
          options=  {{ 
          headerTitle: () => (
              <Image
              source={require('../assets/logo/1.png')} 
              style={{ width: 50, height: 50 }} 
              />
              ),
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
          }} 
        />
      
        <Stack.Screen 
          name="PostDetail" 
          component={PostDetailScreen} 
          options={{
              headerTitle: () => (
                  <Image
                  source={require('../assets/logo/1.png')} 
                  style={{ width: 50, height: 50 }} 
                  />
                  ),
          }}
        />
        <Stack.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
            headerTitle: () => (
                <Image
                source={require('../assets/logo/1.png')} 
                style={{ width: 50, height: 50 }} 
                />
                ),
        }}
        />
        <Stack.Screen 
          name="Cart" 
          component={CartScreen} 
          options={{
              headerTitle: () => (
                  <Image
                  source={require('../assets/logo/1.png')} 
                  style={{ width: 50, height: 50 }} 
                  />
                  ),
          }}
        />
      </Stack.Navigator>
      
    );
  };
  const ProfileStackScreen = ({navigation}) => {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options=  {{ 
          headerTitle: () => (
              <Image
              source={require('../assets/logo/1.png')} 
              style={{ width: 50, height: 50 }} 
              />
              ),
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
          }} 
        />
      
       
      <Stack.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
            headerTitle: () => (
                <Image
                source={require('../assets/logo/1.png')} 
                style={{ width: 50, height: 50 }} 
                />
                ),
        }}
        />
        
        <Stack.Screen 
          name="Cart" 
          component={CartScreen} 
          options={{
              headerTitle: () => (
                  <Image
                  source={require('../assets/logo/1.png')} 
                  style={{ width: 50, height: 50 }} 
                  />
                  ),
          }}
        />
         <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{
              headerTitle: () => (
                  <Image
                  source={require('../assets/logo/1.png')} 
                  style={{ width: 50, height: 50 }} 
                  />
                  ),
          }}
        />
        <Stack.Screen 
          name="Order" 
          component={OrderScreen} 
          options={{
              headerTitle: () => (
                  <Image
                  source={require('../assets/logo/1.png')} 
                  style={{ width: 50, height: 50 }} 
                  />
                  ),
          }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{
              headerTitle: () => (
                  <Image
                  source={require('../assets/logo/1.png')} 
                  style={{ width: 50, height: 50 }} 
                  />
                  ),
          }}
        />
      </Stack.Navigator>
      
      
    );
  };
export default MainTabNavigator;

ProfileStackScreen


