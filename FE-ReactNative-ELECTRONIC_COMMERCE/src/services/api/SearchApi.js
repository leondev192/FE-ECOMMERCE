import { apiUrl } from '../../config/apiConfig';

export const searchProducts = async (searchTerm) => {
    const url = `${apiUrl}/search/products?name=${encodeURIComponent(searchTerm)}`;
    try {
        const response = await fetch(url);
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
