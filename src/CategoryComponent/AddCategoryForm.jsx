import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addCategoryAPI } from "../services/categoryService";

const AddCategoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  let navigate = useNavigate();

  const handleAddCategory = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!name.trim() || !description.trim()) {
      toast.error("Both Title and Description are required!", {
        position: "top-center",
        autoClose: 1500,
      });
      return;
    }

    const data = { name, description };

    try {
      const res = await addCategoryAPI(data);

      if (res.success) {
        toast.success(res.responseMessage, {
          position: "top-center",
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/user/admin/");
        }, 2000);
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
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div className="card m-5" style={{ width: "25rem" }}>
          <div className="container-fluid">
            <div
              className="card-header m-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "5px",
                backgroundColor: "rgba(209, 188, 231, 0.42)",
              }}
            >
              <h5 className="card-title">Add New Category</h5>
            </div>
            <div className="card-body mt-3">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    <b>Category Title</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="enter title.."
                    onChange={(e) => setName(e.target.value)}
                    value={name}
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
                    placeholder="enter description.."
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </div>

                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    onClick={handleAddCategory}
                    className="btn btn-cust text-light btn-md w-100"
                  >
                    Save
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

export default AddCategoryForm;
