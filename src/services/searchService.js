import axiosInstance from "../utils/axiosInstance"; // shared instance with baseURL + JWT

/**
 * Universal product fetch helper.
 * - No filters → all products
 * - searchText only → search by name
 * - categoryId only → filter by category
 *
 * @param {Object} opts
 * @param {string|number} [opts.categoryId]
 * @param {string}         [opts.searchText]
 * @returns {Promise<Array>} products
 */
export const searchProductsAPI = async ({ categoryId, searchText } = {}) => {
  let url = "/api/product/fetch/all";
  const params = {};

  if (searchText?.trim()) {
    url = "/api/product/search";
    params.productName = searchText.trim();
  } else if (categoryId) {
    url = "/api/product/fetch/category-wise";
    params.categoryId = categoryId;
  }

  const { data } = await axiosInstance.get(url, { params });
  return data.products; // caller gets just the list
};
