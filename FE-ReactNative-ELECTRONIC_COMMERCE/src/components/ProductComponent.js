import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const ProductComponent = ({ product }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}.VND</Text>
    </View>
  );
};

ProductComponent.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
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
  productImage: {
    width: 150,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
  productName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 9,
  },
});

export default ProductComponent;
