// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link, useNavigate } from "react-router-dom";

// const UserLoginForm = () => {
//   let navigate = useNavigate();

//   const [loginRequest, setLoginRequest] = useState({
//     emailId: "",
//     password: "",
//     role: "",
//   });

//   const handleUserInput = (e) => {
//     setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
//   };

//   const loginAction = (e) => {
//     fetch("http://localhost:8080/api/user/login", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(loginRequest),
//     })
//       .then((result) => {
//         console.log("result", result);
//         result.json().then((res) => {
//           if (res.success) {
//             console.log("Got the success response");

//             if (res.jwtToken !== null) {
//               if (res.user.role === "Admin") {
//                 sessionStorage.setItem(
//                   "active-admin",
//                   JSON.stringify(res.user)
//                 );
//                 sessionStorage.setItem("admin-jwtToken", res.jwtToken);
//               } else if (res.user.role === "Customer") {
//                 sessionStorage.setItem(
//                   "active-customer",
//                   JSON.stringify(res.user)
//                 );
//                 sessionStorage.setItem("customer-jwtToken", res.jwtToken);
//               } else if (res.user.role === "Seller") {
//                 sessionStorage.setItem(
//                   "active-seller",
//                   JSON.stringify(res.user)
//                 );
//                 sessionStorage.setItem("seller-jwtToken", res.jwtToken);
//               } else if (res.user.role === "Delivery") {
//                 sessionStorage.setItem(
//                   "active-delivery",
//                   JSON.stringify(res.user)
//                 );
//                 sessionStorage.setItem("delivery-jwtToken", res.jwtToken);
//               }
//             }

