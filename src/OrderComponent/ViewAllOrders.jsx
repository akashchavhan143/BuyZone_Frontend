import { useState, useEffect } from "react";
import React from "react";
import {
  retrieveAllorders,
  retrieveOrdersById,
} from "../services/orderService";

const ViewAllOrders = () => {
  const [orders, setOrders] = useState([]);

  const [orderId, setOrderId] = useState("");
  const [tempOrderId, setTempOrderId] = useState("");

  useEffect(() => {
    const getAllOrders = async () => {
      let allOrders;
      if (orderId) {
        allOrders = await retrieveOrdersById(orderId);
      } else {
        allOrders = await retrieveAllorders();
      }

      if (allOrders) {
        setOrders(allOrders.orders);
      }
    };

    getAllOrders();
  }, [orderId]);

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const searchOrderById = (e) => {
    e.preventDefault();
    setOrderId(tempOrderId);
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"
        style={{
          height: "40rem",
        }}
      >
        <div
          className="card-header btn-cust text-center m-3"
          style={{
            borderRadius: "5px",
          }}
        >
          <h3>ALL ORDERS</h3>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <form class="row g-3">
            <div class="col-auto">
              <input
                type="text"
                class="form-control"
                id="inputPassword2"
                placeholder="Enter Order Id..."
                onChange={(e) => setTempOrderId(e.target.value)}
                value={tempOrderId}
              />
            </div>
            <div class="col-auto">
              <button
                type="submit"
                class="btn btn-success mb-3"
                onClick={searchOrderById}
              >
                Search
              </button>
            </div>
          </form>

          <div className="table-responsive">
            <table className="table table-hover table-bordered border-primary ">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">image</th>
                  <th scope="col">Product Details</th>
                  <th scope="col">Delivery Details</th>
                  <th scope="col">Date & Time</th>

                  <th scope="col">Order Status</th>

                  <th scope="col">Delivery Person details</th>

                  <th scope="col">Delivery Time</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {orders.map((order) => {
                  return (
                    <tr key={order.id}>
                      <td>
                        <b>{order.orderId}</b>
                      </td>
                      <td>
                        <img
                          src={order.product.image1}
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{order.product.name}</b>
                        <br />
                        Quantity:{order.quantity}
                        <br />
                        price:{order.product.price}
                        <br />
                        Total Price:{order.product.price * order.quantity}
                        <br />
                        category:{order.product.category.name}
                        <br />
                        seller:{order.product.seller.firstName}
                      </td>

                      <td>
                        User Name:{order.user.firstName + order.user.laststName}
                        <br />
                        Email:{order.user.emailId}
                        <br />
                        contact:{order.user.phoneNo}
                        <br />
                        Address:{order.user.address.street}
                        <br />
                        {order.user.address.city},{order.user.address.pincode}
                      </td>

                      <td>{formatDateFromEpoch(order.orderTime)}</td>

                      <td>{order.status}</td>
                      <td>
                        {(() => {
                          if (order.deliveryPerson) {
                            return (
                              <>
                                Name: {order.deliveryPerson.firstName}
                                <br />
                                Contact:{order.deliveryPerson.phoneNo}
                              </>
                            );
                          } else {
                            return <b className="text-danger">Pending</b>;
                          }
                        })()}
                      </td>

                      <td>
                        {(() => {
                          if (order.deliveryDate) {
                            return (
                              <b>
                                {order.deliveryDate + " " + order.deliveryTime}
                              </b>
                            );
                          } else {
                            return <b className="text-danger">Pending</b>;
                          }
                        })()}
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

export default ViewAllOrders;
