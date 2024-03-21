// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchCategories } from '../services/api/CategoryApi';
import { fetchProducts } from '../services/api/ProductApi';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

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

    const renderProduct = ({ item }) => <ProductCard product={item} />;

    return (
        <View>
            {categories.map(category => (
                <View key={category._id}>
                    <Text>{category.name}</Text>
                    <FlatList
                        data={products.filter(product => product.category === category._id)}
                        renderItem={renderProduct}
                        keyExtractor={item => item._id}
                        horizontal
                    />
                </View>
            ))}
        </View>
    );
};



export default HomeScreen;
