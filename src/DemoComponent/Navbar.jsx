// Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// --- Inline styles --------------------------------------------
const styles = {
  navBg: { backgroundColor: "#172337" },
  link: { color: "#ffffff", fontWeight: 500 },
  linkInactive: { color: "rgba(255,255,255,0.6)", fontWeight: 500 },
  activeLink: {
    color: "#ffffff",
    fontWeight: 600,
    borderBottom: "3px solid #ffffff",
  },
};
// ---------------------------------------------------------------

const Navbar = () => {
  const routes = ["home", "products", "about", "contact"];

  return (
    <nav className="navbar navbar-expand-lg shadow-sm" style={styles.navBg}>
      <div className="container">
        <NavLink className="navbar-brand fw-bold text-white" to="/home">
          BuyZone
        </NavLink>

        {/* Mobile hamburger */}
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto gap-lg-2">
            {routes.map((route) => (
              <li key={route} className="nav-item">
                <NavLink
                  to={`/${route}`}
                  style={({ isActive }) =>
                    isActive ? styles.activeLink : styles.linkInactive
                  }
                  className="nav-link px-3"
                >
                  {route.charAt(0).toUpperCase() + route.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
