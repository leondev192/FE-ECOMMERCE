// PostDetailScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView,TouchableOpacity,FlatList } from 'react-native';
import PostCard from '../components/PostCardHome'; 
import { fetchPosts } from '../services/api/PostApi'; 
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
const PostDetailScreen = ({ route,navigation }) => {
  const { post } = route.params;
  const [posts, setPosts] = useState([]);
  const [scrollOffset, setScrollOffset] = useState(0);
  
  useEffect(() => {
    fetchPosts()
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setScrollOffset(offsetX);
  };

 
  const scrollViewRefForPosts = React.useRef();
  return (
    <ScrollView>
    <View style={styles.container}>
        <View style={styles.content}>
      <Image source={{ uri: post.image }} style={styles.image} />
      </View>
      <Text style={styles.createdAt}>{post.createdAt}</Text>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.introduction}>{post.introduction}đ</Text>
      <Text style={styles.body}>{post.body}</Text>
      <Text style={styles.conclusion}>{post.conclusion}</Text>

    </View>
    <View style={styles.viewTitle}>  
      <Text style={styles.viewNameTitle}>Những tin bạn chưa biết?</Text>
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

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content:{
    justifyContent:'center',
    alignItems:'center',

  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
    fontSize: 20,
  },
  introduction: {
    
    marginTop: 5,
    fontSize: 16,
  },
  body: {
    marginTop: 10,
    fontSize: 16,
  },
  conclusion:{
     marginTop: 10,
    fontSize:16,
  },
  createdAt:{
    color: 'rgba(130, 130, 130, 1)',
    fontSize: 12,
    marginTop: 10,
  },

  buttonLeftNew: {
    position: 'absolute',
    bottom: '10%',
    left: 0,
    transform: [{ translateY: -25 }],
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    
  },
  buttonRightNew: {
    position: 'absolute',
    bottom: '10%',
    right: 0,
    transform: [{ translateY: -25 }],
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,},

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

export default PostDetailScreen;
