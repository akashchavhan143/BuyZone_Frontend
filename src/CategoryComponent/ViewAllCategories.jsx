import { useState, useEffect, useCallback } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteCategoryAPI,
  getAllCategoryAPI,
} from "../services/categoryService";

const ViewAllCategories = () => {
  const [allCategories, setAllCategories] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    const allCategories = await getAllCategoryAPI();
    if (allCategories) {
      setAllCategories(allCategories.categories);
    }
  };

  const handleDelete = useCallback(async (categoryId) => {
    try {
      const res = await deleteCategoryAPI(categoryId);

      if (res.success) {
        toast.success(res.responseMessage || "Category deleted successfully", {
          position: "top-center",
          autoClose: 1000,
        });
        getAllCategory(); // reload list after delete
      } else {
        toast.error(res.responseMessage || "Failed to Delete", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("It seems server is down", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  }, []);

  const updateCategory = (category) => {
    navigate("/admin/category/update", { state: category });
  };

  return (
    <div className="mt-3">
      <div
        className="card  ms-2 me-2 mb-5 custom-bg shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className=" text-center p-1 m-3"
          style={{
            borderRadius: "5px",
            background: "linear-gradient(to right,rgb(233, 232, 246), #e9ecef)",
          }}
        >
          <h2 className="">📁 ALL CATEGORIES</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover  ">
              <thead className="">
                <tr>
                  <th scope="col">Category Id</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Description</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {allCategories.map((category) => {
                  return (
                    <tr>
                      <td>
                        <b>{category.id}</b>
                      </td>
                      <td>{category.name}</td>
                      <td>{category.description}</td>

                      <td style={{ textAlign: "center" }}>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <button
                            onClick={() => updateCategory(category)}
                            className="btn btn-sm btn-success "
                          >
                            Update
                          </button>

                          <button
                            onClick={() => handleDelete(category.id)}
                            className="btn btn-sm btn-danger ms-2"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllCategories;
