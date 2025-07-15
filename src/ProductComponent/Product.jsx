import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import GetProductReviews from "../ReviewComponent/GetProductReviews";
import ProductCarousel from "./ProductCarousel";
import {
  getProductById,
  getProductsByCategoryId,
} from "../services/productService";
import { addToCartAPI } from "../services/cartService";

const Product = () => {
  const { productId, categoryId } = useParams();

  let navigate = useNavigate();
  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  const [quantity, setQuantity] = useState("1");

  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({
    seller: {
      firstName: "",
    },
  });

  useEffect(() => {
    getProduct();
    getProductsByCategory();
  }, [productId]);

  const getProduct = async () => {
    const retrievedProduct = await getProductById(productId);

    setProduct(retrievedProduct.products[0]);
  };

  const getProductsByCategory = async () => {
    const allProducts = await getProductsByCategoryId(categoryId);
    if (allProducts) {
      setProducts(allProducts.products);
    }
  };

  const saveProductToCart = async (userId) => {
    try {
      const payload = {
        quantity: quantity,
        userId: userId,
        productId: product.id,
      };
      console.log("Payload for cart:", payload);
      const response = await addToCartAPI(payload);

      if (response.success) {
        toast.success(response.responseMessage, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/customer/cart");
        }, 2000); // Redirect after 2 seconds
      } else {
        toast.error(response.responseMessage, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("It seems the server is down!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload(true);
      }, 2000); // Redirect after 2 seconds
    }
  };

  const addToCart = (e) => {
    e.preventDefault();
    if (user == null) {
      toast.error("Please login to buy the products !");
    } else if (product.quantity < 1) {
      toast.error("Product Out Of Stock !", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    } else {
      saveProductToCart(user.id);
      setQuantity("");
    }
  };

  const navigateToAddReviewPage = () => {
    navigate("/product/" + product.id + "/review/add", { state: product });
  };

  const sellerProductPage = () => {
    console.log(product.seller.firstName);
    navigate(
      `/product/seller/${product.seller.id}/${product.seller.firstName}`,
      {
        state: product.seller,
      }
    );
  };

  return (
    <div className="container-fluid   mb-3 ">
      {/* view single product and rating */}
      <div className="row mt-2 btn-cust  ">
        <div className="col-md-6 border border-4 border-white border-end-0 ">
          <div className="card-img ">
            <ProductCarousel
              item={{
                image1: product.image1,
                image2: product.image2,
                image3: product.image3,
              }}
            />
          </div>
        </div>

        <div
          className="col-md-6 card-body bg-light text-dark "
          style={{
            height: "540px",
            overflowY: "scroll",
            scrollbarWidth: "none",
            borderTop: "5px solid #4e3a75",
            borderRight: "5px solid #4e3a75",
          }}
        >
          <div className="card-body   p-3">
            {/* Product Title */}
            <p className="fs-2 fw-bold">{product.name}</p>
            {/* Product Description */}
            <p>
              <span className="fw-bold">Description: </span>
              {product.description}
            </p>
            {/* Product Status and Category */}
            <p>
              <span className="fw-bold">Product Details:</span> <br />
              <span>Status: </span>
              {product.quantity > 0 ? (
                <span className="badge bg-success">Available</span>
              ) : (
                <span className="badge bg-danger">Out of Stock</span>
              )}
              <br />
              <span>Policy: 7 Days Replacement and Return</span>
            </p>

            {/* Product Pricing */}
            <p className="fs-5 fw-bold">
              <span className="fs-4 fw-medium">Price: ₹{product.price}</span>{" "}
              <s className="fs-6 fw-light">₹{product.price}</s>{" "}
              <span className="text-success">0% Off</span>
            </p>

            {/* Features */}
            <div className="row mt-5  p-2">
              <div className="col-sm-4 text-success text-center">
                <i className="fa-solid fa-money-bill-wave fa-2x"></i>
                <p>Cash On Delivery</p>
              </div>
              <div className="col-sm-4 text-center text-danger">
                <i className="fa-solid fa-rotate-left fa-2x"></i>
                <p>Return Available</p>
              </div>
              <div className="col-sm-4 text-center text-primary">
                <i className="fa-solid fa-truck fa-2x"></i>
                <p>Free Shipping</p>
              </div>
            </div>

            {/* Add to Cart / Out of Stock Buttons */}
            <div className="row mt-4 p-1">
              {product.quantity > 0 ? (
                user ? (
                  <>
                    <div className="d-flex justify-content-between">
                      <div>
                        <form className="row " onSubmit={addToCart}>
                          <div class="col-auto">
                            <input
                              type="number"
                              className="form-control"
                              id="addToCart"
                              placeholder="Enter Quantity..."
                              onChange={(e) => setQuantity(e.target.value)}
                              value={quantity}
                              required
                            />
                          </div>
                          <div className="col-auto">
                            <input
                              type="submit"
                              className="btn  btn-cust mb-3"
                              value="ADD TO CART"
                            />
                            <ToastContainer />
                          </div>
                        </form>
                      </div>
                      <Link
                        to="/customer/cart"
                        className="btn btn-success col ms-md-4 me-md-4 mb-3"
                      >
                        GO TO CART
                      </Link>
                    </div>
                  </>
                ) : (
                  <Link
                    to="/user/login"
                    className="btn btn-cust col-10 mx-auto"
                  >
                    ADD TO CART
                  </Link>
                )
              ) : (
                <Link to="#" className="btn btn-danger col-md-12">
                  OUT OF STOCK
                </Link>
              )}
            </div>

            <p className=" ">
              {(() => {
                if (product.quantity < 10) {
                  return (
                    <b className="text-danger"> {product.quantity} left only</b>
                  );
                }
              })()}
            </p>
            <br />
            <div className="card-footer custom-bg mt-3">
              <div className="d-flex justify-content-left mt-5">
                <b
                  className=" btn btn-outline-primary"
                  onClick={sellerProductPage}
                >
                  view more from seller: {product.seller.firstName + " "}
                </b>

                <p className="card-text ms-md-5" style={{ color: "#4e3a75" }}>
                  contact seller: {product.seller.emailId + " "}
                </p>
              </div>

              <div className="row p-4 bg-light shadow-sm rounded align-items-center mt-5">
                {/* Rating & Reviews Section */}
                <div className="col-12 col-md-6 d-flex align-items-center">
                  <h4 className="text-success">
                    <i className="fa-solid fa-star me-2"></i> Rating & Reviews
                  </h4>
                </div>

                {/* Add Review Button */}
                <div className="col-12 col-md-6 d-flex justify-content-end">
                  {user ? (
                    <button
                      className="btn btn-outline-success btn-md"
                      onClick={navigateToAddReviewPage}
                    >
                      <i className="fa-solid fa-pen me-2"></i> Add Review
                    </button>
                  ) : (
                    <Link
                      className="btn btn-outline-success btn-md"
                      to="/user/login"
                    >
                      <i className="fa-solid fa-pen me-2"></i> Add Review
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="col mt-2  ">
              <GetProductReviews />
            </div>
          </div>
        </div>
        <div />
      </div>
      {/* view single product end here */}

      {/* related products */}
      <div className="row mt-2 ">
        <div className="col-md-12">
          <hr />
          <h2 className="mb-3 text-center fw-bold ">RELATED PRODUCTS</h2>
          <hr />
          <div className="row row-cols-1 row-cols-sm-3 row-cols-md-4  g-4">
            {products.map((product, index) => {
              return <ProductCard item={product} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
