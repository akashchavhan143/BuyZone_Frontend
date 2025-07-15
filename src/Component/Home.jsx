import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LatestProduct from "../ProductComponent/LatestProduct";
import { retrieveAllCategories } from "../services/categoryService";

// Static data for categories and products
// const categories = [
//   { name: "Fashion", image: "https://example.com/fashion.jpg" },
//   { name: "Electronics", image: "https://example.com/electronics.jpg" },
//   { name: "Home Appliances", image: "https://example.com/home_appliances.jpg" },
//   { name: "Sports", image: "https://example.com/sports.jpg" },
//   { name: "Books", image: "https://example.com/books.jpg" },
//   { name: "Toys", image: "https://example.com/toys.jpg" },
//   { name: "Furniture", image: "https://example.com/furniture.jpg" },
//   { name: "Beauty", image: "https://example.com/beauty.jpg" },
//   { name: "Watches", image: "https://example.com/watches.jpg" },
//   { name: "Groceries", image: "https://example.com/groceries.jpg" },
// ];
// real category start
// real category end

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      const allCategories = await retrieveAllCategories();
      if (allCategories) {
        setCategories(allCategories.categories);
      }
    };

    getAllCategories();
  }, []);

  return (
    <div>
      {/* Start Carousel */}
      <div className="container-fluid">
        <div className="card card-sh mt-2 p-1 btn-cust">
          <div
            id="carouselExample"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="2000"
            data-bs-pause="hover"
          >
            <div className="carousel-inner">
              <div className="carousel-item ">
                <img
                  src="https://cdn.prod.website-files.com/605826c62e8de87de744596e/6304972b0f458d536743e9d9_reebok.jpg"
                  className="d-block w-100"
                  alt="img1"
                />
              </div>
              {/* Add more static images */}
              <div className="carousel-item">
                <img
                  src="/Designer (1).jpeg"
                  className="d-block w-100"
                  alt="img2"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://img.freepik.com/free-vector/social-media-post-with-picture-blogger-video-like-sharing-repost-flat-vector-illustration_74855-10995.jpg?w=1060&t=st=1727640272~exp=1727640872~hmac=8b3ad890bfe4dd5269f306d17934b2557ff720e8bc838124a77b0978f4c2ab4d"
                  className="d-block w-100"
                  alt="img3"
                />
              </div>
              <div className="carousel-item ">
                <img
                  src="https://img.freepik.com/premium-photo/portrait-lazy-coworker-right-side-against-panoramic-orange-background-with-copy-space_1077802-438348.jpg?w=1060"
                  className="d-block w-100"
                  alt="img3"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/ecommerce-2140603_640.jpg"
                  className="d-block w-100"
                  alt="img3"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/Designer (2).jpeg"
                  className="d-block w-100"
                  alt="img3"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/Designer (3).jpeg"
                  className="d-block w-100"
                  alt="img3"
                />
              </div>
              <div className="carousel-item ">
                <img
                  src="/Designer (4).jpeg"
                  className="d-block w-100"
                  alt="img3"
                />
              </div>
              <div className="carousel-item active">
                <img
                  src="/Designer (5).jpeg"
                  className="d-block w-100"
                  alt="img3"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/Designer (6).jpeg"
                  className="d-block w-100"
                  alt="img3"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/Designer (7).jpeg"
                  className="d-block w-100"
                  alt="img3"
                />
              </div>

              <div className="carousel-item">
                <img
                  src="/Designer (1).jpeg"
                  className="d-block w-100"
                  alt="img3"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/b229a95edd3af8bd.webp"
                  className="d-block w-100"
                  alt="img3"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/2a11ef7d3cb7034e.webp"
                  className="d-block w-100"
                  alt="img3"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/0b4a118d86ae68c7.webp"
                  className="d-block w-100"
                  alt="img3"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      {/* End Carousel */}

      {/* Start Category Section */}
      <div className="container-fluid">
        <div className="col-md-12 card py-3 mt-1 btn-cust">
          <span className="text-center fs-4 fw-bold">CATEGORIES</span>
          <div className="row mt-1 m-3">
            <div
              className="d-flex flex-row"
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
                scrollbarWidth: "none",
              }}
            >
              {categories.map((category, index) => (
                <div
                  className="col my-3 mx-3 "
                  key={category.id}
                  style={{ flex: "0 0 auto" }}
                >
                  <Link
                    to={`/product/category/${category.id}/${category.name}`}
                    className="text-decoration-none text-dark"
                  >
                    <div
                      className="card card-sh hover-effect "
                      style={{
                        width: "160px",
                        height: "180px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#8c7cb3",
                      }}
                    >
                      <div
                        className="card rounded-circle card-sh card-im"
                        style={{
                          width: "110px",
                          height: "110px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className=" text-center">
                          <img
                            src={`/Designer (${index + 1}).jpeg`}
                            alt={category.name}
                            style={{ maxWidth: "110px", maxHeight: "110px" }}
                          />
                        </div>
                      </div>
                      <p className="text-center fw-bold mt-2">
                        {category.name}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* End Category Section */}

      <LatestProduct />
    </div>
  );
};

export default Home;
