import axiosInstance from "../utils/axiosInstance";
export const addToCartAPI = async (cartData) => {
  try {
    const response = await axiosInstance.post("/api/cart/add", cartData);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};
export const deleteCartApi = async (cartId, userId) => {
  try {
    /* Axios DELETE with body -> use { data: ... } */
    const { data } = await axiosInstance.delete("/api/cart/delete", {
      data: { id: cartId, userId },
    });
    return data; // resolved JSON from backend
  } catch (err) {
    // Standardise errors for caller
    if (err.response) {
      throw new Error(err.response.data?.responseMessage || "Delete failed");
    }
    throw new Error("Server unreachable. Please try later.");
  }
};
export const updateCartItem = async (cartId, quantity) => {
  try {
    const response = await axiosInstance.put(`/api/cart/update/${cartId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

export const retrieveCart = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/api/cart/fetch?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

export const increamnetCartApi = async (data) => {
  try {
    const response = await axiosInstance.put("/api/cart/update", data);
    return response.data;
  } catch (error) {
    console.error("Error incrementing cart item:", error);
    throw error;
  }
};
export const decrementCartApi = async (data) => {
  try {
    const response = await axiosInstance.put("/api/cart/update", data);
    return response.data;
  } catch (error) {
    console.error("Error decrementing cart item:", error);
    throw error;
  }
};

/**
 * Fetch cart items for a given userId
 * @param {number|string} userId
 * @param {string} jwt - Customer JWT token
 * @returns {Promise<Array>} array of cart items
 */
export const fetchCartByUser = async (userId) => {
  try {
    const { data } = await axiosInstance.get(
      `/api/cart/fetch?userId=${userId}`
    );
    return data.carts || [];
  } catch (err) {
    console.error("fetchCartByUser →", err);
    throw err; // let caller decide UI handling
  }
};
