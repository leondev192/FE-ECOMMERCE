import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, Text, StyleSheet, FlatList } from 'react-native';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api/ProductApi';
import Slider from '../../src/components/SliderHome';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Slider />
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={item => item._id}
          numColumns={2} // Hiển thị 2 sản phẩm trên mỗi hàng
        />
      </ScrollView>
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
});

export default HomeScreen;
