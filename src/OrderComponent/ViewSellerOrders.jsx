import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import {
  assignOrderToDeliveryPerson,
  getALLSellerOrders,
  retrieveOrdersById,
} from "../services/orderService";
import { getAllDeliveryPersonsBySellerId } from "../services/userService";

const ViewSellerOrders = () => {
  const seller = JSON.parse(sessionStorage.getItem("active-seller"));
  const [orders, setOrders] = useState([]);

  const seller_jwtToken = sessionStorage.getItem("seller-jwtToken");

  const [orderId, setOrderId] = useState("");
  const [tempOrderId, setTempOrderId] = useState("");

  const [assignOrderId, setAssignOrderId] = useState("");
  const [deliveryPersonId, setDeliveryPersonId] = useState("");

  const [allDelivery, setAllDelivery] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const getAllOrders = async () => {
    let allOrders;
    if (orderId) {
      allOrders = await retrieveOrdersById(orderId);
    } else {
      allOrders = await getALLSellerOrders(seller.id);
    }

    if (allOrders) {
      setOrders(allOrders.orders);
    }
  };

  const getAllUsers = async () => {
    const allUsers = await getAllDeliveryPersonsBySellerId(seller.id);
    if (allUsers) {
      setAllDelivery(allUsers.users);
    }
  };
  useEffect(() => {
    getAllOrders();
    getAllUsers();
  }, [orderId, seller.id]);

  // const retrieveAllorders = async () => {
  //   const response = await axios.get(
  //     "http://localhost:8080/api/order/fetch/seller-wise?sellerId=" + seller.id,
  //     {
  //       headers: {
  //         Authorization: "Bearer " + seller_jwtToken, // Replace with your actual JWT token
  //       },
  //     }
  //   );
  //   console.log(response.data);
  //   return response.data;
  // };

  // const retrieveAllUser = async () => {
  //   const response = await axios.get(
  //     "http://localhost:8080/api/user/fetch/seller/delivery-person?sellerId=" +
  //       seller.id,
  //     {
  //       headers: {
  //         Authorization: "Bearer " + seller_jwtToken, // Replace with your actual JWT token
  //       },
  //     }
  //   );
  //   console.log(response.data);
  //   return response.data;
  // };

  // const retrieveOrdersById = async () => {
  //   const response = await axios.get(

  //     "http://localhost:8080/api/order/fetch?orderId=" + orderId
  //   );
  //   console.log(response.data);
  //   return response.data;
  // };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const searchOrderById = (e) => {
    e.preventDefault();
    setOrderId(tempOrderId);
  };

  const assignDelivery = (orderId, e) => {
    setAssignOrderId(orderId);
    handleShow();
  };

  const handleAssignToDelivery = async (e) => {
    e.preventDefault();
    if (!deliveryPersonId) {
      toast.error("Please select a delivery person", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else if (!assignOrderId) {
      toast.error("Please select an order", {
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
    try {
      const payload = { orderId: assignOrderId, deliveryId: deliveryPersonId };
      const res = await assignOrderToDeliveryPerson(payload);
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
        getAllOrders();
      } else {
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

    handleClose();
  };
  // const assignToDelivery = (orderId, e) => {
  //   let data = { orderId: assignOrderId, deliveryId: deliveryPersonId };

  //   fetch("http://localhost:8080/api/order/assign/delivery-person", {
  //     method: "PUT",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + seller_jwtToken,
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((result) => {
  //       result.json().then((res) => {
  //         if (res.success) {
  //           toast.success(res.responseMessage, {
  //             position: "top-center",
  //             autoClose: 1000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //           });
  //           setOrders(res.orders);
  //           setTimeout(() => {
  //             window.location.reload(true);
  //           }, 2000); // Redirect after 3 seconds
  //         } else if (!res.success) {
  //           toast.error(res.responseMessage, {
  //             position: "top-center",
  //             autoClose: 1000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //           });
  //           setTimeout(() => {
  //             window.location.reload(true);
  //           }, 2000); // Redirect after 3 seconds
  //         } else {
  //           toast.error("It Seems Server is down!!!", {
  //             position: "top-center",
  //             autoClose: 1000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //           });
  //           setTimeout(() => {
  //             window.location.reload(true);
  //           }, 2000); // Redirect after 3 seconds
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       toast.error("It seems server is down", {
  //         position: "top-center",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //       setTimeout(() => {
  //         window.location.reload(true);
  //       }, 1000); // Redirect after 3 seconds
  //     });
  // };

  return (
    <div className="mt-3">
      <div
        className="card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "40rem",
        }}
      >
        <div
          className="card-header btn-cust text-center mx-3 mt-3"
          style={{
            borderRadius: "5px",
          }}
        >
          <h2>Seller Orders</h2>
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
            <table className="table table-hover table-bordered border-primary">
              <thead className="">
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">image</th>
                  <th scope="col">Product Details</th>

                  <th scope="col">Delivey details</th>

                  <th scope="col">Date & Time</th>

                  <th scope="col">Delivery Person info</th>

                  <th scope="col">Order Status</th>

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
                          className="img-fluid"
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
                        total Price :{order.product.price * order.quantity}
                        <br />
                      </td>
                      <td>
                        <b>Use name :{order.user.firstName}</b>
                        <br />
                        Email :{order.user.emailID}
                        <br />
                        Contact :{order.user.phoneNo}
                        <br />
                        Adress :{order.user.address.street}
                        <br />
                        {order.user.address.city},{order.user.address.pincode}
                        <br />
                      </td>

                      <td>
                        <b>{formatDateFromEpoch(order.orderTime)}</b>
                      </td>

                      <td>
                        {(() => {
                          if (order.deliveryPerson) {
                            return (
                              <>
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
                          if (order.deliveryPerson) {
                            return <b>Delivery Assigned</b>;
                          } else {
                            return (
                              <button
                                className="btn btn-sm btn-success ms-2"
                                variant="primary"
                                onClick={() => assignDelivery(order.orderId)}
                              >
                                Assign Delivery
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
          className="bg-color btn-cust text-center m-2"
          style={{
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <Modal.Title className="text-center">
            Assign To Delivery Person
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <form>
              <div className="mb-3">
                <label htmlFor="id" className="form-label">
                  <b>Order Id</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={assignOrderId}
                />
              </div>

              <div className=" mb-3">
                <label className="form-label">
                  <b>Delivery Person</b>
                </label>

                <select
                  name="deliveryPersonId"
                  onChange={(e) => setDeliveryPersonId(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Delivery Person</option>

                  {allDelivery.map((delivery) => {
                    return (
                      <option value={delivery.id}>
                        {delivery.firstName + " " + delivery.lastName}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="d-flex aligns-items-center justify-content-center mb-2">
                <button
                  type="submit"
                  onClick={() => handleAssignToDelivery()}
                  className="btn btn-cust col btn-md"
                >
                  Assign
                </button>
              </div>

              <ToastContainer />
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

export default ViewSellerOrders;
