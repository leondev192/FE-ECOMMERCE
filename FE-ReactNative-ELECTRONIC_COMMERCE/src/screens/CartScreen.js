import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCartDetails, updateCartItemQuantity, removeCartItem } from '../services/api/CartApi';
import CartListItem from '../components/CartListItem';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const cartItemsResponse = await fetchCartDetails(token);
                    if (cartItemsResponse && cartItemsResponse.length > 0) {
                        setCartItems(cartItemsResponse);
                    } else {
                        Alert.alert('Thông báo', 'Không có sản phẩm trong giỏ hàng.');
                    }
                } else {
                    Alert.alert('Thông báo', 'Vui lòng đăng nhập để xem giỏ hàng.');
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin giỏ hàng:', error);
            }
        };

        fetchCartItems();
    }, []);

    const handleRemoveItem = async (cartDetailId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                await removeCartItem(cartDetailId, token);
                const updatedCartItems = cartItems.filter(item => item._id !== cartDetailId);
                setCartItems(updatedCartItems);
            } else {
                Alert.alert('Thông báo', 'Vui lòng đăng nhập để xóa sản phẩm khỏi giỏ hàng.');
            }
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xóa sản phẩm khỏi giỏ hàng.');
        }
    };

    const handleIncreaseQuantity = async (cartDetailId, productId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const updatedItem = await updateCartItemQuantity(cartDetailId, 1, token);
                const updatedCartItems = cartItems.map(item => {
                    if (item._id === cartDetailId) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
                setCartItems(updatedCartItems);
            } else {
                Alert.alert('Thông báo', 'Vui lòng đăng nhập để cập nhật giỏ hàng.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật số lượng sản phẩm:', error);
        }
    };
    
    const handleDecreaseQuantity = async (cartDetailId, productId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const updatedItem = await updateCartItemQuantity(cartDetailId, -1, token);
                const updatedCartItems = cartItems.map(item => {
                    if (item._id === cartDetailId) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                });
                setCartItems(updatedCartItems);
            } else {
                Alert.alert('Thông báo', 'Vui lòng đăng nhập để cập nhật giỏ hàng.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật số lượng sản phẩm:', error);
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.viewTitle}>
                <Text style={styles.viewNameTitle}>Giỏ hàng</Text>
            </View>
            {cartItems.length > 0 ? (
                <FlatList
                    data={cartItems}
                    renderItem={({ item }) => (
                        <CartListItem
                            item={item}
                            handleDecreaseQuantity={handleDecreaseQuantity}
                            handleIncreaseQuantity={handleIncreaseQuantity}
                            handleRemoveItem={handleRemoveItem}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text style={styles.emptyCartText}>Không có sản phẩm trong giỏ hàng.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(245, 245, 245, 1)',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    viewTitle: {
        backgroundColor: 'rgba(181, 139, 94, 1)',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
    },
    viewNameTitle: {
        color: 'black',
        fontWeight: '600',
        fontSize: 15,
    },
    emptyCartText: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CartScreen;
