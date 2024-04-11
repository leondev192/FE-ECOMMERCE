import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCartDetails, updateCartItemQuantity, removeCartItem } from '../services/api/CartApi';
import CartListItem from '../components/CartListItem';
import OrderForm from '../components/OrderForm'; // Import OrderForm component

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const [token, setToken] = useState(null);
    const [showPlaceOrderButton, setShowPlaceOrderButton] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [address, setAddress] = useState(''); // Thêm state để lưu địa chỉ
    const [phonenumber, setPhoneNumber] = useState(''); // Thêm state để lưu số điện thoại
    const [isModalVisible, setIsModalVisible] = useState(false); // Thêm state để điều khiển modal

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const cartItemsResponse = await fetchCartDetails(token);
                    if (cartItemsResponse && cartItemsResponse.length > 0) {
                        setCartItems(cartItemsResponse);
                        setShowPlaceOrderButton(true);
                    } else {
                        setCartItems([]);
                        setShowPlaceOrderButton(false);
                    }
                } else {
                    Alert.alert('Thông báo', 'Vui lòng đăng nhập để xem giỏ hàng.');
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin giỏ hàng:', error);
            }
        };

        fetchCartItems();
    }, [refreshing]); 
    
    const handleRemoveItem = async (cartDetailId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                await removeCartItem(cartDetailId, token);
                const updatedCartItems = cartItems.filter(item => item._id !== cartDetailId);
                setCartItems(updatedCartItems);
                if (updatedCartItems.length === 0) {
                    setShowPlaceOrderButton(false);
                }
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

    const handlePlaceOrderPress = () => {
        setIsModalVisible(true);
    };
    
    
   // Trong component CartScreen.js
   const placeOrder = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const response = await fetch('http://localhost:3000/api/order/placeOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    cartItems,
                    address,
                    phonenumber,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Thông báo', 'Đặt hàng thành công!');
                setRefreshing(!refreshing);
                
            } else {
                throw new Error(data.message || 'Đặt hàng thất bại');
            }
        } else {
            Alert.alert('Thông báo', 'Vui lòng đăng nhập để đặt hàng.');
        }
    } catch (error) {
        console.error('Lỗi khi đặt hàng:', error);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đặt hàng.');
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
                    refreshing={refreshing}
                    onRefresh={() => setRefreshing(true)}
                />
            ) : (
                <Text style={styles.emptyCartText}>Không có sản phẩm trong giỏ hàng.</Text>
            )}
            {showPlaceOrderButton && (
                <View > 
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handlePlaceOrderPress} style={styles.placeOrderButton}>
                        <Text style={styles.placeOrderButtonText}>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>
                </View>
            )}
            {/* Modal nhập thông tin địa chỉ và số điện thoại */}
       <OrderForm
    isVisible={isModalVisible}
    onClose={() => setIsModalVisible(false)}
    onSubmit={(data) => {
        setAddress(data.address);
        setPhoneNumber(data.phonenumber);
        setIsModalVisible(false);
        placeOrder(); // Gọi hàm placeOrder sau khi cập nhật dữ liệu
    }}
    cartItems={cartItems} // Truyền cartItems vào OrderForm
/>

        </View>
    );
};

const styles = StyleSheet.create({
    view1:{
        alignItems:'center',
    },
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
    buttonContainer: {
        padding: 10,
    },
    placeOrderButton: {
        backgroundColor: 'rgba(189, 121, 56, 1)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    placeOrderButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CartScreen;
