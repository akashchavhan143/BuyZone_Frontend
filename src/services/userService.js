import axiosInstance from "../utils/axiosInstance";
export const getAllUserByRole = async (role) => {
  try {
    const response = await axiosInstance.get(
      `/api/user/fetch/role-wise?role=${role}`
    );
    return response.data; // { success: true/false, users: [] }
  } catch (error) {
    console.error("Error fetching users by role:", error);
    throw error; // Forward the error for caller to handle
  }
};

export const deleteSellerAByIdAPI = async (userId) => {
  const response = await axiosInstance.delete(
    `/api/user/delete/seller?sellerId=${userId}`
  );
  return response.data;
};

export const getAllDeliveryPersonsBySellerId = async (sellerId) => {
  const response = await axiosInstance.get(
    `/api/user/fetch/seller/delivery-person?sellerId=${sellerId}`
  );
  console.log(response.data);
  return response.data;
};

export const deleteDeliveryPersonAPI = async (userId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/user/delete/seller/delivery-person?deliveryId=${userId}`
    );
    return response.data; // { success: true/false, responseMessage: "" }
  } catch (error) {
    console.error("Error deleting delivery person:", error);
    throw error; // Forward the error for caller to handle
  }
};
