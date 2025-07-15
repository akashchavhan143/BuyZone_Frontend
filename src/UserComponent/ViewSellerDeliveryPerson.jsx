import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteDeliveryPersonAPI,
  getAllDeliveryPersonsBySellerId,
} from "../services/userService";
import { confirmToast } from "../utils/ConformToast";
const seller = JSON.parse(sessionStorage.getItem("active-seller"));

const ViewSellerDeliveryPerson = () => {
  const [allDelivery, setAllDelivery] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getAllDeliveryPerOfSeller();
  }, []);
  const getAllDeliveryPerOfSeller = async () => {
    const allUsers = await getAllDeliveryPersonsBySellerId(seller.id);
    if (allUsers) {
      setAllDelivery(allUsers.users);
    }
  };

  const deleteDelivery = async (userId, e) => {
    const ok = await confirmToast("Delete this Delibvery Person?");
    if (!ok) return; // user pressed “Cancel”
    e.preventDefault();
    try {
      const res = await deleteDeliveryPersonAPI(userId);
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

        getAllDeliveryPerOfSeller();
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
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header btn-cust text-center mx-3 mt-2 "
          style={{
            borderRadius: "5px",
          }}
        >
          <h2>All Delivery Persons</h2>
        </div>
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
                  <th scope="col">Sr No</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {allDelivery.map((delivery, index) => {
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{delivery.firstName + " " + delivery.lastName}</td>
                      <td>{delivery.emailId}</td>
                      <td>{delivery.phoneNo}</td>
                      <td>
                        {delivery.address.street +
                          ", " +
                          delivery.address.city +
                          ", " +
                          delivery.address.pincode}
                      </td>
                      <td>
                        <button
                          onClick={() => deleteDelivery(delivery.id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
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

export default ViewSellerDeliveryPerson;
