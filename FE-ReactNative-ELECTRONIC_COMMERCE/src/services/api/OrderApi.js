import { apiUrl } from '../../config/apiConfig';

export const fetchOrders = async (token) => {
  try {
    const response = await fetch(`${apiUrl}/order`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Failed to fetch orders');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch orders');
  }
};

export const fetchOrderStatus = async (token) => {
  try {
    const response = await fetch(`${apiUrl}/orderstatus/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Failed to fetch order status');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch order status');
  }
};
