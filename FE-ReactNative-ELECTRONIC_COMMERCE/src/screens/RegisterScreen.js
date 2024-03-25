import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import TextInput from '../components/Login';
import { signup } from '../services/api/auth';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Mật khẩu không khớp");
      }

      const message = await signup(username, email, password);
      Alert.alert('Thành công', message);
      navigation.navigate('Login'); // Navigate to login screen after successful signup
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.containerwelcom}>
     
      <Text style={styles.welcometop}>Get Started</Text>
      <Text style={styles.welcomebottom}>by creating a free account.</Text>
      </View>

      <Text style={styles.title}>Tên người dùng:</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Nhập tên người dùng của bạn"
      />
      <Text style={styles.title}>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Nhập địa chỉ email của bạn"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Text style={styles.title}>Mật khẩu:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Nhập mật khẩu của bạn"
        secureTextEntry
      />
      <Text style={styles.title}>Xác nhận mật khẩu:</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Nhập lại mật khẩu của bạn"
        secureTextEntry
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleSignup}>
        <Text style={styles.registerButtonText}>Đăng ký</Text>
      </TouchableOpacity>
      <View style={styles.login}>
        <Text>Đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.LoginButton}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:'10%',
    flex: 1,
    padding: 10,
  },
  containerwelcom: {
   alignItems:'center',
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
  registerButton: {
    backgroundColor: 'rgba(189, 121, 56, 1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop:10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  login: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  LoginButton:{
    color: 'rgba(189, 121, 56, 1)',
    marginLeft: 5,
  }
});

export default RegisterScreen;
