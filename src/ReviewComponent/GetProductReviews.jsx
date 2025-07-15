import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import star from "../images/star.png";
import { getReviewsByProductId } from "../services/reviewService";

const GetProductReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("0.0");

  const { productId } = useParams();

  const getAllReviews = async () => {
    try {
      const response = await getReviewsByProductId(productId);
      if (response) {
        setReviews(response.reviews);
        setRating(response.averageRating);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    getAllReviews();
  }, [productId]);

  return (
    <div
      className="list-group  "
      style={{
        height: "30rem",
      }}
    >
      <div className="list-group-item  ">
        <div className="fs-4 ">
          {" "}
          Rating:
          {rating > 3 ? (
            <p className="text-success fs-2 fw-bold">
              {" "}
              {rating} /5 <i className="fa-solid fa-star me-2"></i>
            </p>
          ) : (
            <p className="text-danger fs-2 fw-bold">
              {" "}
              {rating} /5 <i className="fa-solid fa-star me-2"></i>
            </p>
          )}
        </div>
      </div>
      <div
        style={{
          overflowY: "auto",
        }}
      >
        {reviews.map((review) => {
          return (
            <div
              key={review.id}
              className="list-group-item list-group-item-action "
            >
              <b className="text-color1">{review.user.firstName + " "}</b>
              <b className="text-color">{review.star + " /5 "}</b>
              <img
                src={star}
                width="20"
                height="20"
                className="d-inline-block align-top"
                alt=""
              />
              <br />
              <p>{review.review}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GetProductReviews;
