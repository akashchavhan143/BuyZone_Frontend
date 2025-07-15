import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import ProductCarousel from "../ProductComponent/ProductCarousel";
import { useLocation } from "react-router-dom";
import { addReviewAPI } from "../services/reviewService";

const AddProductReview = () => {
  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  const location = useLocation();
  const product = location.state;

  const [userId, setUserId] = useState(user.id);

  let { productId } = useParams();

  const [star, setStar] = useState("");
  const [review, setReview] = useState("");

  let navigate = useNavigate();

  const saveReview = async (e) => {
    if (user == null) {
      e.preventDefault();
      alert("Please login as Customer for adding your review!!!");
    } else {
      e.preventDefault();
      setUserId(user.id);
      let data = { userId, productId, star, review };
      try {
        const res = await addReviewAPI(data);
        if (res.success) {
          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate(
              "/product/" + product.id + "/category/" + product.category.id
            );
          }, 2000); // Redirect after 3 seconds
        } else {
          toast.error(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        console.error("Error in saveReview:", error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
    }
  };
  return (
    <div className="container mt-4 mb-5 ">
      <div className="row m-auto p-auto  justify-content-between r">
        <div className="col-md-7 order-2  order-md-1 mt-2 ">
          <div className=" card-img border-color card-sh">
            <ProductCarousel
              item={{
                image1: product.image1,
                image2: product.image2,
                image3: product.image3,
              }}
            />
          </div>
        </div>

        <div className="col-md-5 order-1 order-md-2 mt-2  ">
          <div className="card  border-color card-sh ">
            <div
              className="card-header bg-color text-center "
              style={{ backgroundColor: "#5e3e7a" }}
            >
              <h5 className="text-light">Add Product Review</h5>
            </div>
            <div
              className="card-body text-light"
              style={{ backgroundColor: "#7970a5" }}
            >
              <form
                onSubmit={saveReview}
                style={{ backgroundColor: "#7970a5", color: "#f0f0f0" }}
              >
                <div className="mb-3">
                  <label className="form-label">
                    <b>how many Star would you like rate ?</b>
                  </label>

                  <select
                    name="locationId"
                    onChange={(e) => {
                      setStar(e.target.value);
                    }}
                    className="form-control text-light"
                    style={{ backgroundColor: "#7070a5" }}
                    required
                  >
                    <option value="">Select Star</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="review" className="form-label">
                    <b>Write your Review here</b>
                  </label>
                  <textarea
                    style={{ backgroundColor: "#7170a5" }}
                    className="form-control"
                    id="review"
                    rows="3"
                    placeholder="enter review.."
                    onChange={(e) => {
                      setReview(e.target.value);
                    }}
                    value={review}
                  />
                </div>

                <div className="text-center">
                  <input
                    type="submit"
                    className="btn btn-light w-75 text-white my-3 "
                    style={{ backgroundColor: "#5e3e7a" }}
                    value="Add Review"
                    required
                  />
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

export default AddProductReview;
