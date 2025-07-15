import axiosInstance from "../utils/axiosInstance";

export const addReviewAPI = async (data) => {
  try {
    const response = await axiosInstance.post("/api/product/review/add", data);
    return response.data; // { success: true/false, responseMessage: "" }
  } catch (error) {
    console.error("Error adding review:", error);
    throw error; // Forward the error for caller to handle
  }
};
export const getReviewsByProductId = async (productId) => {
  try {
    const response = await axiosInstance.get(
      `/api/product/review/fetch?productId=${productId}`
    );
    return response.data; // { success: true/false, reviews: [] }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error; // Forward the error for caller to handle
  }
};
