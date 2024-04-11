import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserData, logoutUser } from '../services/api/UserApiProfile';
import DefaultUserIcon from '../assets/images/avata-user.png';
import Order from '../screens/OrdersScreen';

const ProfileScreen = ({ navigation, route }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: '', avatarUrl: '' });

  const getUserData = async () => {
    try {
      const data = await fetchUserData();
      setUserData({ 
        id: data._id, 
        name: data.username, 
        avatarUrl: data.url
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUserData(); // Fetch user data when component mounts
  }, []);

  // Fetch user data again when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      setUserData({ name: '', avatarUrl: '' });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewTitle}>  
        <Text style={styles.viewNameTitle}>Tài khoản </Text>
      </View>
      <View style={styles.profileContainer}>
        {isLoggedIn && userData.name ? (
          <>
            <View style={styles.userInfo}>
              <Image 
                source={userData.avatarUrl ? { uri: userData.avatarUrl } : DefaultUserIcon} 
                style={styles.avatar} 
              />
              <Text style={styles.userName}>XIN CHAO: {userData.name}</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Order')}>
          <Text style={styles.logoutButtonText}>Đơn hàng của bạn</Text>
        </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Image source={DefaultUserIcon} style={styles.avatar} />
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
        )}
      </View>
      {isLoggedIn && (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10, 
    padding: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'rgba(189, 121, 56, 1)',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: 'rgba(189, 121, 56, 1)',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 10,
    margin: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewTitle: {
    backgroundColor: 'rgba(181, 139, 94, 1)',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 30,
  },
  viewNameTitle: {
    color: 'black',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default ProfileScreen;
