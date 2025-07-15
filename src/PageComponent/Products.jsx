import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../ProductComponent/ProductCard";
import { fetchProducts } from "../services/productService";

const Products = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [tempSearchText, setTempSearchText] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let response;

  //       if (categoryId == null && searchText === "") {
  //         // Fetch all products
  //         response = await axios.get(
  //           `http://localhost:8080/api/product/fetch/all`
  //         );
  //       } else if (searchText) {
  //         // Fetch products by name
  //         response = await axios.get(
  //           `http://localhost:8080/api/product/search?productName=${searchText}`
  //         );
  //       } else {
  //         // Fetch products by category
  //         response = await axios.get(
  //           `http://localhost:8080/api/product/fetch/category-wise?categoryId=${categoryId}`
  //         );
  //       }
  //       if (response.data) {
  //         setProducts(response.data.products);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [categoryId, searchText]);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const list = await fetchProducts({ categoryId, searchText });
        setProducts(list);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Product fetch failed:", err);
          // show toast or fallback UI here
        }
      } finally {
        if (!controller.signal.aborted);
      }
    };

    load();

    return () => controller.abort(); // cancel if component unmounts
  }, [categoryId, searchText]);
  const searchProducts = (e) => {
    e.preventDefault();
    setSearchText(tempSearchText);
  };

  return (
    <div className="container-fluid mb-2">
      <div className="d-flex aligns-items-center justify-content-center mt-3">
        <form class="row g-3">
          <div class="col-auto">
            <input
              type="text"
              className="form-control"
              id="inputPassword2"
              placeholder="Enter Product Name..."
              onChange={(e) => setTempSearchText(e.target.value)}
              onKeyUp={searchProducts}
              style={{
                width: "350px",
              }}
              value={tempSearchText}
              required
            />
          </div>
          <div class="col-auto">
            <button
              type="submit"
              className="btn btn-success border mb-3"
              onClick={searchProducts}
            >
              <i class="fa-solid fa-magnifying-glass"></i> Search
            </button>
          </div>
        </form>
      </div>

      <div className="container-fluid mt-2 mb-5">
        {products.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 ">
            {products.map((product) => {
              return <ProductCard item={product} key={product.id} />;
            })}
          </div>
        ) : (
          <div className="card btn-cust">
            <h1 className="m-5 text-center  p-5 fw-bold text-shadow">
              SORRY, PRODUCTS NOT AVAILABLE!
            </h1>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Products;
