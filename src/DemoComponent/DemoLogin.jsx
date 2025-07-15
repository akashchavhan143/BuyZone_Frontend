import React from "react";
import "./LoginDemo.css";
import { Link } from "react-router-dom";

const DemoLogin = () => {
  return (
    <>
      {/* login form dem */}
      <section>
        <div className="container ">
          <div className="row">
            {/* Image Section */}
            <div className="col-md-6 p-5">
              <img alt="ecom" src="/ecom.jpeg" width="100%" height="350px" />
            </div>

            {/* Login Form */}
            <div className="col-md-5 p-5">
              <div className="card shadow-lg">
                <div className="card-header">
                  <h3 className="text-center">Login</h3>
                </div>

                <div className="card-body">
                  <form action="/login" method="post">
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="email"
                        name="username"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        className="form-control"
                        name="password"
                        type="password"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-dark shadow col-md-12"
                    >
                      Login
                    </button>
                  </form>
                </div>

                <div className="card-footer text-center">
                  <Link to="/forgotPassword" className="text-decoration-none">
                    Forgot Password
                  </Link>
                  <br />
                  Dont have an Account?{" "}
                  <a href="/register" className="text-decoration-none">
                    Create
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DemoLogin;
