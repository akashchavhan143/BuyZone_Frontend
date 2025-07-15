import axiosInstance from "../utils/axiosInstance";
export const addCategoryAPI = async (data) => {
  try {
    const response = await axiosInstance.post("/api/category/add", data);
    return response.data; // { success: true/false, responseMessage: "" }
  } catch (error) {
    console.error("Error adding category:", error);
    throw error; // Forward the error for caller to handle
  }
};
export const retrieveAllCategories = async () => {
  const response = await axiosInstance.get(
    "/api/category/fetch/all?start=0&count=12"
  );
  return response.data;
};
export const getAllCategoryAPI = async () => {
  const response = await axiosInstance.get("/api/category/fetch/all");
  console.log(response.data);
  return response.data;
};

export const deleteCategoryAPI = async (categoryId) => {
  const { data } = await axiosInstance.delete(
    `/api/category/delete?categoryId=${categoryId}`
  );

  return data; // { success: true/false, responseMessage: "" }
};

export const updateCategoryAPI = async (data) => {
  try {
    const response = await axiosInstance.put(`/api/category/update`, data);
    return response.data; // { success: true/false, responseMessage: "" }
  } catch (error) {
    console.error("Error updating category:", error);
    throw error; // Forward the error for caller to handle
  }
};
