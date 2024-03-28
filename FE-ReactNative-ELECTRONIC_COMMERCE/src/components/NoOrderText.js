import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoOrderText = () => {
  return (
    <Text style={styles.noOrderText}>Bạn chưa có đơn hàng nào</Text>
  );
};

const styles = StyleSheet.create({
  noOrderText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default NoOrderText;
