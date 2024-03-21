import { apiUrl } from '../../config/apiConfig';

export const fetchPosts = async () => {
    try {
        const response = await fetch(`${apiUrl}/post`); // Fetch tin tức từ đường dẫn `/post`
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || 'failed to fetch posts');
        }
    } catch (error) {
        throw new Error(error.message || 'failed to fetch posts');
    }
}
