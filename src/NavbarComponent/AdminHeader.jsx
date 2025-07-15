import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoleNav from "./RoleNav";

const AdminHeader = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  console.log(user);

  useEffect(() => {
    if (user) {
      setUsername(user.emailId);
    }
  }, [user]); // This will re-run the effect only when `user` changes

  const adminLogout = () => {
    toast.success("logged out!!!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("admin-jwtToken");
    //window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 1000); // Redirect after 3 seconds
  };
  return (
    <>
      {user ? (
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
          <li class="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle active"
              to="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {/* Dynamic Username Display */}
              {username}
            </Link>
            <ul className="dropdown-menu">
              <li>
                {" "}
                <Link className="dropdown-item" to="">
                  Profile
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  to=""
                  className="dropdown-item"
                  aria-current="page"
                  onClick={adminLogout}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      ) : (
        <RoleNav />
      )}
      <ToastContainer />
    </>
  );
};

export default AdminHeader;
