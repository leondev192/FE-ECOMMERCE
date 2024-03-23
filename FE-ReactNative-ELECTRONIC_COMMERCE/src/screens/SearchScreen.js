import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { searchProducts } from '../services/api/SearchApi';
import ProductCard from '../components/ResultProduct';
import SearchBar from '../components/SearchBar';

const SearchResultsScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [numColumns, setNumColumns] = useState(2); // Số cột hiển thị là 2

  const handleSearch = async (searchText) => {
    try {
      setIsLoading(true);
      const data = await searchProducts(searchText);
      if (data.length === 0) {
        Alert.alert('Không tìm thấy kết quả', 'Không tìm thấy sản phẩm nào với cụm từ tìm kiếm được cung cấp.');
      } else {
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Lỗi tìm nạp kết quả tìm kiếm:', error);
      Alert.alert('Lỗi', 'Không thể tìm thấy kết quả tìm kiếm. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
        
        <View style={styles.viewTitle}>  
       <Text style={styles.viewNameTitle}>Tìm kiếm sản phẩm </Text>
     
        </View>
      <SearchBar onSearch={handleSearch} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : searchResults.length === 0 ? (
        <Text style={styles.result}>No results found</Text>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
          keyExtractor={item => item._id}
          numColumns={numColumns} // Số cột được cập nhật thành 2
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
   
    alignItems: 'center',
  },
  result:{
    marginTop:0,
  },
  viewTitle: {
    backgroundColor: 'rgba(181, 139, 94, 1)',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 30,
  },
    viewNameTitle: {
    color: 'black',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default SearchResultsScreen;