//             if (res.jwtToken !== null) {
//               toast.success(res.responseMessage, {
//                 position: "top-center",
//                 autoClose: 1000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//               });
//               setTimeout(() => {
//                 if (res.user.role === "Admin") {
//                   //window.location.href = "/user/admin/";
//                   navigate("/user/admin/");
//                 } else if (res.user.role === "Seller") {
//                   //window.location.href = "/seller";
//                   navigate("/user/admin/");
//                 } else if (res.user.role === "Delivery") {
//                   // window.location.href = "/delivery";
//                   navigate("/delivery");
//                 } else if (res.user.role === "Customer") {
//                   //window.location.href = "/";
//                   navigate("/");
//                 } else {
//                   // window.location.href = "/";
//                   navigate("/");
//                 }
//               }, 1000); // Redirect after 1 seconds
//             } else {
//               toast.error(res.responseMessage, {
//                 position: "top-center",
//                 autoClose: 1000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//               });
//             }
//           } else {
//             toast.error(res.responseMessage, {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });
//           }
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("It seems server is down", {
//           position: "top-center",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       });
//     e.preventDefault();
//   };

//   return (
//     <>
//       {/* login form start */}

//       <div className="container ">
//         <div className="row ">
//           {/* Image Section */}
//           <div className="col-md-6 p-3 order-2 order-md-1 ">
//             <img
//               className="card"
//               alt="ecom"
//               src="/ecom33.png"
//               width="100%"
//               height="350px"
//             />
//           </div>

//           {/* Login Form */}
//           <div className="col-md-5 p-3 px-md-5 order-1 order-md-2">
//             <div className="card shadow-lg">
//               <div className="card-header btn-cust m-1 rounded">
//                 <h3 className="text-center">Login</h3>
//               </div>
//               <div className="card-body">
//                 <form>
//                   <div class="mb-3 ">
//                     <select
//                       style={{ border: "1.5px solid #5c4d8f" }}
//                       onChange={handleUserInput}
//                       className="form-control"
//                       name="role"
//                       required
//                     >
//                       <option value="0">Select Role</option>
//                       <option value="Admin"> Admin </option>
//                       <option value="Customer"> Customer </option>
//                       <option value="Seller"> Seller </option>
//                       <option value="Delivery"> Delivery Person </option>
//                     </select>
//                   </div>

//                   <div className="mb-3 ">
//                     <label htmlFor="emailId" class="form-label">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="emailId"
//                       name="emailId"
//                       required
//                       onChange={handleUserInput}
//                       value={loginRequest.emailId}
//                       style={{ border: "1.5px solid #5c4d8f" }}
//                     />
//                   </div>
//                   <div className="mb-3 ">
//                     <label htmlFor="password" className="form-label">
//                       Password
//                     </label>
//                     <input
//                       style={{ border: "1.5px solid #5c4d8f" }}
//                       type="password"
//                       className="form-control"
//                       id="password"
//                       name="password"
//                       required
//                       onChange={handleUserInput}
//                       value={loginRequest.password}
//                       autoComplete="on"
//                     />
//                   </div>
//                   <div className="d-flex aligns-items-center justify-content-center mb-2">
//                     <button
//                       type="submit"
//                       className="btn btn-dark shadow col"
//                       onClick={loginAction}
//                     >
//                       Login
//                     </button>
//                   </div>
//                   <ToastContainer />
//                 </form>
//               </div>
//               <div className="card-footer text-center">
//                 <Link to="/forgotPassword" className="text-decoration-none">
//                   Forgot Password
//                 </Link>
//                 <br />
//                 Dont have an Account?{" "}
//                 <Link
//                   to="/user/customer/register"
//                   className="text-decoration-none"
//                 >
//                   Create
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* login page end */}
//     </>
//   );
// };

// export default UserLoginForm;

/*  src/pages/UserLoginForm.jsx  */
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { login as loginApi } from "../services/authService";
import "react-toastify/dist/ReactToastify.css";

/* ─────────────────────────────────────────────────────────────
   Login Page Component
────────────────────────────────────────────────────────────── */
const UserLoginForm = ({ onLogin }) => {
  const navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const handleUserInput = (e) =>
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });

  /* --- Handle Login ------------------------------------------------ */
  const loginAction = async (e) => {
    e.preventDefault();
    try {
      const res = await loginApi(loginRequest);
      console.log("Login Response:", res);
      console.log("Login Request:", loginRequest);
      console.log("user :", res.user);
      console.log("jwtToken :", res.jwtToken);
      /* Persist user & JWT by role */
      const roleKey = loginRequest.role.toLowerCase();
      sessionStorage.setItem(`active-${roleKey}`, JSON.stringify(res.user));
      sessionStorage.setItem(`${roleKey}-jwtToken`, res.jwtToken);

      toast.success(res.responseMessage, { autoClose: 1000 });

      // shape: { role: "customer"|"admin"|"seller"|"delivery", user: {...} }
      const auth = { role: res.user.role, user: res.user };

      // persist for hard refresh
      sessionStorage.setItem("auth", JSON.stringify(auth));

      // tell App → Header instantly rerenders
      onLogin(auth);

      // go home (or role-specific page)
      navigate("/");
      /* Redirect after toast */
      setTimeout(() => {
        switch (loginRequest.role) {
          case "Admin":
            navigate("/user/admin/");
            break;
          case "Seller":
            navigate("/seller/");
            break;
          case "Delivery":
            navigate("/delivery");
            break;
          default:
            navigate("/");
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <>
      {/* login form start */}

      <div className="container ">
        <div className="row ">
          {/* Image Section */}
          <div className="col-md-6 p-3 order-2 order-md-1 ">
            <img
              className="card"
              alt="ecom"
              src="/ecom33.png"
              width="100%"
              height="350px"
            />
          </div>

          {/* Login Form */}
          <div className="col-md-5 p-3 px-md-5 order-1 order-md-2">
            <div className="card shadow-lg">
              <div className="card-header btn-cust m-1 rounded">
                <h3 className="text-center">Login</h3>
              </div>
              <div className="card-body">
                <form>
                  <div class="mb-3 ">
                    <select
                      style={{ border: "1.5px solid #5c4d8f" }}
                      onChange={handleUserInput}
                      className="form-control"
                      name="role"
                      required
                    >
                      <option value="0">Select Role</option>
                      <option value="Admin"> Admin </option>
                      <option value="Customer"> Customer </option>
                      <option value="Seller"> Seller </option>
                      <option value="Delivery"> Delivery Person </option>
                    </select>
                  </div>

                  <div className="mb-3 ">
                    <label htmlFor="emailId" class="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="emailId"
                      name="emailId"
                      required
                      onChange={handleUserInput}
                      value={loginRequest.emailId}
                      style={{ border: "1.5px solid #5c4d8f" }}
                    />
                  </div>
                  <div className="mb-3 ">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      style={{ border: "1.5px solid #5c4d8f" }}
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      required
                      onChange={handleUserInput}
                      value={loginRequest.password}
                      autoComplete="on"
                    />
                  </div>
                  <div className="d-flex aligns-items-center justify-content-center mb-2">
                    <button
                      type="submit"
                      className="btn btn-dark shadow col"
                      onClick={loginAction}
                    >
                      Login
                    </button>
                  </div>
                  <ToastContainer />
                </form>
              </div>
              <div className="card-footer text-center">
                <Link to="/forgotPassword" className="text-decoration-none">
                  Forgot Password
                </Link>
                <br />
                Dont have an Account?{" "}
                <Link
                  to="/user/customer/register"
                  className="text-decoration-none"
                >
                  Create
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* login page end */}
    </>
  );
};

export default UserLoginForm;
