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
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-6  order-2 order-md-1">
            <img
              className="card img-fluid"
              alt="ecom"
              src="/ecom33.png"
              style={{
                height: '600px',
                objectFit: 'contain',
                animation: 'slideInLeft 0.8s ease-out'
              }}
            />
          </div>
          <div className="col-lg-6 col-md-12 px-md-5 mt-1 mb-3 order-1 order-md-2">
            <div 
              className="card shadow-lg px-3"
              style={{
                borderRadius: '15px',
                border: 'none',
                animation: 'slideInRight 0.8s ease-out'
              }}
            >
              <div 
                className="card-header btn-cust rounded m-1"
                style={{
                  borderRadius: '12px',
                  background: 'linear-gradient(45deg, #5c4d8f, #7b68ee)'
                }}
              >
                <div className="text-center">
                  <h6 className="mb-1 fw-normal">
                    <i className="fas fa-user-plus me-2"></i>
                    Create Account
                  </h6>
                  <p className="mb-0 small opacity-75">Join BuyZone today</p>
                </div>
              </div>

              <div className="card-body">
                <form onSubmit={saveUser}>
                  <div className="row mb-2">
                    <div className="col">
                      <label htmlFor="firstName" className="form-label fw-normal">
                        <i className="fas fa-user me-2 text-muted"></i>
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter first name"
                        required
                        onChange={handleUserInput}
                        value={user.firstName}
                        style={{
                          border: "1.5px solid #5c4d8f",
                          borderRadius: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#7b68ee';
                          e.target.style.boxShadow = '0 0 0 0.2rem rgba(123, 104, 238, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#5c4d8f';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    <div className="col">
                      <label htmlFor="lastName" className="form-label fw-normal">
                        <i className="fas fa-user me-2 text-muted"></i>
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter last name"
                        required
                        onChange={handleUserInput}
                        value={user.lastName}
                        style={{
                          border: "1.5px solid #5c4d8f",
                          borderRadius: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#7b68ee';
                          e.target.style.boxShadow = '0 0 0 0.2rem rgba(123, 104, 238, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#5c4d8f';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col">
                      <label className="form-label fw-normal">
                        <i className="fas fa-envelope me-2 text-muted"></i>
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="emailId"
                        name="emailId"
                        placeholder="Enter email address"
                        required
                        onChange={handleUserInput}
                        value={user.emailId}
                        style={{
                          border: "1.5px solid #5c4d8f",
                          borderRadius: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#7b68ee';
                          e.target.style.boxShadow = '0 0 0 0.2rem rgba(123, 104, 238, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#5c4d8f';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="phoneNo" className="form-label fw-normal">
                        <i className="fas fa-phone me-2 text-muted"></i>
                        Contact
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phoneNo"
                        name="phoneNo"
                        placeholder="Enter phone number"
                        required
                        onChange={handleUserInput}
                        value={user.phoneNo}
                        style={{
                          border: "1.5px solid #5c4d8f",
                          borderRadius: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#7b68ee';
                          e.target.style.boxShadow = '0 0 0 0.2rem rgba(123, 104, 238, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#5c4d8f';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col">
                      <label htmlFor="password" className="form-label fw-normal">
                        <i className="fas fa-lock me-2 text-muted"></i>
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        required
                        onChange={handleUserInput}
                        value={user.password}
                        style={{
                          border: "1.5px solid #5c4d8f",
                          borderRadius: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#7b68ee';
                          e.target.style.boxShadow = '0 0 0 0.2rem rgba(123, 104, 238, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#5c4d8f';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="confirmPassword" className="form-label fw-normal">
                        <i className="fas fa-lock me-2 text-muted"></i>
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm password"
                        required
                        style={{
                          border: "1.5px solid #5c4d8f",
                          borderRadius: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#7b68ee';
                          e.target.style.boxShadow = '0 0 0 0.2rem rgba(123, 104, 238, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#5c4d8f';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <label htmlFor="city" className="form-label fw-normal">
                        <i className="fas fa-city me-2 text-muted"></i>
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        placeholder="Enter city"
                        required
                        onChange={handleUserInput}
                        value={user.city}
                        style={{
                          border: "1.5px solid #5c4d8f",
                          borderRadius: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#7b68ee';
                          e.target.style.boxShadow = '0 0 0 0.2rem rgba(123, 104, 238, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#5c4d8f';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <label htmlFor="pincode" className="form-label fw-normal">
                        <i className="fas fa-map-pin me-2 text-muted"></i>
                        Pincode
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="pincode"
                        name="pincode"
                        placeholder="Enter pincode"
                        required
                        onChange={handleUserInput}
                        value={user.pincode}
                        style={{
                          border: "1.5px solid #5c4d8f",
                          borderRadius: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#7b68ee';
                          e.target.style.boxShadow = '0 0 0 0.2rem rgba(123, 104, 238, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#5c4d8f';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="col mb-2">
                      <label htmlFor="street" className="form-label fw-normal">
                        <i className="fas fa-road me-2 text-muted"></i>
                        Street Address
                      </label>
                      <textarea
                        className="form-control"
                        id="street"
                        name="street"
                        rows="2"
                        placeholder="Enter street address"
                        required
                        onChange={handleUserInput}
                        value={user.street}
                        style={{
                          border: "1.5px solid #5c4d8f",
                          borderRadius: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#7b68ee';
                          e.target.style.boxShadow = '0 0 0 0.2rem rgba(123, 104, 238, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#5c4d8f';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn w-100"
                      style={{
                        background: 'linear-gradient(45deg, #5c4d8f, #7b68ee)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: '500',
                       
                        fontSize: '16px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(92, 77, 143, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                      }}
                    >
                      <i className="fas fa-user-plus me-2"></i>
                      Register
                    </button>
                  </div>
                  <ToastContainer />
                </form>
              </div>
              
              <div className="card-footer text-center" style={{background: 'transparent', border: 'none'}}>
                <span className="text-muted">Already have an account? </span>
                <Link
                  to="/user/login"
                  className="text-decoration-none fw-bold"
                  style={{color: '#5c4d8f'}}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      {/* registration page end */}
    </>
  );
};

export default UserRegister;
