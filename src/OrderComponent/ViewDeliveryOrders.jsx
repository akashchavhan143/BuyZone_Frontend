import { useState, useEffect } from "react";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import {
  retrieveAllDeliveryStatus,
  retrieveAllDeliveryTiming,
  retrieveAllordersForDeliveryPerson,
  retrieveOrdersById,
  updateOrderDeliveryStatusAPI,
} from "../services/orderService";

const ViewDeliveryOrders = () => {
  const deliveryPerson = JSON.parse(sessionStorage.getItem("active-delivery"));
  const [orders, setOrders] = useState([]);

  const delivery_jwtToken = sessionStorage.getItem("delivery-jwtToken");

  const [deliveryUpdateRequest, setDeliveryUpdateRequest] = useState({
    orderId: "",
    deliveryStatus: "",
    deliveryTime: "",
    deliveryDate: "",
    deliveryId: deliveryPerson.id,
  });

  const [deliveryStatus, setDeliveryStatus] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState([]);

  const handleInput = (e) => {
    setDeliveryUpdateRequest({
      ...deliveryUpdateRequest,
      [e.target.name]: e.target.value,
    });
  };

  const [orderId, setOrderId] = useState("");
  const [tempOrderId, setTempOrderId] = useState("");
  const [assignOrderId, setAssignOrderId] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const getAllOrders = async () => {
      let allOrders;
      if (orderId) {
        allOrders = await retrieveOrdersById(orderId);
      } else {
        allOrders = await retrieveAllordersForDeliveryPerson(deliveryPerson.id);
      }

      if (allOrders) {
        setOrders(allOrders.orders);
      }
    };

    const getAllDeliveryStatus = async () => {
      let allStatus = await retrieveAllDeliveryStatus();

      if (allStatus) {
        setDeliveryStatus(allStatus);
      }
    };

    const getAllDeliveryTiming = async () => {
      let allTiming = await retrieveAllDeliveryTiming();

      if (allTiming) {
        setDeliveryTime(allTiming);
      }
    };

    getAllOrders();
    getAllDeliveryStatus();
    getAllDeliveryTiming();
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

  const updateDelivery = (orderId, e) => {
    setAssignOrderId(orderId);
    handleShow();
  };

  const updateOrderStatus = async (orderId, e) => {
    e.preventDefault();
    deliveryUpdateRequest.orderId = assignOrderId;

    const res = await updateOrderDeliveryStatusAPI(deliveryUpdateRequest);

    toast[res.success ? "success" : "error"](res.responseMessage, {
      position: "top-center",
      autoClose: 1000,
    });
  };
  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2  custom-bg shadow-lg"
        style={{
          height: "40rem",
        }}
      >
        <div
          className="card-header btn-cust text-center m-3 "
          style={{
            borderRadius: "6px",
          }}
        >
          <h2 className="p-2">MY DELIVERY ORDERS</h2>
        </div>
        <form class="row g-3 ms-2">
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
              class="btn btn-cust mb-3"
              onClick={searchOrderById}
            >
              Search
            </button>
          </div>
        </form>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover ">
              <thead className="table-bordered border-color ">
                <tr>
                  <th scope="col">Order Id</th>

                  <th scope="col">image</th>
                  <th scope="col" colSpan={2}>
                    Product details
                  </th>

                  <th scope="col">Delivery details</th>

                  <th scope="col">O.date &Time</th>

                  <th scope="col">O Status</th>

                  <th scope="col">Delivery Time</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {orders.map((order) => {
                  return (
                    <tr>
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
                      <td colSpan={2}>
                        <b>{order.product.name}</b>
                        <br />
                        Quantity: {order.quantity}
                        <br />
                        price :{order.product.price}
                        <br />
                        Total Price:{order.product.price * order.quantity}
                        <br />
                        seller :{order.product.seller.firstName}
                      </td>

                      <td>
                        User:
                        {order.user.firstName + " " + order.user.lastName}
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
                          if (order.deliveryDate) {
                            return (
                              <b>
                                {order.deliveryDate + " " + order.deliveryTime}
                              </b>
                            );
                          } else {
                            return <b className="text-danger">Processing</b>;
                          }
                        })()}
                      </td>
                      <td>
                        {(() => {
                          if (order.status === "Delivered") {
                            return <b className="text-success">Delivered</b>;
                          } else {
                            return (
                              <button
                                className="btn btn-sm  btn-success"
                                variant="primary"
                                onClick={() => updateDelivery(order.orderId)}
                              >
                                Update Status
                              </button>
                            );
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

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header
          closeButton
          className="btn-cust m-2"
          style={{
            borderRadius: "5px",
          }}
        >
          <Modal.Title>Update Delivery Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">
                  <b>Order Id</b>
                </label>
                <input type="text" class="form-control" value={assignOrderId} />
              </div>

              <div className="mb-3">
                <label for="deliveryDate" class="form-label">
                  <b>Delivery Date</b>
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="deliveryDate"
                  name="deliveryDate"
                  onChange={handleInput}
                  value={deliveryUpdateRequest.deliveryDate}
                />
              </div>

              <div className=" mb-3">
                <label className="form-label">
                  <b>Delivery Time</b>
                </label>

                <select
                  name="deliveryTime"
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Delivery Time</option>

                  {deliveryTime.map((time) => {
                    return <option value={time}>{time}</option>;
                  })}
                </select>
              </div>

              <div className=" mb-3">
                <label className="form-label">
                  <b>Delivery Status</b>
                </label>

                <select
                  name="deliveryStatus"
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Delivery Status</option>

                  {deliveryStatus.map((status) => {
                    return <option value={status}>{status}</option>;
                  })}
                </select>
              </div>

              <div className="d-flex aligns-items-center justify-content-center">
                <button
                  type="submit"
                  onClick={() => updateOrderStatus(assignOrderId)}
                  class="btn btn-cust col"
                >
                  Update Status
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewDeliveryOrders;
