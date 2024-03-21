import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'deprecated-react-native-prop-types';

const PostCard = ({ post }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <Text style={styles.postTitle}>{post.title}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
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

export default PostCard;
