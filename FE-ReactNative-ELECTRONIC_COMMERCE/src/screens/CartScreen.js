// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,StyleSheet } from 'react-native';
import { fetchCategories } from '../services/api/CategoryApi';
import { fetchProducts } from '../services/api/ProductApi';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
   

    
    return (
        <View style={styles.container}>
        <View style={styles.viewTitle}>  
       <Text style={styles.viewNameTitle}>Giỏ hàng</Text>
       </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(245, 245, 245, 1)',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      width: '100%',
      height: '100%',
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
export default HomeScreen;
