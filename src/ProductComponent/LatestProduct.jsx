import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { retrieveAllProducts } from "../services/productService";

const LatestProduct = () => {
  const [products, setProducts] = useState([]);

  const fetchLastProductsInReverse = async () => {
    try {
      const response = await retrieveAllProducts();

      // Log response to see its structure
      console.log("API Response:", response);

      // Assuming the product list is stored in response.data.products (modify as necessary)
      const allProducts = response.products || []; // Adjust this path as per your actual response structure

      // If there are fewer than 10 products, just use whatever is available
      const lastProductsInReverse = allProducts.slice(-10).reverse();
      setProducts(lastProductsInReverse);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchLastProductsInReverse();
  }, []);

  return (
    <>
      {/* Start Latest Product Section */}
      <div className="container-fluid ">
        <div className="col-md-12 card mt-3 py-3 btn-cust mb-5">
          <span className="text-center fs-4 fw-bold">LATEST PRODUCTS</span>
          <div className="row mt-3 m-1">
            <div
              className="d-flex flex-row"
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
                scrollbarWidth: "none",
              }}
            >
              {products.map((product, index) => (
                <div
                  className="col my-3 mx-3"
                  key={index}
                  style={{ flex: "0 0 auto" }}
                >
                  <Link
                    to={`/product/${product.id}/category/${product.category.id}`}
                    className="text-decoration-none text-dark"
                  >
                    <div
                      className="card card-sh hover-effect overflow-hidden"
                      style={{
                        width: "220px",
                        height: "310px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="p-1"
                        style={{
                          width: "210px",
                          height: "210px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="card-body text-center">
                          <img
                            src={
                              product.image1 ||
                              "https://via.placeholder.com/150"
                            }
                            alt={product.name}
                            style={{ maxWidth: "210px", maxHeight: "210px" }}
                          />
                        </div>
                      </div>
                      <span className="text-center fw-bold mt-2">
                        {product.name}
                      </span>
                      <span className="fs-5 fw-medium">₹{product.price}</span>
                      <div className="mb-3 text-center">
                        <s className="fs-6 fw-light">
                          ₹{(product.price * (1 / 0.9)).toFixed(0)}
                        </s>
                        <span className="text-success"> 10% Off</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {products.length === 0 && (
            <div className="text-center mt-4">
              <h4>No Products Available</h4>
            </div>
          )}
        </div>
      </div>
      {/* End Latest Product Section */}
    </>
  );
};

export default LatestProduct;
