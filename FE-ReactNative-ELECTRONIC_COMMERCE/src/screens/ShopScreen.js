import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, Text } from 'react-native';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api/ProductApi';
import { fetchCategories } from '../services/api/CategoryApi';

const ShopScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <View style={styles.container}>
       <ScrollView>

{categories.map(category => (
  <View key={category._id}>
    <View style={styles.ViewAllProuct}>
      <Text style={styles.allProduct}>{category.name}</Text>
    </View>
    <FlatList
      data={products.filter(product => product.category === category._id)}
      renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
      keyExtractor={item => item._id}
      numColumns={numColumns}
    />

  </View>
))}
      <View style={styles.ViewAllProuct}>
        <Text style={styles.allProduct}>Tất cả sản phẩm</Text>
      </View>
      <FlatList
      
        data={products}
        renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
        keyExtractor={item => item._id}
        numColumns={2}
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
  ViewAllProuct: {
    backgroundColor: 'rgba(181, 139, 94, 1)',
    marginTop: 10,
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

export default ShopScreen;
