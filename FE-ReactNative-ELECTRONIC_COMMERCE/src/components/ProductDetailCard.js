import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';


const ProductDetailCard = ({ product, scrollToPrevious, scrollToNext }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}><Text style={styles.textfirst}>Giá:</Text> {product.price}đ</Text>
        <Text style={styles.price}><Text style={styles.textfirst}>Số lượng:</Text> {product.quantity} sản phẩm</Text>
        <Text style={styles.description}><Text style={styles.textfirst}>Mô tả: </Text>{product.description}</Text>
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng')}>
            <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ViewAllProuct}>
          <Text style={styles.allProduct}>Sản phẩm liên quan</Text>
        </View>
       
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor:'rgba(245, 245, 245, 1)',
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: 370,
    height: 350,
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 20,
  },
  price: {
    marginTop: 5,
    fontSize: 16,
  },
  description: {
    marginTop: 10,
    width:'100%',
    borderRadius: 50,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'rgba(170, 129, 84, 1)',
    width: 160,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  textfirst:{
    fontWeight: 'bold',
    color: 'green',
  },
  ViewAllProuct: {
    backgroundColor: 'rgba(181, 139, 94, 1)',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 30,
  },
  allProduct: {
    color: 'black',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default ProductDetailCard;
