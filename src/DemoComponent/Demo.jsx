import React from "react";
import { Link } from "react-router-dom";
import RoleNav from "../NavbarComponent/RoleNav";

const Demo = () => {
  return (
    <>
      <div className="bg-dark text-light h-100 text-center m-2">
        <h1 className="text-uppercase  p-5">welcome akash chavhan</h1>
      </div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 sticky-top mb-5">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              alt="brandImg"
              src="/BuyZone2.png"
              className="img-fluid"
              style={{ maxWidth: "150px", height: "auto" }}
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Home Link */}
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  <i className="fas fa-house"></i> Home
                </Link>
              </li>

              {/* Product Link */}
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/products"
                >
                  Product
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Laptop
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Phones
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Beauty
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="col-sm-6 me-3">
              <form action="/search" method="get">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    name="search"
                    placeholder="Search for products here"
                  />
                  <button
                    className="btn btn-success text-dark col-md-2"
                    type="submit"
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </div>

            <RoleNav />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Demo;
