import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { getAllUserByRole } from "../services/userService";

const ViewAllCustomers = () => {
  const [allCustomer, setAllCustomer] = useState([]);
  useEffect(() => {
    getAllCustomers();
  }, []);

  const getAllCustomers = async () => {
    const allUsers = await getAllUserByRole("Customer");
    if (allUsers) {
      setAllCustomer(allUsers.users);
    }
  };

  return (
    <div className="mt-3">
      <div
        className="card  ms-2 me-2 mb-5 custom-bg shadow-lg  "
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header btn-cust text-center m-2"
          style={{
            borderRadius: "5px",
          }}
        >
          <h2>ALL CUSTOMERS</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover  ">
              <thead className="table-bordered   ">
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                {allCustomer.map((customer, index) => {
                  return (
                    <tr key={index}>
                      <td className="">{customer.firstName}</td>
                      <td className="">{customer.lastName}</td>
                      <td className=" ">{customer.emailId}</td>
                      <td className="">{customer.phoneNo}</td>
                      <td className="">
                        {customer.address.street +
                          ", " +
                          customer.address.city +
                          ", " +
                          customer.address.pincode}
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

export default ViewAllCustomers;
