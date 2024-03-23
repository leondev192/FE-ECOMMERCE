import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, Text, StyleSheet, FlatList } from 'react-native';
import PostCard from '../components/PostCard'; 
import { fetchPosts } from '../services/api/PostApi'; 

const BlogScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <View style={styles.container}>
       <View style={styles.viewTitle}>  
      <Text style={styles.viewNameTitle}>Tin Tức</Text>
      </View>
      <ScrollView>
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostCard post={item} navigation={navigation} />}
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
  viewTitle: {
    backgroundColor: 'rgba(181, 139, 94, 1)',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 30,
  },
    viewNameTitle: {
    color: 'black',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default BlogScreen;
