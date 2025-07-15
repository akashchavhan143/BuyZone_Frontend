import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteSellerAByIdAPI,
  getAllUserByRole,
} from "../services/userService";

const ViewAllSellers = () => {
  const [allSeller, setAllSeller] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    getAllSellers();
  }, []);
  const getAllSellers = async () => {
    const allUsers = await getAllUserByRole("Seller");
    if (allUsers) {
      setAllSeller(allUsers.users);
    }
  };

  const hanleDeleteSeller = async (userId) => {
    try {
      if (window.confirm("Are you sure you want to delete this seller?")) {
        const res = await deleteSellerAByIdAPI(userId);
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
          getAllSellers();
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
      }
    } catch (error) {
      console.error("Error in deleteSeller:", error);
      toast.error("It seems server is down", {
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
  };

  return (
    <div className="mt-3">
      <div
        className="card  ms-2 me-2 mb-5 custom-bg shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header btn-cust text-center m-3 p-2"
          style={{
            borderRadius: "5px",
          }}
        >
          <h2>All Sellers</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color ">
              <thead className="table-bordered border-color ">
                <tr>
                  <th scope="col">Sr No</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allSeller.map((seller, index) => {
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{seller.firstName}</td>
                      <td>{seller.lastName}</td>
                      <td>{seller.emailId}</td>
                      <td>{seller.phoneNo}</td>
                      <td>
                        {seller.address.street +
                          ", " +
                          seller.address.city +
                          ", " +
                          seller.address.pincode}
                      </td>
                      <td>
                        <button
                          onClick={() => hanleDeleteSeller(seller.id)}
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

export default ViewAllSellers;
