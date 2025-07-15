import { useState, useEffect } from "react";
import React from "react";
import { getOrderByUserId } from "../services/orderService";
const ViewMyOrders = () => {
  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      const allOrders = await getOrderByUserId(user.id);
      if (allOrders) {
        setOrders(allOrders.orders);
      }
    };

    getAllOrders();
  }, []);

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"
        style={{
          height: "40rem",
        }}
      >
        <div className="card-header btn-cust rounded text-center m-2">
          {/* customer orders */}
          <h2>My Orders </h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover ">
              <thead className="table-bordered border-color">
                <tr>
                  <th scope="col">Order Id</th>

                  <th scope="col">image</th>
                  <th scope="col">Product details</th>

                  <th scope="col">Order Time</th>

                  <th scope="col">Order Status</th>

                  <th scope="col">Delivery Person details</th>

                  <th scope="col">Delivery Time</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    <tr>
                      <td>{order.orderId}</td>
                      <td>
                        <img
                          src={
                            
                            order.product.image1
                          }
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
                        category :{order.product.category.name}
                        <br />
                        quantity :{order.quantity}
                        <br />
                        price:{order.product.price}
                        <br />
                        total Price :{order.product.price * order.quantity}
                        <br />
                        seller:{order.product.seller.firstName}
                        <br />
                      </td>

                      <td>
                        <b>{formatDateFromEpoch(order.orderTime)}</b>
                      </td>
                      <td>
                        <b>{order.status}</b>
                      </td>
                      <td>
                        {(() => {
                          if (order.deliveryPerson) {
                            return (
                              <>
                                {" "}
                                Name :{order.deliveryPerson.firstName}
                                <br />
                                contact :{order.deliveryPerson.phoneNo}
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
                              <p>
                                {" "}
                                {order.deliveryDate + " " + order.deliveryTime}
                              </p>
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

export default ViewMyOrders;
