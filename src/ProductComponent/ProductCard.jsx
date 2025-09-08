import { Link } from "react-router-dom";
import { useState } from "react";
// import CategoryNavigator from "../CategoryComponent/CategoryNavigator";

const ProductCard = (product) => {
  const [isLiked, setIsLiked] = useState(false);
  const descriptionToShow = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      const truncatedText = description.substring(0, maxLength);
      return truncatedText + "...";
    }
  };

  //remove if want
  const handleShare = (product) => {
    if (navigator.share) {
      navigator
        .share({
          title: product.title,
          text: product.description,
          url:
            window.location.origin +
            `/product/${product.item.id}/category/${product.item.category.id}`,
        })
        .then(() => console.log("Product shared successfully"))
        .catch((error) => console.error("Error sharing the product:", error));
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  return (
    <>
      {/* new card start */}
      <div
        className="card col-md-3  mx-auto mx-md-2  hover-effect1 text-center mb-3"
        style={{ width: "18rem" }}
      >
        <div className="card-img">
          <img
            src={product.item.image1}
            className="card-img-top d-block w-100"
            alt={product.title}
          />

          {/* Action buttons */}
          <div className="position-absolute top-0 start-0 end-0 d-flex justify-content-between p-2">
            {/* Like button */}
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`btn ${isLiked ? 'btn-danger' : 'btn-outline-danger'}`}
              style={{
                borderRadius: '20px',
                fontSize: '12px',
                padding: '5px 10px',
                transition: 'all 0.3s ease'
              }}
            >
              <i className={`${isLiked ? 'fas' : 'far'} fa-heart`}></i>
              <span className="d-none d-sm-inline ms-1">{isLiked ? 'Liked' : 'Like'}</span>
            </button>

            {/* Share button */}
            <button
              onClick={() => handleShare(product)}
              className="btn btn-outline-primary"
              style={{
                borderRadius: '20px',
                fontSize: '12px',
                padding: '5px 10px',
                transition: 'all 0.3s ease'
              }}
            >
              <i className="fas fa-share"></i>
              <span className="d-none d-sm-inline ms-1">Share</span>
            </button>
          </div>
        </div>
        <div className="  ">
          <h5 className="card-title text-uppercase text-truncate-3-lines">
            {product.item.name}
          </h5>
          <span className="card-text text-truncate-3-lines">
            {descriptionToShow(product.item.description, 50)}
          </span>
          <br />
          <span className="fs-4 fw-medium">₹{product.item.price}</span>
          <div className="mb-1 ">
            <s className="fs-6 fw-light">₹{product.item.price}</s>
            <span className="text-success"> 00% Off</span>
          </div>
          <span>Status: </span>
          {product.item.quantity > 0 ? (
            <span className="badge bg-success">Available</span>
          ) : (
            <span className="badge bg-danger">Out of Stock</span>
          )}
          <div className="col-sm-8 mx-auto">
            <Link
              to={`/product/${product.item.id}/category/${product.item.category.id}`}
              className="btn btn-cust btn-block w-100 my-2"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
      {/* new card end */}

      {/* //old card start */}
      {/* <div className="col">
        <div class="card product-card rounded-card custom-bg h-100 shadow-lg ">
          <img
            src={"http://localhost:8080/api/product/" + product.item.image1}
            class="card-img-top img-fluid rounded"
            alt="img"
            style={{
              maxHeight: "300px", // Adjust the maximum height as needed
              width: "auto",
              margin: "0 auto",
            }}
          />

          <div class="card-body text-color">
            <h5>
              Category:{" "}
              <CategoryNavigator
                item={{
                  id: product.item.category.id,
                  name: product.item.category.name,
                }}
              />
            </h5>
            <h5 class="card-title d-flex justify-content-between">
              <div>
                <b>{product.item.name}</b>
              </div>
            </h5>
            <p className="card-text">
              <b>{descriptionToShow(product.item.description, 50)}</b>
            </p>
          </div>
          <div class="card-footer">
            <div className="d-flex justify-content-between mt-2">
              <Link
                to={`/product/${product.item.id}/category/${product.item.category.id}`}
                className="btn bg-color custom-bg-text"
              >
                view Details
              </Link>

              <div className="text-color">
                <p>
                  <span>
                    <h4>Price : &#8377;{product.item.price}</h4>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* old card end */}
    </>
  );
};

export default ProductCard;
