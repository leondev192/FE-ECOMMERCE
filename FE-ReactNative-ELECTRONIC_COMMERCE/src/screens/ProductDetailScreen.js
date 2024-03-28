import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchProducts } from '../services/api/ProductApi';
import { addToCart } from '../services/api/AddToCartApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductHomeAll from '../components/ProductHomeAll';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const handleAddToCart = async () => {
    console.log('Product ID:', product._id);
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        await addToCart(product._id, token, quantity);
        Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng');
      } else {
        Alert.alert('Thông báo', 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      if (error.message === 'jwt expired') {
        Alert.alert('Phiên hết hạn', 'Vui lòng đăng nhập lại');
      } else {
        Alert.alert('Thông báo', 'Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng');
      }
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>
        <View style={styles.paddingText}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}><Text style={styles.textfirst}>Giá:</Text> {product.price}đ</Text>
          <Text style={styles.price}><Text style={styles.textfirst}>Số lượng:</Text> {product.quantity} sản phẩm</Text>
          <Text style={styles.description}><Text style={styles.textfirst}>Mô tả: </Text>{product.description}</Text>
        </View>
        <View style={styles.quantityContainer}>
          
        <View style={styles.quantityContent}>
          <Text>Nhập số lượng: </Text>
            <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
              <Ionicons name="remove" size={20} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={quantity.toString()}
              onChangeText={text => setQuantity(parseInt(text) || 1)}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
              <Ionicons name="add" size={20} color="black" />
            </TouchableOpacity>
          </View>
          </View>
          <View style={styles.buttonAddToCart}>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.ViewAllProuct}>
          <Text style={styles.allProduct}>Sản phẩm liên quan</Text>
        </View>

        <ScrollView horizontal={true} ref={scrollViewRef}>
          {products.map(item => (
            <ProductHomeAll key={item._id} product={item} navigation={navigation} />
          ))}
        </ScrollView>

       
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(245, 245, 245, 1)',
  },
  paddingText: {
    padding: 15
  },
  buttonAddToCart:{
    alignItems:'center',
  },
  content: {
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 400,
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
    width: '100%',
    borderRadius: 50,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'rgba(170, 129, 84, 1)',
    width: '90%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  textfirst: {
    fontWeight: 'bold',
    color: 'rgba(165, 89, 16, 1)',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
    width: 100,
  },
  quantityContainer: {
    
    alignItems: 'center',
  },
  quantityContent:{
    alignItems:'center',
    flexDirection: 'row',
  },
  quantityButton: {
    paddingHorizontal: 10,
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

export default ProductDetailScreen;
