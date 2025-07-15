import axiosInstance from "../utils/axiosInstance";
/**
 * POST /api/product/add
 * @param {FormData} formData – already built in the component
 * @returns {{success:boolean,responseMessage:string}}
 */
export const addProductAPI = async (formData) => {
  try {
    const { data } = await axiosInstance.post("/api/product/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data; // { success, responseMessage, ... }
  } catch (err) {
    console.error("addProduct →", err);
    return {
      success: false,
      responseMessage: err.response?.data?.responseMessage || "Server error",
    };
  }
};
export const retrieveAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/api/product/fetch/all");
    return response.data; // { success: true/false, responseMessage: "", products: [] }
  } catch (error) {
    console.error("Error retrieving all products:", error);
    throw error; // Forward the error for caller to handle
  }
};

export const getAllProductsBySellerId = async (sellerId) => {
  try {
    const response = await axiosInstance.get(
      `/api/product/fetch/seller-wise?sellerId=${sellerId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Forward the error for caller to handle
  }
};

export const deleteProductAPI = async (productId, sellerId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/product/delete?productId=${productId}&sellerId=${sellerId}`
    );
    return response.data; // { success: true/false, responseMessage: "" }
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error; // Forward the error for caller to handle
  }
};

/**
 * PUT /product/update/detail
 * @param {object} productDto – fields to update
 * @returns JSON response { success, responseMessage, … }
 */
export const updateProductAPI = async (productDto) => {
  const response = await axiosInstance.put(
    "/api/product/update/detail",
    productDto
  );
  return response.data;
};

/**
 * PUT /product/update/image
 * @param {FormData} formData – already prepared in the component
 * @returns {{success:boolean,responseMessage:string,data?:any}}
 */
export const updateProductImages = async (formData) => {
  try {
    const response = await axiosInstance.put(
      "/api/product/update/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; // { success, responseMessage, ... }
  } catch (err) {
    console.error("updateProductImages →", err);
    // Return a uniform error shape so callers can handle it cleanly
    return {
      success: false,
      responseMessage: err.response?.data?.responseMessage || "Server error",
    };
  }
};

/**
 * Get all products for a seller.
 * @param {number} sellerId
 * @returns {Promise<Array>} list of products
 */
export const getSellerProducts = async (sellerId) => {
  const { data } = await axiosInstance.get("/api/product/fetch/seller-wise", {
    params: { sellerId },
  });
  return data.products; // assumes { products: [...] }
};

/**
 * Get products for a seller filtered by category.
 * @param {number} sellerId
 * @param {number} categoryId
 * @returns {Promise<Array>}
 */
export const getSellerProductsByCategory = async (sellerId, categoryId) => {
  const { data } = await axiosInstance.get(
    "/api/product/fetch/seller-wise/category-wise",
    { params: { sellerId, categoryId } }
  );
  return data.products;
};

export const getProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(
      `/api/product/fetch?productId=${productId}`
    );
    return response.data; // { success, responseMessage, product: {} }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error; // Forward the error for caller to handle
  }
};

export const getProductsByCategoryId = async (categoryId) => {
  try {
    const response = await axiosInstance.get(
      `/api/product/fetch/category-wise?categoryId=${categoryId}`
    );
    return response.data; // { success, responseMessage, products: [] }
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error; // Forward the error for caller to handle
  }
};

/**
 * Fetch products for the storefront.
 * - If nothing is passed ➜ all products.
 * - If only searchText ➜ search by name.
 * - If only categoryId ➜ filter by category.
 *
 * @param {{ categoryId?: number|string, searchText?: string }} opts
 * @returns {Promise<Array>} products
 */
export const fetchProducts = async ({
  categoryId = null,
  searchText = "",
} = {}) => {
  let url = "/api/product/fetch/all";
  const params = {};

  if (searchText.trim()) {
    url = "/api/product/search";
    params.productName = searchText.trim();
  } else if (categoryId) {
    url = "/api/product/fetch/category-wise";
    params.categoryId = categoryId;
  }

  try {
    const { data } = await axiosInstance.get(url, { params });
    return data.products; // ← only return what caller needs
  } catch (err) {
    console.error("fetchProducts →", err);
    throw err; // let component decide how to UI-handle
  }
};
