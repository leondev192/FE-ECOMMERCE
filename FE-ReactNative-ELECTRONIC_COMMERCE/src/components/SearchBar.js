// components/SearchBar.js

import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import PropTypes from 'deprecated-react-native-prop-types';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation(); // Use useNavigation hook

  const handleSearch = () => {
    // Do something with the search text, for example navigate to a search results screen
    navigation.navigate('SearchResults', { searchText });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchText}
        onChangeText={text => setSearchText(text)}
        onSubmitEditing={handleSearch}
      />
      <Ionicons name="search" size={24} color="#000" style={styles.searchIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    width:'170%',
    marginLeft:20,
  },
  searchIcon: {},
  input: {
    flex: 1,
  },
});

export default SearchBar;
