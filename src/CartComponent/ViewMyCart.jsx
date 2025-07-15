import { useState, useEffect } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  decrementCartApi,
  deleteCartApi,
  increamnetCartApi,
  retrieveCart,
} from "../services/cartService";

const ViewMyCart = () => {
  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  const [carts, setCarts] = useState([]);
  const [cartAmount, setCartAmount] = useState("0.0");

  const [productCart, setProductCart] = useState({});

  let navigate = useNavigate();

  useEffect(() => {
    getAllCart();
  }, []);

  const getAllCart = async () => {
    const allCart = await retrieveCart(user.id);
    if (allCart) {
      setCarts(allCart.carts);

      if (allCart.totalCartAmount) {
        setCartAmount(allCart.totalCartAmount);
      }
    }
  };
  const deleteCart = async (cartId) => {
    try {
      const res = await deleteCartApi(cartId, user.id);

      const notifier = res.success ? toast.success : toast.error;
      notifier(res.responseMessage, { autoClose: 1000 });
      getAllCart();
    } catch (error) {
      toast.error(error.message, { autoClose: 1000 });
    } finally {
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  const incrementCart = async (cart, e) => {
    const data = { id: cart.id, userId: user.id, quantity: cart.quantity + 1 };
    try {
      const res = await increamnetCartApi(data);
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
        getAllCart();
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

  const decrementCart = (cart, e) => {
    const data = { id: cart.id, userId: user.id, quantity: cart.quantity - 1 };
    try {
      const res = decrementCartApi(data);
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
        getAllCart();
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
    // if (cart.quantity <= 1) {
    //   deleteCart(cart.id);
    // }
  };

  const checkout = (e) => {
    e.preventDefault();

    if (carts === null || carts.length < 1) {
      toast.error("No Products In Cart To Order!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }
    navigate("/customer/order/payment", {
      state: { priceToPay: cartAmount },
    });
  };
  // const totalOrderPrice = 1000;
  const totalItems = carts.length;
  return (
    <>
      {/* new cart start here */}
      <div className="container-fluid mt-2 mb-5 ">
        <div className="row ">
          <div
            className="mx-auto mt-2 col-md-8 "
            style={{
              height: "600px",
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
          >
            <div className="mb-1 mt-2 p-2 col-md-12 btn-cust rounded">
              <div className="text-center">
                <h5 className="fw-bold text-white">CART ITEMS</h5>
              </div>
            </div>

            {carts.length === 0 ? (
              <div style={{ height: "250px" }} className="text-center card">
                <br />
                <br />
                <br />
                <h2 className="text-center text-danger text-shadow fw-bold">
                  Your cart is empty, please add some products!
                </h2>
                <br />
                <Link
                  to="/products"
                  className="btn btn-dark mt-4 col-5 mx-auto"
                >
                  Go To Products
                </Link>
                <br />
              </div>
            ) : (
              carts.map((cart) => (
                <div
                  className="mb-1 mt-2 col-md-12 border border-success card"
                  key={cart.id}
                >
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={cart.product.image1}
                        className="img-fluid rounded-start"
                        alt="cartimg"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{cart.product.name}</h5>
                        <span className="card-text text-truncate-3-lines">
                          <small className="text-body-secondary">
                            {cart.product.description}
                          </small>
                        </span>
                        <br />
                        <span className="card-text fs-5">
                          <span className="fs-5 fw-medium">
                            Price: ₹{cart.product.price}
                          </span>{" "}
                          <s className="fs-6 fw-light">₹{cart.product.price}</s>{" "}
                          <span className="text-success">0 % Off</span>
                          <br />
                          <span className="fs-5 fw-bold">
                            Total Price: ₹{cart.product.price * cart.quantity}
                          </span>
                        </span>
                        <div className="container">
                          <button
                            className="btn btn-danger btn-sm col-md-1"
                            onClick={() => decrementCart(cart)}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>{" "}
                          <span className="btn btn-secondary btn-sm col-md-1 fw-bold">
                            {cart.quantity}
                          </span>{" "}
                          <button
                            className="btn btn-success btn-sm col-md-1"
                            onClick={() => incrementCart(cart)}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>{" "}
                          <button
                            className="btn btn-danger m-2 ms-6 btn-sm"
                            onClick={() => deleteCart(cart.id)}
                          >
                            <i className="fa-solid fa-trash-arrow-up"></i>{" "}
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {carts.length > 0 && (
            <div
              className="card card-sh mt-3  col-md-3 mx-auto "
              style={{ height: "450px" }}
            >
              <table className="table table-borderless ">
                <tbody>
                  <tr>
                    <td colSpan="2">
                      <small className="text-center fs-5">PRICE DETAILS</small>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colSpan="2">
                      Total item
                    </th>
                    <td>{totalItems}</td>
                  </tr>
                  <tr>
                    <th scope="row" colSpan="2">
                      Total Price ({totalItems} items)
                    </th>
                    <td> &#8377; {cartAmount}/-</td>
                  </tr>
                  <tr>
                    <th scope="row" colSpan="2">
                      Delivery charge
                    </th>
                    <td>₹ 0</td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colSpan="2">
                      Total Amount
                    </th>
                    <td> &#8377; {cartAmount}/-</td>
                  </tr>
                </tbody>
              </table>
              <Link
                className="btn btn-warning btn-md fw-bold mt-auto mb-4 col-md-12 text-center"
                href="/user/orders"
                onClick={checkout}
              >
                <i className="fa-solid fa-bag-shopping fa-1.5x"></i> PLACE ORDER
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* end cart start here */}
    </>
  );
};

export default ViewMyCart;
