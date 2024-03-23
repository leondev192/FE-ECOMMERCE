import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';


const PostCardHome = ({ post,navigation }) => {
  const handlePress = () => {
    navigation.navigate('PostDetail', { post: post });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <Text numberOfLines={1} style={styles.postTitle}>{post.title}</Text>
      
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    borderWidth: 0.2,
    borderColor: 'rgba(189, 121, 56, 1)',
    borderRadius: 10,
    width: 320,
  },
  postImage: {
    width: 300,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  postContent: {
    fontSize: 14,
  },
});

export default PostCardHome;
