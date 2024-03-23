import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView ,FlatList} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import ProductHomeAll from '../components/ProductHomeAll';
import { fetchProducts } from '../services/api/ProductApi';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  const [products, setProducts] = useState([]);
  
  const [scrollOffset, setScrollOffset] = useState(0);

  
  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
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

  

  const renderProduct = ({ item }) => <ProductHomeAll product={item} />;

  const scrollViewRef = React.useRef();

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
        <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng')}>
          <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.ViewAllProuct}>
          <Text style={styles.allProduct}>Sản phẩm liên quan</Text>
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
        </View>
        </ScrollView>
     
     
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
    backgroundColor:'rgba(245, 245, 245, 1)',
  },
  paddingText:{
    padding: 15
  },
  content: {
    alignItems: 'center',
    marginTop:10,
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
    
    width:'100%',
    borderRadius: 50,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'rgba(170, 129, 84, 1)',
    width: 150,
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
    color: 'rgba(165, 89, 16, 1)',
  },
  buttonLeft: {
    position: 'absolute',
    bottom: '10%',
    left: 0,
    transform: [{ translateY: -25 }],
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    
  },
  buttonRight: {
    position: 'absolute',
    bottom: '10%',
    right: 0,
    transform: [{ translateY: -25 }],
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    
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
