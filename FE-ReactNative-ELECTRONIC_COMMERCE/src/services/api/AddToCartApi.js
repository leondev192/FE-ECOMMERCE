// src/services/api/AddToCartApi.js

import { apiUrl } from '../../config/apiConfig';



export const addToCart = async (productId, token, quantity) => { // Thêm tham số quantity vào hàm
    try {
        const response = await fetch(`${apiUrl}/cartdetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ product: productId, quantity }), // Gửi số lượng sản phẩm cùng với ID của sản phẩm
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || 'Failed to add product to cart');
        }
    } catch (error) {
        throw new Error(error.message || 'Failed to add product to cart');
    }
};

