import { useState, useEffect } from "react";

import React from "react";
import { retrieveAllProducts } from "../services/productService";

const ViewAllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await retrieveAllProducts();
      if (allProducts) {
        setAllProducts(allProducts.products);
      }
    };

    getAllProducts();
  }, []);

  return (
    <div className="mt-3">
      <div
        className="card ms-2 me-2 mb-5  shadow-lg"
        style={{
          height: "60rem",
        }}
      >
        <div
          className="card-header text-center btn-cust mx-3 mt-2"
          style={{ borderRadius: "5px" }}
        >
          <h2 className="">All PRODUCTS</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover ">
              <thead className="">
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col" className="text-center">
                    Description
                  </th>
                  <th scope="col">Category</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Seller</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {allProducts.map((product) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            
                            product.image1
                          }
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
                      <td>{product.seller.firstName}</td>
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

export default ViewAllProducts;
