// src/services/api/ProductApi.js
import { apiUrl } from '../../config/apiConfig'; // Import `apiUrl` từ file riêng

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${apiUrl}/product`); // Sử dụng `apiUrl` trực tiếp
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || 'failed to fetch products');
        }
    } catch (error) {
        throw new Error(error.message || 'failed to fetch products');
    }
}
