import axios from "axios";

const baseURL = "https://buyzone-backend.onrender.com/v1";

//const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080/v1";
const axiosInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

/* ─── REQUEST: add JWT token if saved ───────────────────────────── */
axiosInstance.interceptors.request.use((config) => {
  // look for any token saved for any role
  const token =
    sessionStorage.getItem("admin-jwtToken") ||
    sessionStorage.getItem("customer-jwtToken") ||
    sessionStorage.getItem("seller-jwtToken") ||
    sessionStorage.getItem("delivery-jwtToken");

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ─── RESPONSE: global error catch (optional) ───────────────────── */
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    // Example: logout on 401
    if (err.response?.status === 401) {
      sessionStorage.clear();
      window.location = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
