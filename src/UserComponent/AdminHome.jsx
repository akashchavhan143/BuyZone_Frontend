import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const cardBaseStyle = {
  borderRadius: "14px",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  padding: "20px",
  transition: "all 0.3s ease-in-out",
  cursor: "pointer",
  transform: "scale(1)",
  border: "none",
};

const AdminHome = () => {
  const cardList = [
    {
      label: "VIEW CATEGORY",
      to: "/admin/category/all",
      icon: "fa-list",
      color: "#4dabf7", // Blue
    },
    {
      label: "ADD CATEGORY",
      to: "/category/add",
      icon: "fa-square-plus",
      color: "#38d9a9", // Teal
    },
    {
      label: "VIEW PRODUCTS",
      to: "/admin/product/all",
      icon: "fa-table-list",
      color: "#ffa94d", // Orange
    },
    {
      label: "ADD ADMIN",
      to: "/user/admin/register",
      icon: "fa-user-plus",
      color: "#f06595", // Pink
    },
    {
      label: "ORDERS",
      to: "/admin/order/all",
      icon: "fa-box-open",
      color: "#fab005", // Yellow
    },
    {
      label: "CUSTOMERS",
      to: "/admin/customer/all",
      icon: "fa-users",
      color: "#5c7cfa", // Indigo
    },
    {
      label: "SELLERS",
      to: "/admin/seller/all",
      icon: "fa-store",
      color: "#82c91e", // Lime
    },
    {
      label: "DELIVERY PERSONS",
      to: "/admin/delivery-person/all",
      icon: "fa-truck",
      color: "#20c997", // Mint
    },
    {
      label: "USERS",
      to: "/admin/customer/all",
      icon: "fa-user-circle",
      color: "#e64980", // Rose
    },
  ];

  return (
    <div className="container-fluid py-4">
      <h2 className="text-center mb-2" style={{ color: "#343a40" }}>
        🚀 Admin Dashboard
      </h2>

      <div className="row justify-content-center px-5">
        {cardList.map((item, index) => (
          <div className="col-md-4 col-sm-6 mb-4 px-4" key={index}>
            <Link to={item.to} className="text-decoration-none">
              <div
                className="text-center"
                style={{ ...cardBaseStyle }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = `0 0 15px ${item.color}`;
                  e.currentTarget.style.border = `2px solid ${item.color}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.08)";
                  e.currentTarget.style.border = "none";
                }}
              >
                <i
                  className={`fa-solid ${item.icon} fa-3x`}
                  style={{ color: item.color, marginBottom: "10px" }}
                ></i>
                <h5 style={{ color: "#212529", marginTop: "10px" }}>
                  {item.label}
                </h5>
                <hr
                  style={{
                    width: "50%",
                    margin: "10px auto",
                    borderTop: `2px dashed ${item.color}`,
                  }}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
