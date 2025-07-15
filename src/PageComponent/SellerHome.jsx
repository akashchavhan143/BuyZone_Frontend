import React from "react";
import { Link } from "react-router-dom";

const SellerHome = () => {
  return (
    <>
      <div className="container card mb-5 mt-2 btn-cust p-4">
        <p className="fs-3 text-center mt-2 fw-bold">SELLER DASHBOARD</p>
        <div className="row  ">
          <div className="col-md-4 mt-2 mb-3">
            <Link className="text-decoration-none">
              <div className="card card-sh mx-3">
                <div className="card-body text-center">
                  <i className="fa-solid fa-list fa-3x"></i>
                  <h4 className="m-1">VIEW PROFILE</h4>
                  <hr />
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4 mt-3 mb-3">
            <Link to="/product/add" className="text-decoration-none">
              <div className="card card-sh mx-3">
                <div className="card-body text-center text-success">
                  <i className="fa-solid fa-square-plus fa-3x"></i>
                  <h4 className="m-1">ADD PRODUCT</h4>
                  <hr />
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4 mt-3 mb-3">
            <Link to="/seller/product/all" className="text-decoration-none">
              <div className="card card-sh mx-3">
                <div className="card-body text-center">
                  <i className="fa-solid fa-table-list fa-3x"></i>
                  <h4 className="m-1">VIEW MY PRODUCTS</h4>
                  <hr />
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4 mt-3 mb-3">
            <Link
              to="/seller/delivery/register"
              className="text-decoration-none"
            >
              <div className="card card-sh mx-3">
                <div className="card-body text-center text-danger">
                  <i className="fa-solid fa-user-tie fa-3x"></i>
                  <i class="fas fa-shipping-fast fa-3x"></i>
                  <i className="fa-solid fa-plus fa-2x"></i>
                  <h4 className="m-1">ADD DELIVERY PERSON</h4>
                  <hr />
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4 mt-3 mb-3">
            <Link to="/seller/order/all" className="text-decoration-none">
              <div className="card card-sh mx-3">
                <div className="card-body text-center">
                  <i className="fa-solid fa-box-open fa-3x"></i>
                  <h4 className="m-1">SELLER ORDERS</h4>
                  <hr />
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-4 mt-3 mb-3">
            <Link
              to="/seller/delivery-person/all"
              className="text-decoration-none"
            >
              <div className="card card-sh mx-3">
                <div className="card-body text-center text-primary">
                  <i className="fa-solid fa-users-line fa-3x"></i>
                  <h4 className="m-1">DELIVERY PERSONS</h4>
                  <hr />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerHome;
