// src/services/authService.js
import api from "../utils/axiosInstance";

/**
 * Login user
 * @param {Object} payload  { emailId, password, role }
 * @returns {Object}        { success, jwtToken, user, responseMessage }
 * @throws  Error object    (forwarded so the caller can handle toast, etc.)
 */
export const login = async (payload) => {
  try {
    const response = await api.post("/api/user/login", payload);
    console.log("payload:", payload);
    console.log("Login successful:", response);
    return response.data; // successful JSON response
  } catch (err) {
    /* Re‑shape the error if you like: */
    if (err.response) {
      // Server responded with 4xx/5xx
      throw new Error(err.response.data?.responseMessage || "Login failed");
    } else if (err.request) {
      // Request sent but no response (network issue, CORS, server down)
      throw new Error("No response from server. Please try again.");
    } else {
      // Something else (coding error, bad payload, etc.)
      throw new Error(err.message);
    }
  }
};

export const addAdminAPI = async (payload) => {
  try {
    const response = await api.post("/api/user/admin/register", payload);
    console.log("Admin registration successful:", response);
    return response.data; // { success, responseMessage }
  } catch (error) {
    console.error("Error in addAdminAPI:", error);
    throw error; // Forward the error for caller to handle
  }
};

export const addUserAPI = async (payload) => {
  try {
    const response = await api.post("/api/user/register", payload);
    console.log("User registration successful:", response);
    return response.data; // { success, responseMessage }
  } catch (error) {
    console.error("Error in addUserAPI:", error);
    throw error; // Forward the error for caller to handle
  }
};
