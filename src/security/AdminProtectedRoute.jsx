import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const admin = sessionStorage.getItem("active-admin");
  const seller = sessionStorage.getItem("active-seller");
  const delivery = sessionStorage.getItem("active-delivery");

  if (!admin) {
    // Redirect to the login page if no admin is logged in
    if (seller) {
      return <Navigate to="/seller/" />;
    } else if (delivery) {
      return <Navigate to="/delivery/" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default AdminProtectedRoute;
