export const fetchUser = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Bạn có thể thêm các headers khác nếu cần thiết
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || 'failed to fetch user');
      }
    } catch (error) {
      throw new Error(error.message || 'failed to fetch user');
    }
  };
  