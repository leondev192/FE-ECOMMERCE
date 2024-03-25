import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Alert, TouchableOpacity,Image } from 'react-native';
import TextInput from '../components/Login';
import { login } from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      await AsyncStorage.setItem('token', token); 
      console.log('Login successful. Token:', token);
      
      navigation.navigate('Profile'); 
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerlogo}>
      <Image style={styles.imagelogo1} source={require('../assets/images/logologin.png')} />
      <Text style={styles.welcometop}>Welcome back</Text>
      <Text style={styles.welcomebottom}>sign in to access your account</Text>
      </View>

      <Text style={styles.title}>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Text style={styles.title}>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập  </Text>
      </TouchableOpacity>
      <View style={styles.register}>
        <Text>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerButton}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  containerlogo:{
    alignItems:'center',
  },
  imagelogo1:{
    alignItems:'center',
    width: 150.88,
    height: 208.2,
    marginTop: '5%',  
    marginBottom: '5%'
  },
  welcometop:{
    fontSize:40,
    fontWeight:'500'
  },
  welcomebottom:{
    fontSize:15,
    marginTop: 10,
    marginBottom: '10%'
  },
  title: {
    marginLeft: 5,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: 'rgba(189, 121, 56, 1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  register: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  registerButton: {
    color: 'rgba(189, 121, 56, 1)',
    marginLeft: 5,
  },
});

export default LoginScreen;
