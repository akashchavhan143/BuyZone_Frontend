import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import RoleNav from "./RoleNav";
import { fetchCartByUser } from "../services/cartService";

const HeaderUser = () => {
  let navigate = useNavigate();

  // State to store the username and cart count
  const [username, setUsername] = useState("");
  const [cartCount, setCartCount] = useState(0);

  let user = JSON.parse(sessionStorage.getItem("active-customer"));
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  // Function to log out the user
  const userLogout = () => {
    toast.success("logged out successfully", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-customer");
    sessionStorage.removeItem("customer-jwtToken");
    //window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 2000); // Redirect after 2 seconds
  };

  // Function to retrieve the cart count
  useEffect(() => {
    if (!user) return;

    setUsername(user.firstName);

    const loadCartCount = async () => {
      try {
        const carts = await fetchCartByUser(user.id);
        setCartCount(carts.length);
      } catch (err) {
        toast.error("Failed to retrieve cart count.");
      }
    };

    loadCartCount();
  }, [user, customer_jwtToken]);
  return (
    <>
      {user ? (
        <>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
            <li className="nav-item">
              <Link to="/customer/cart" className="nav-link active">
                <FaShoppingCart /> Cart
                <span className="badge bg-danger text-white">{cartCount}</span>
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle active"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                {username}
              </Link>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/customer/order">
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="" className="dropdown-item" onClick={userLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </>
      ) : (
        <RoleNav />
      )}
      <ToastContainer />
    </>
  );
};

export default HeaderUser;
