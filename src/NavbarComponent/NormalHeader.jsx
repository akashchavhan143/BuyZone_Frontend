import { Link } from "react-router-dom";
import "../styles/header.css";
const NormalHeader = () => {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li>
        <div className="dropdown">
          <Link
            className="nav-link dropdown-toggle active"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Register
          </Link>

          <ul class="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/user/seller/register">
                Seller
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/user/customer/register">
                Customer
              </Link>
            </li>
          </ul>
        </div>
      </li>

      <li className="nav-item">
        <Link
          to="/user/login"
          class="nav-link active"
          style={{ color: "white" }}
          aria-current="page"
        >
          <i className="fas fa-sign-in-alt"></i> Login
        </Link>
      </li>
    </ul>
  );
};

export default NormalHeader;
