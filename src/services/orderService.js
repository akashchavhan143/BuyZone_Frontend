import axiosInstance from "../utils/axiosInstance";

/**
 * POST /api/order/add
 * @param {number|string} userId
 * @returns {{success:boolean,responseMessage:string}}
 */
export const createOrder = async (userId) => {
  try {
    const { data } = await axiosInstance.post(
      `/api/order/add?userId==${userId}`
    );
    return data; // { success, responseMessage, ... }
  } catch (err) {
    console.error("createOrder →", err);
    return {
      success: false,
      responseMessage: err.response?.data?.responseMessage || "Server error",
    };
  }
};

export const retrieveAllorders = async () => {
  const response = await axiosInstance.get("/api/order/fetch/all");
  console.log(response.data);
  return response.data;
};

export const retrieveOrdersById = async (orderId) => {
  const response = await axiosInstance.get(
    `/api/order/fetch?orderId=${orderId}`
  );
  console.log(response.data);
  return response.data;
};

export const retrieveAllordersForDeliveryPerson = async (deliveryPersonId) => {
  const response = await axiosInstance.get(
    "/api/order/fetch/delivery-wise?deliveryPersonId=" + deliveryPersonId
  );
  console.log(response.data);
  return response.data;
};

export const retrieveAllDeliveryStatus = async () => {
  const response = await axiosInstance.get(
    "/api/order/fetch/delivery-status/all"
  );
  console.log(response.data);
  return response.data;
};

export const retrieveAllDeliveryTiming = async () => {
  const response = await axiosInstance.get(
    "/api/order/fetch/delivery-time/all"
  );
  console.log(response.data);
  return response.data;
};

export const getOrderByUserId = async (userId) => {
  const response = await axiosInstance.get(
    "http://localhost:8080/api/order/fetch/user-wise?userId=" + userId
  );
  console.log(response.data);
  return response.data;
};

export const getALLSellerOrders = async (sellerId) => {
  const response = await axiosInstance.get(
    "/api/order/fetch/seller-wise?sellerId=" + sellerId
  );
  console.log(response.data);
  return response.data;
};

/**
 * PUT /api/order/assign/delivery-person
 * @param {number|string} orderId
 * @param {number|string} deliveryId
 * @returns {{success:boolean,responseMessage:string,orders?:Array}}
 */
export const assignOrderToDeliveryPerson = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/order/assign/delivery-person",
      payload
    );
    return response.data; // { success, responseMessage, orders? }
  } catch (err) {
    console.error("assignOrderToDelivery →", err);
    return {
      success: false,
      responseMessage: err.response?.data?.responseMessage || "Server error",
    };
  }
};

//update order status

export const updateOrderStatusAPI = async () => {
  try {
  } catch (error) {}
};
/**
 * Updates the delivery status of an order
 * @param {Object} updateRequest - { orderId, newStatus, ... }
 * @param {string} jwtToken
 * @returns {Promise<Object>}
 */
export const updateOrderDeliveryStatusAPI = async (updateRequest) => {
  try {
    const response = await axiosInstance.put(
      "/api/order/update/delivery-status",
      updateRequest
    );
    return response.data; // expected: { success, responseMessage }
  } catch (error) {
    console.error("updateOrderDeliveryStatus →", error);
    return {
      success: false,
      responseMessage:
        error.response?.data?.responseMessage || "Something went wrong",
    };
  }
};
