import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../ProductComponent/ProductCard";
import { useLocation } from "react-router-dom";
import {
  getSellerProducts,
  getSellerProductsByCategory,
} from "../services/productService";

const SellerProducts = () => {
  const location = useLocation();
  const seller = location.state;

  const { categoryId, categoryName, sellerName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, [seller, categoryId]);

  const fetchData = async () => {
    try {
      const list =
        categoryId == null
          ? await getSellerProducts(seller.id)
          : await getSellerProductsByCategory(seller.id, categoryId);

      setProducts(list);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
  return (
    <div className="container-fluid mb-2">
      {/* <Carousel /> */}

      <div
        className="bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
        style={{
          borderRadius: "1em",
          height: "38px",
        }}
      >
        <h5 class="card-title ms-3">Seller Name: {sellerName}</h5>
      </div>

      <div className="col-md-12 mt-3">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products.map((product) => {
            return <ProductCard item={product} key={product.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;
