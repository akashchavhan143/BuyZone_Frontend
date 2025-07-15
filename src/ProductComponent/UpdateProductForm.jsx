import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProductCarousel from "./ProductCarousel";
import { getAllCategoryAPI } from "../services/categoryService";
import {
  updateProductAPI,
  updateProductImages,
} from "../services/productService";

const UpdateProductForm = () => {
  const location = useLocation();
  const product = location.state;
  const [categories, setCategories] = useState([]);

  const seller = JSON.parse(sessionStorage.getItem("active-seller"));

  let navigate = useNavigate();

  const getAllCategories = async () => {
    const resCategory = await getAllCategoryAPI();
    if (resCategory) {
      setCategories(resCategory.categories);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  const [selectedImage1, setSelectImage1] = useState(null);
  const [selectedImage2, setSelectImage2] = useState(null);
  const [selectedImage3, setSelectImage3] = useState(null);

  const [updatedProduct, setUpdatedProduct] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    categoryId: product.categoryId,
    sellerId: product.sellerId,
  });

  const handleInput = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!seller) {
      toast.error("Seller Id is missing!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      const res = await updateProductAPI(updatedProduct);

      if (res.success) {
        toast.success(res.responseMessage || "Updated Succesfully", {
          position: "top-center",
          autoClose: 1000,
        });
      } else {
        toast.error(res.responseMessage || "something went wrong", {
          position: "top-center",
          autoClose: 1000,
        });
      }
      // soft redirect after toast
      navigate("/seller/product/all");
    } catch (err) {
      console.error("Product update failed:", err);
      toast.error("Server error. Try again later.", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };
  const handleUpdateImages = async (e) => {
    e.preventDefault();
    if (!seller) {
      toast.error("Seller Id is missing!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    const formData = new FormData();
    if (selectedImage1) formData.append("image1", selectedImage1);
    if (selectedImage2) formData.append("image2", selectedImage2);
    if (selectedImage3) formData.append("image3", selectedImage3);
    formData.append("id", product.id);
    try {
      const res = await updateProductImages(formData);
      toast[res.success ? "success" : "error"](res.responseMessage, {
        position: "top-center",
        autoClose: 1000,
      });
      setTimeout(() => navigate("/seller/product/all"), 1000);
    } catch (err) {
      console.error("Image update failed:", err);
      toast.error("Server error. Try again later.", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="container-fluid">
      <div class="row mb-5">
        <div class="col-md-3 mt-2">
          <div class="card form-card shadow-lg custom-bg card-img">
            <ProductCarousel
              item={{
                image1: product.image1,
                image2: product.image2,
                image3: product.image3,
              }}
            />
          </div>
        </div>
        <div className="col-md-6 mt-2">
          <div className="card  shadow-lg ">
            <div className="container-fluid">
              <div
                className="card-header btn-cust mt-2 text-center"
                style={{
                  borderRadius: "5px",
                }}
              >
                <h5 className="card-title">Update Product Details</h5>
              </div>
              <div className="card-body text-color">
                <form className="row g-3">
                  <div className="col-md-6 mb-3">
                    <label for="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="name"
                      onChange={handleInput}
                      value={updatedProduct.name}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label for="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      onChange={handleInput}
                      value={updatedProduct.description}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Category</label>

                    <select
                      name="categoryId"
                      onChange={handleInput}
                      className="form-control"
                    >
                      <option value="">Select Category</option>

                      {categories.map((category) => {
                        return (
                          <option value={category.id}> {category.name} </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="quantity" class="form-label">
                      Stock
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      onChange={handleInput}
                      value={updatedProduct.quantity}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="price" class="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      onChange={handleInput}
                      value={updatedProduct.price}
                    />
                  </div>

                  <div className="d-flex aligns-items-center justify-content-center mb-2">
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={handleUpdateProduct}
                    >
                      Update Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mt-2">
          <div className="card form-card custom-bg shadow-lg">
            <div className="container-fluid">
              <div
                className="card-header btn-cust mt-2 text-center"
                style={{
                  borderRadius: "5px",
                }}
              >
                <h5 className="card-title">Update Product Image</h5>
              </div>
              <div className="card-body text-color">
                <form className="row">
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      image1
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      name="image1"
                      onChange={(e) => setSelectImage1(e.target.files[0])}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Image2
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      name="image2"
                      onChange={(e) => setSelectImage2(e.target.files[0])}
                    />
                  </div>

                  <div className="mb-3">
                    <label for="formFile" className="form-label">
                      Image2
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      name="image3"
                      onChange={(e) => setSelectImage3(e.target.files[0])}
                    />
                  </div>

                  <div className="d-flex aligns-items-center justify-content-center mb-2">
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={handleUpdateImages}
                    >
                      Update Image
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductForm;
