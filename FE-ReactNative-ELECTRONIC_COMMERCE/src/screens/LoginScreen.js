// // src/screens/LoginScreen.js

// import React, { useState } from 'react';
// import { StyleSheet, View, Text, Button, Alert } from 'react-native';
// import TextInput from '../components/TextInput'; // Import TextInput component
// import { login } from '../services/auth';


// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const token = await login(email, password);
//       console.log('Login successful. Token:', token);
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   return (
//     <View>
//       <Text>Email:</Text>
//       <TextInput
//         value={email}
//         onChangeText={setEmail}
//         placeholder="Enter your email"
//         autoCapitalize="none"
//         keyboardType="email-address"
//       />
//       <Text>Password:</Text>
//       <TextInput
//         value={password}
//         onChangeText={setPassword}
//         placeholder="Enter your password"
//         secureTextEntry
//       />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// };



// export default LoginScreen;



import react from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function App() {
 
  const Boxes = () =>{
    

    return (
      <View style ={styles.boxes}>
        <View style ={styles.item1}>
          <Text>Login</Text>
        </View>

        <View style ={styles.item2}>
          <Text>Login</Text>
        </View>

        <View style ={styles.item3}>
          <Text>Login</Text>
        </View>

        <View style ={styles.item4}>
          <Text>Login</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
     
      <Boxes />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

    

    boxes: {
  backgroundColor: "yellow",
  width: '100%',
  height:'90%',
  padding: 5,
  flexDirection: 'row',
  

    },
    item1:{
      backgroundColor:'blue',
      width:'50%',
      height: '50%',
      marginRight:2.5
      
    },
    item2:{
      backgroundColor:'red',
      width:'50%',
      height: '50%',
      marginLeft: 2.5
    },
    item3:{
      backgroundColor:'blue',
      width:'50%',
      height: '50%',
      marginRight:2.5
      
    },
    item4:{
      backgroundColor:'red',
      width:'50%',
      height: '50%',
      marginLeft: 2.5
    }
});
