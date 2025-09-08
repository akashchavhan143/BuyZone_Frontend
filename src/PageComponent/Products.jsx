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
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  
  const placeholders = [
    "Search for shirts...",
    "Search for shoes...",
    "Search for electronics...",
    "Search for books...",
    "Search for anything..."
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [placeholders.length]);
  const searchProducts = (e) => {
    e.preventDefault();
    setSearchText(tempSearchText);
  };

  return (
    <div className="container-fluid px-3 px-md-4 mb-2">
      {/* Search Section */}
      <div className="row justify-content-center mt-3 mb-4">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <form className="d-flex gap-2" style={{maxWidth: '450px', margin: '0 auto'}}>
            <div className="position-relative flex-grow-1">
              <input
                type="text"
                className="form-control pe-5"
                placeholder={placeholders[placeholderIndex]}
                onChange={(e) => setTempSearchText(e.target.value)}
                onKeyUp={searchProducts}
                value={tempSearchText}
                style={{
                  borderRadius: '25px',
                  border: '2px solid #e0e0e0',
                  paddingLeft: '20px',
                  paddingRight: '50px',
                  height: '45px',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid #28a745';
                  e.target.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid #e0e0e0';
                  e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                }}
                required
              />
              <button
                type="submit"
                className="btn btn-success position-absolute"
                onClick={searchProducts}
                style={{
                  right: '5px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  borderRadius: '50%',
                  width: '35px',
                  height: '35px',
                  border: 'none',
                  background: 'linear-gradient(45deg, #28a745, #20c997)',
                  boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-50%) scale(1.1)';
                  e.target.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(-50%) scale(1)';
                  e.target.style.boxShadow = '0 2px 8px rgba(40, 167, 69, 0.3)';
                }}
              >
                <i className="fa-solid fa-magnifying-glass" style={{fontSize: '14px'}}></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Products Section */}
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          {products.length > 0 ? (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-md-4">
              {products.map((product) => {
                return <ProductCard item={product} key={product.id} />;
              })}
            </div>
          ) : (
            <div className="card">
              <div className="card-body text-center py-5">
                <h2 className="fw-bold text-muted">
                  SORRY, PRODUCTS NOT AVAILABLE!
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className="mt-5" />
    </div>
  );
};

export default Products;
