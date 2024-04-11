import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import PostCard from '../components/PostCardHome'; 
import { fetchPosts } from '../services/api/PostApi'; 

const PostDetailScreen = ({ route, navigation }) => {
  const { post } = route.params;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const renderPostCard = ({ item }) => (
    <PostCard post={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.content}>
              <Image source={{ uri: post.image }} style={styles.image} />
            </View>
            <View style={styles.view}>
            <Text style={styles.createdAt}>{post.createdAt}</Text>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.introduction}>{post.introduction}</Text>
            <Text style={styles.body}>{post.body}</Text>
            <Text style={styles.conclusion}>{post.conclusion}</Text>
            </View>
          </>
        }
        ListFooterComponent={
          <>
            <View style={styles.viewTitle}>
              <Text style={styles.viewNameTitle}>Những tin bạn chưa biết?</Text>
            </View>
            <FlatList
              horizontal
              data={posts}
              renderItem={renderPostCard}
              keyExtractor={item => item._id}
            />
          </>
        }
        data={[]}
        renderItem={() => null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
    
  },
  view:{
    padding:10,
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
  conclusion: {
    marginTop: 10,
    fontSize: 16,
  },
  createdAt: {
    color: 'rgba(130, 130, 130, 1)',
    fontSize: 12,
    marginTop: 10,
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
