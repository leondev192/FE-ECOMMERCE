// src/services/api/ProductApi.js
import { apiUrl } from '../../config/apiConfig';

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${apiUrl}/category`);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || 'Failed to fetch categories');
        }
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch categories');
    }
}