import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { addUserAPI } from "../services/authService";

const UserRegister = () => {
  const navigate = useNavigate();

  const seller = JSON.parse(sessionStorage.getItem("active-seller"));
  //   const path = window.location.pathname;
  // const derivedRole =
  //   path.includes("customer") ? "Customer" :
  //   path.includes("delivery") ? "Delivery" :
  //   "Seller";

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
  });

  useEffect(() => {
    if (document.URL.indexOf("customer") != -1) {
      user.role = "Customer";
    } else if (document.URL.indexOf("delivery") != -1) {
      user.role = "Delivery";
    } else if (document.URL.indexOf("seller") != -1) {
      user.role = "Seller";
    }
  }, []);

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (user.role === "Delivery") {
      user.sellerId = seller.id;
      // jwtToken = sessionStorage.getItem("seller-jwtToken"); // Use bank's JWT token for customer register
    }
    try {
      const res = await addUserAPI(user);
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

        setTimeout(() => {
          if (user.role === "Delivery") {
            navigate("/seller/");
          } else {
            navigate("/user/login");
          }
        }, 1000);
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
      console.error("Error while resisger user:", error);
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
    <>
      {/* registration page start */}
      <div className="container">
        <div className="row">
          <div className="col-lg-6  p-md-4 order-2 order-md-1">
            <img
              className="card"
              alt="ecom"
              src="/ecom33.png"
              width="100%"
              height="370px"
            />
          </div>
          <div className="col-lg-6 col-md-12 px-md-5 mt-1 mb-3 order-1 order-md-2 ">
            <div className="card shadow-lg px-3 ">
              <div className="card-header btn-cust rounded m-1">
                <h3 className="text-center">Register </h3>
              </div>

              <div className="card-body">
                <form onSubmit={saveUser}>
                  <div className="row mb-2">
                    <div className="col">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        required
                        onChange={handleUserInput}
                        value={user.firstName}
                      />
                    </div>

                    <div className="col">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        required
                        onChange={handleUserInput}
                        value={user.lastName}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col">
                      <label className="form-label">Email</label>

                      <input
                        type="email"
                        className="form-control"
                        id="emailId"
                        name="emailId"
                        required
                        onChange={handleUserInput}
                        value={user.emailId}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="phoneNo" className="form-label">
                        Contact
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phoneNo"
                        name="phoneNo"
                        required
                        onChange={handleUserInput}
                        value={user.phoneNo}
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        required
                        onChange={handleUserInput}
                        value={user.password}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="phoneNo" className="form-label">
                        Confirm password
                      </label>
                      <input type="text" className="form-control" required />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        required
                        onChange={handleUserInput}
                        value={user.city}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="pincode" className="form-label">
                        Pincode
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="pincode"
                        name="pincode"
                        required
                        onChange={handleUserInput}
                        value={user.pincode}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="col mb-2">
                      <label htmlFor="street" className="form-label">
                        Street
                      </label>
                      <textarea
                        className="form-control"
                        id="street"
                        name="street"
                        rows="2"
                        required
                        onChange={handleUserInput}
                        value={user.street}
                      />
                    </div>
                  </div>

                  <div className="d-flex aligns-items-center justify-content-center">
                    <input
                      type="submit"
                      className="btn btn-dark col-6 btn-md fs-5"
                      value="Register"
                    />
                  </div>
                  <ToastContainer />
                </form>
              </div>
              <div className="card-footer text-center">
                Already have an Account?{" "}
                <Link to="/user/login" className="text-decoration-none">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* registration page end */}
    </>
  );
};

export default UserRegister;
