import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import OrderItem from '../components/OrderItem';
import NoOrderText from '../components/NoOrderText';

const OrderScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const checkLoginStatus = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (token) {
            setIsLoggedIn(true);
            await Promise.all([fetchOrders(token), fetchOrderStatus(token)]);
          } else {
            setIsLoggedIn(false);
            setOrders([]);
            setOrderStatus([]);
          }
        } catch (error) {
          console.error('Error checking login status:', error);
        }
      };
      checkLoginStatus();
    }, [])
  );

  const fetchOrders = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/api/order', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchOrderStatus = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/api/orderstatus/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setOrderStatus(data);
    } catch (error) {
      console.error('Error fetching order status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewTitle}>  
        <Text style={styles.viewNameTitle}>Đơn hàng đã đặt</Text>
      </View>
      <View style={styles.ordersContainer}>
        {orders.length === 0 ? (
          <NoOrderText />
        ) : (
          <FlatList
            data={orders}
            renderItem={({ item }) => <OrderItem order={item} orderStatus={orderStatus} />}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ordersContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
    
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

export default OrderScreen;
