import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ProductHomeAll from '../components/ProductHomeAll';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api/ProductApi';
import Slider from '../components/SliderHome';
import { Ionicons } from '@expo/vector-icons';
import { fetchCategories } from '../services/api/CategoryApi';
import PostCard from '../components/PostCardHome'; 
import { fetchPosts } from '../services/api/PostApi'; 
import PostCardHome from '../components/PostCardHome';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  
  const [scrollOffset, setScrollOffset] = useState(0);
  const [categories, setCategories] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [posts, setPosts] = useState([]);
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

  useEffect(() => {
    fetchPosts()
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setScrollOffset(offsetX);
  };

  const scrollToPrevious = () => {
    if (scrollOffset > 0) {
      scrollViewRef.current.scrollTo({ x: scrollOffset - 200, animated: true });
    }
  };

  const scrollToNext = () => {
    if (scrollOffset < (products.length - 1) * 200) {
      scrollViewRef.current.scrollTo({ x: scrollOffset + 200, animated: true });
    }
  };
  const scrollToPreviousNew = () => {
    if (scrollOffset > 0) {
      scrollViewRefForPosts.current.scrollTo({ x: scrollOffset - 200, animated: true });
    }
  };
  
  const scrollToNextNew = () => {
    if (scrollOffset < (posts.length - 1) * 200) {
      scrollViewRefForPosts.current.scrollTo({ x: scrollOffset + 200, animated: true });
    }
  };
  

  const renderProduct = ({ item }) => <ProductHomeAll product={item} />;

  const scrollViewRef = React.useRef();
  const scrollViewRefForPosts = React.useRef();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Slider />
        <View style={styles.ViewAllProuct}>
          <Text style={styles.allProduct}>Tất cả sản phẩm</Text>
        </View>

        <ScrollView horizontal={true} ref={scrollViewRef} onScroll={handleScroll}>
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductHomeAll product={item} navigation={navigation} />}
            keyExtractor={item => item._id}
            
           
            horizontal={true}
          />
        </ScrollView>

        <TouchableOpacity style={styles.buttonLeft} onPress={scrollToPrevious}>
          <Ionicons name="arrow-back-sharp" size={15} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRight} onPress={scrollToNext}>
          <Ionicons name="arrow-forward" size={15} color="black" />
        </TouchableOpacity>

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
      </ScrollView>
        <View style={styles.ViewAllProuct}>  
      <Text style={styles.allProduct}>Tin Tức</Text>
      </View>
      <ScrollView horizontal={true} ref={scrollViewRefForPosts} onScroll={handleScroll}>
  {posts.length > 0 ? (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostCard post={item} navigation={navigation} />}
      keyExtractor={item => item._id}
      horizontal
    />
  ) : (
    <Text>No posts available</Text>
  )}
</ScrollView>


        <TouchableOpacity style={styles.buttonLeftNew} onPress={scrollToPreviousNew}>
          <Ionicons name="arrow-back-sharp" size={15} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRightNew} onPress={scrollToNextNew}>
          <Ionicons name="arrow-forward" size={15} color="black" />
        </TouchableOpacity>
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
    position: 'relative',
  },
  buttonLeft: {
    position: 'absolute',
    top: '10.3%',
    left: 0,
    transform: [{ translateY: -25 }],
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    
  },
  buttonRight: {
    position: 'absolute',
    top: '10.3%',
    right: 0,
    transform: [{ translateY: -25 }],
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    
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


  buttonLeftNew: {
    position: 'absolute',
    bottom: '2.6%',
    left: 0,
    transform: [{ translateY: -25 }],
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    
  },
  buttonRightNew: {
    position: 'absolute',
    bottom: '2.6%',
    right: 0,
    transform: [{ translateY: -25 }],
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,},
  
});

export default HomeScreen;
