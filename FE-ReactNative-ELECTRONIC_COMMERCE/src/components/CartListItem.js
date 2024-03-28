import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { fetchProductDetails } from '../services/api/CartApi';

const CartListItem = ({ item, handleRemoveItem, handleIncreaseQuantity, handleDecreaseQuantity }) => {
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const details = await fetchProductDetails(item.product);
                setProductDetails(details);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchDetails();
    }, [item.product]);

    const totalPrice = productDetails ? productDetails.price * item.quantity : 0;

    const increaseQuantity = () => {
        handleIncreaseQuantity(item._id, item.product);
    };

    const decreaseQuantity = () => {
        if (item.quantity > 1) {
            handleDecreaseQuantity(item._id, item.product);
        } else {
            Alert.alert('Thông báo', 'Số lượng tối thiểu là 1');
        }
    };

    return (
        <View style={styles.Container}>
            <View style={styles.itemContainer}>
                {productDetails ? (
                    <>
                        <Image source={{ uri: productDetails.image }} style={styles.productImage} />
                        <View style={styles.productDetails}>
                            <Text style={styles.productName}>{productDetails.name}</Text>
                            <Text style={styles.productPrice}>Giá: {productDetails.price * item.quantity} VND</Text>
                        </View>
                    </>
                ) : (
                    <Text>Loading...</Text>
                )}
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={decreaseQuantity}>
                        <Text style={styles.quantity}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantitynumber}>{item.quantity}</Text>
                    <TouchableOpacity onPress={increaseQuantity}>
                        <Text style={styles.quantity}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item._id)}>
                    <Text style={styles.removeButtonText}>Xoá</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Container:{
        paddingLeft:10,
        paddingRight:10,
        marginTop:5
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius:20,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
    },
    quantity:{
        fontSize:30,
    },
    quantitynumber:{
        fontSize:20,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        width:70,
        marginRight:30,

    },
    removeButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    removeButtonText: {
        color: '#fff',
    },
});

export default CartListItem;