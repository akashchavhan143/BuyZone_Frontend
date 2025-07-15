import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchProductsAPI } from "../services/searchService";

const SearchBar = () => {
  const { categoryId } = useParams(); // To capture categoryId if provided in URL params
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [tempSearchText, setTempSearchText] = useState("");

  // Fetch products based on categoryId or searchText
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let response;

  //       // Debugging log
  //       console.log("categoryId:", categoryId);
  //       console.log("searchText:", searchText);

  //       if (!categoryId && !searchText) {
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

  //       // Log the API response for debugging
  //       console.log("API response:", response.data);

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
        const list = await searchProductsAPI(
          { categoryId, searchText },
          controller.signal
        ); // ← signal optional; add to service if you want abort
        setProducts(list);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Product fetch failed:", err);
        }
      }
    };

    load();
    return () => controller.abort();
  }, [categoryId, searchText]);
  // Handles search when user submits the form
  const searchProducts = (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    console.log("Search text submitted:", tempSearchText);
    setSearchText(tempSearchText); // Trigger the useEffect to fetch data based on the search text
  };

  return (
    <>
      {/* Search bar starts here */}
      <div className="col-sm-6 me-3">
        <form onSubmit={searchProducts}>
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              name="search"
              placeholder="Search for products here"
              onChange={(e) => setTempSearchText(e.target.value)} // Track the search text input
            />
            <button
              className="btn btn-success text-dark col-md-2"
              type="submit" // Ensure button type is "submit"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>

      {/* Display the products */}
      <div className="products-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <h5>{product.name}</h5>
              <p>Price: ₹{product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
      {/* Search bar ends here */}
    </>
  );
};

export default SearchBar;
