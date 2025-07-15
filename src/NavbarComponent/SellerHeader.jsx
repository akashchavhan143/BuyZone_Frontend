import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoleNav from "./RoleNav";

const SellerHeader = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");

  const user = JSON.parse(sessionStorage.getItem("active-seller"));
  console.log(user);

  useEffect(() => {
    if (user) {
      setUsername(user.emailId);
    }
  }, [user]); // This will re-run the effect only when `user` changes

  const sellerLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-seller");
    sessionStorage.removeItem("seller-jwtToken");
    //window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 2000); // Redirect after 3 seconds
  };
  return (
    <>
      {" "}
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
              <b>{username}</b>
            </Link>
            <ul className="dropdown-menu">
              <li>
                {" "}
                <Link className="dropdown-item" to="">
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  className="dropdown-item"
                  to="/product/add"
                  aria-current="page"
                >
                  Add Product
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  to=""
                  className="dropdown-item"
                  aria-current="page"
                  onClick={sellerLogout}
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

export default SellerHeader;
