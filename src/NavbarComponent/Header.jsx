import { Link } from "react-router-dom";
import RoleNav from "./RoleNav";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "../Component/SearchBar";
import { retrieveAllCategories } from "../services/categoryService";

const Header = ({ auth }) => {
  const [categories, setCategories] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const deliveryPerson = JSON.parse(sessionStorage.getItem("active-delivery"));
  const seller = JSON.parse(sessionStorage.getItem("active-seller"));

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    const allCategories = await retrieveAllCategories();
    if (allCategories) {
      setCategories(allCategories.categories);
    }
  };

  // ❷ convenience flags
  const role = auth?.role;
  const isAdmin = role === "Admin";
  const isSeller = role === "Seller";
  const isDelivery = role === "Delivery";

  // ❸ choose home path once per role
  const homePath = useMemo(() => {
    if (isAdmin) return "/user/admin/";
    if (isSeller) return "/seller/";
    if (isDelivery) return "/deliveryHome";
    return "/";
  }, [role]);
  return (
    <>
      <nav
        className="navbar  navbar-expand-lg bg-dark1 text-light  p-3 sticky-top "
        data-bs-theme="dark"
      >
        <div className="container-fluid ">
          <Link to="/aboutUs">
            <img
              src="/BuyZone2.png"
              className="img-fluid"
              style={{ maxWidth: "160px", height: "auto" }}
              alt="BrandImg"
            />
          </Link>

          <button
            className="navbar-toggler text-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fw-bold ms-md-3"
                  aria-current="page"
                  to={homePath}
                >
                  <i className="fas fa-house"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/products"
                  className="nav-link active text-light"
                  aria-current="page"
                >
                  Products
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-light"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </Link>
                <ul className="dropdown-menu ">
                  {categories.map((category) => {
                    return (
                      <li key={category.id}>
                        <Link
                          to={`/product/category/${category.id}/${category.name}`}
                          className="dropdown-item  text-light"
                        >
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>

            <RoleNav />
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;

// import { NavLink, Link } from "react-router-dom";
// import RoleNav from "./RoleNav";
// import { useEffect, useMemo, useState } from "react";
// import { retrieveAllCategories } from "../services/categoryService";
// import "../styles/header.css"; // custom styles, see below

// const Header = ({ auth }) => {
//   const [categories, setCategories] = useState([]);
//   const user = JSON.parse(sessionStorage.getItem("active-customer"));
//   const admin = JSON.parse(sessionStorage.getItem("active-admin"));
//   const deliveryPerson = JSON.parse(sessionStorage.getItem("active-delivery"));
//   const seller = JSON.parse(sessionStorage.getItem("active-seller"));

//   useEffect(() => {
//     const getAllCategories = async () => {
//       const allCategories = await retrieveAllCategories();
//       if (allCategories) setCategories(allCategories.categories);
//     };
//     getAllCategories();
//   }, []);

//   // ❷ convenience flags
//   const role = auth?.role;
//   const isAdmin = role === "admin";
//   const isSeller = role === "seller";
//   const isDelivery = role === "delivery";

//   // ❸ choose home path once per role
//   const homePath = useMemo(() => {
//     if (isAdmin) return "/user/admin/";
//     if (isSeller) return "/seller/";
//     if (isDelivery) return "/deliveryHome";
//     return "/";
//   }, [role]);

//   return (
//     <nav className="navbar navbar-expand-lg custom-navbar sticky-top shadow-sm">
//       <div className="container-fluid px-3">
//         {/* Brand logo */}
//         <Link to="/aboutUs" className="navbar-brand me-4">
//           {" "}
//           {/* <-  add me-4 */}
//           <img
//             src="/BuyZone2.png"
//             alt="BuyZone"
//             style={{ maxWidth: 120, height: "auto" }}
//           />
//         </Link>

//         {/* Hamburger for mobile */}
//         <button
//           className="navbar-toggler bg-light"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#headerNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Nav links */}
//         <div className="collapse navbar-collapse" id="headerNav">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
//             <li className="nav-item">
//               <NavLink
//                 to={homePath}
//                 className={({ isActive }) =>
//                   `nav-link px-3 nav-hover ${
//                     isActive ? "active-link" : "text-light opacity-75"
//                   }`
//                 }
//               >
//                 <i className="fas fa-house"></i> Home
//               </NavLink>
//             </li>

//             <li className="nav-item">
//               <NavLink
//                 to="/products"
//                 className={({ isActive }) =>
//                   `nav-link px-3 nav-hover ${
//                     isActive ? "active-link" : "text-light opacity-75"
//                   }`
//                 }
//               >
//                 Products
//               </NavLink>
//             </li>

//             <li className="nav-item dropdown">
//               <span
//                 className="nav-link dropdown-toggle text-light opacity-75 nav-hover"
//                 role="button"
//                 data-bs-toggle="dropdown"
//               >
//                 Category
//               </span>
//               <ul className="dropdown-menu dropdown-menu-dark animate__animated animate__fadeIn">
//                 {categories.map((cat) => (
//                   <li key={cat.id}>
//                     <NavLink
//                       to={`/product/category/${cat.id}/${cat.name}`}
//                       className="dropdown-item"
//                     >
//                       {cat.name}
//                     </NavLink>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           </ul>

//           {/* Right-side role nav */}
//           <RoleNav />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;
