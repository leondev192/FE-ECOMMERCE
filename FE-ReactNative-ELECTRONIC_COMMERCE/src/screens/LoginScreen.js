import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import TextInput from '../components/Login';
import { login } from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      await AsyncStorage.setItem('token', token); // Save token to AsyncStorage
      console.log('Login successful. Token:', token);
      // Navigate to other screen upon successful login
      navigation.navigate('Profile'); // Change 'Profile' to your desired screen name
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default LoginScreen;
