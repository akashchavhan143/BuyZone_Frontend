import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteProductAPI,
  getAllProductsBySellerId,
} from "../services/productService";
import { confirmToast } from "../utils/ConformToast";

const ViewSellerProducts = () => {
  const seller = JSON.parse(sessionStorage.getItem("active-seller"));
  const [allProducts, setAllProducts] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, [seller]);

  const getAllProducts = async () => {
    const allProducts = await getAllProductsBySellerId(seller.id);
    if (allProducts) {
      setAllProducts(allProducts.products);
    }
  };
  const deleteProduct = async (productId, e) => {
    const ok = await confirmToast("Delete this Product?");
    if (!ok) return; // user pressed “Cancel”
    try {
      const res = await deleteProductAPI(productId, seller.id);
      if (res.success) {
        toast.success(res.responseMessage, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getAllProducts();
      } else if (!res.success) {
        toast.error(res.responseMessage, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("It seems server is down", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const updateProduct = (product) => {
    navigate("/seller/product/update", { state: product });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header btn-cust text-center m-2"
          style={{
            borderRadius: "6px",
          }}
        >
          <h2>My Products</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color ">
              <thead className=" ">
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {allProducts.map((product) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={product.image1}
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.category.name}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <b>{product.price}</b>
                      </td>

                      <td>
                        <button
                          onClick={() => updateProduct(product)}
                          className="btn btn-sm btn-warning"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="btn btn-sm btn-danger mt-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSellerProducts;
