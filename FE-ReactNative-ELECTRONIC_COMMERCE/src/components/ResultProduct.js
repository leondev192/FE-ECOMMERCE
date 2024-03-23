import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ProductCard = ({ product, navigation }) => {
    const handlePress = () => {
      navigation.navigate('ProductDetail', { product: product });
    };
  
    return (
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <Text numberOfLines={1} style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}.VND</Text>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng')}>
          <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    borderWidth: 0.2,
    borderColor: 'rgba(189, 121, 56, 1)',
    borderRadius: 10,
    width: 170,
    height: 250, // Tăng chiều cao để hiển thị đúng
  },
  productImage: {
    width: 150,
    height: 150, // Đặt lại kích thước hình ảnh để không bị méo
    marginBottom: 10,
    borderRadius: 10,
  },
  productName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 9,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'rgba(170, 129, 84, 1)',
    width: 150, // Đặt lại chiều rộng của nút để phù hợp với kích thước sản phẩm
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  }
});

export default ProductCard;
