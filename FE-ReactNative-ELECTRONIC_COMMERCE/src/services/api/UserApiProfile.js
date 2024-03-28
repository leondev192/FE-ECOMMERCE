// src/services/api/UserApiProfile.js
import { apiUrl } from '../../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUserData = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await fetch(`${apiUrl}/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || 'Failed to fetch user data');
      }
    } else {
      throw new Error('Token not found');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch user data');
  }
}

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    throw new Error('Error logging out');
  }
}
