import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, Text, StyleSheet, FlatList } from 'react-native';
import PostCard from '../components/PostCard'; 
import { fetchPosts } from '../services/api/PostApi'; 

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={item => item._id}
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
