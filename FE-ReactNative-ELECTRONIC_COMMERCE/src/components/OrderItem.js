import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderItem = ({ order, orderStatus }) => {
  // Tìm trạng thái đơn hàng dựa trên ID
  const status = orderStatus.find((status) => status._id === order.orderstatus);

  return (
    <View style={styles.orderItem}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mã đơn hàng:</Text>
        <Text style={styles.valueText}>{order._id}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Trạng thái đơn hàng:</Text>
        <Text style={styles.value}>{status ? status.name : 'Unknown'}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Tổng số tiền:</Text>
        <Text style={styles.value}>{order.subtotal} VND</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Địa chỉ giao hàng:</Text>
        <Text style={styles.value}>{order.address} </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Số điện thoại giao hàng:</Text>
        <Text style={styles.value}>{order.phonenumber} </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Ngày đặt hàng:</Text>
        <Text style={styles.value}>{new Date(order.createdAt).toLocaleString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    borderWidth: 0.2,
    borderColor: 'rgba(181, 139, 94, 1)',
    borderRadius: 20,
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerText: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  valueText: {
    fontSize: 16,
  },
  info: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    fontSize: 16,
  },
});

export default OrderItem;
