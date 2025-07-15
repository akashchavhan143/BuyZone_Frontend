import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

import { updateCategoryAPI } from "../services/categoryService";

const UpdateCategoryForm = () => {
  const location = useLocation();
  const category = location.state;
  const navigate = useNavigate();

  const [id, setId] = useState(category.id);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!name.trim() || !description.trim()) {
      toast.error("Both Title and Description are required!", {
        position: "top-center",
        autoClose: 1500,
      });
      return;
    }

    const data = { id, name, description };

    try {
      const res = await updateCategoryAPI(data);
      if (res.success) {
        toast.success(res.responseMessage, {
          position: "top-center",
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/admin/category/all");
        }, 1000);
      } else {
        toast.error(res.responseMessage || "Something went wrong", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("It seems server is down", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="mt-4 d-flex justify-content-center align-items-center">
      <div className="card m-4 shadow-sm" style={{ width: "25rem" }}>
        <div className="container-fluid">
          <div
            className="card-header mt-2 d-flex justify-content-center align-items-center"
            style={{
              borderRadius: "5px",
              backgroundColor: "rgba(209, 188, 231, 0.42)",
            }}
          >
            <h5 className="card-title mb-0">Update Category</h5>
          </div>
          <div className="card-body mt-3">
            <form onSubmit={handleUpdateCategory}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  <b>Category Title</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter title.."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  <b>Category Description</b>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  placeholder="Enter description.."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-center mb-2">
                <button type="submit" className="btn btn-success w-100">
                  Update
                </button>
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryForm;
