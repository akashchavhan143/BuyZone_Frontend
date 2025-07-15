import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { addAdminAPI } from "../services/authService";

const AdminRegisterForm = () => {
  let navigate = useNavigate();
  const [registerRequest, setRegisterRequest] = useState({});

  const handleUserInput = (e) => {
    setRegisterRequest({ ...registerRequest, [e.target.name]: e.target.value });
  };

  const registerAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await addAdminAPI(registerRequest);
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
          navigate("/user/admin");
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
      console.error("Error in registerAdmin:", error);
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
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card border-color custom-bg my-3 "
          style={{ width: "23rem" }}
        >
          <div className="container-fluid">
            <div
              className="card-header btn-cust mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "5px",
              }}
            >
              <h4 className="card-title">ADD ADMIN</h4>
            </div>
            <div className="card-body mt-3">
              <form>
                <div className="mb-3 text-color">
                  <label for="emailId" className="form-label">
                    <b>Email Id</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="emailId"
                    onChange={handleUserInput}
                    value={registerRequest.emailId}
                  />
                </div>
                <div className="mb-3 text-color">
                  <label for="password" className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleUserInput}
                    value={registerRequest.password}
                    autoComplete="on"
                  />
                </div>
                <div className="d-flex aligns-items-center justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-cust btn-md mb-2 col-11"
                    onClick={registerAdmin}
                  >
                    Register
                  </button>
                </div>

                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterForm;
