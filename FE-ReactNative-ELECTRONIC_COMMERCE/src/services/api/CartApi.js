import { apiUrl } from '../../config/apiConfig';
import { Alert } from 'react-native';

export const fetchCartDetails = async (token) => {
    try {
        const response = await fetch(`${apiUrl}/cartdetails`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            // Trả về thông tin sản phẩm trong giỏ hàng
            return data;
        } else {
            throw new Error(data.message || 'Failed to fetch cart details');
        }
    } catch (error) {
        if (error.message.includes('jwt expired')) {
            Alert.alert('Phiên hết hạn', 'Vui lòng đăng nhập lại');
        } else {
            Alert.alert('Error', error.message || 'Failed to fetch cart details');
        }
        throw error;
    }
};

export const updateCartItemQuantity = async (productId, quantity, token) => {
    try {
        const response = await fetch(`${apiUrl}/cartdetails/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity }),
        });
        const data = await response.json();
        if (response.ok) {
            // Trả về thông tin sản phẩm đã được cập nhật
            return data;
        } else {
            throw new Error(data.message || 'Failed to update cart item quantity');
        }
    } catch (error) {
        Alert.alert('Error', error.message || 'Failed to update cart item quantity');
        throw error;
    }
};

export const removeCartItem = async (productId, token) => {
    try {
        const response = await fetch(`${apiUrl}/cartdetails/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            // Trả về thông tin sản phẩm đã xoá
            return data;
        } else {
            throw new Error(data.message || 'Failed to remove cart item');
        }
    } catch (error) {
        Alert.alert('Error', error.message || 'Failed to remove cart item');
        throw error;
    }
};

export const fetchProductDetails = async (productId) => {
    try {
        const response = await fetch(`${apiUrl}/product/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || 'Failed to fetch product details');
        }
    } catch (error) {
        Alert.alert('Error', error.message || 'Failed to fetch product details');
        throw error;
    }
};
