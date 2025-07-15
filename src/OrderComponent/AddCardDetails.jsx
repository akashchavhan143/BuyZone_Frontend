import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { createOrder } from "../services/orderService";

const AddCardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const priceToPay = location.state.priceToPay;

  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const [card, setCard] = useState({
    cardName: "",
    cardNumber: "",
    validThrough: "",
    cvv: "",
  });

  const handleCardInput = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };
  
  const payForOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await createOrder(user.id);

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
          navigate("/home");
        }, 2000); // Redirect after 3 seconds
      } else if (!res.success) {
        toast.error(res.responseMessage, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 2000); // Redirect after 3 seconds
      } else {
        toast.error("It Seems Server is down!!!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 2000); // Redirect after 3 seconds
      }
    } catch (error) {
      console.error(error);
      toast.error("It seems server is down", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload(true);
      }, 1000); // Redirect after 3 seconds
    }
  };
  

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ">
        <div className="card col-10 col-sm-8 col-md-6 col-lg-4 mb-5">
          <div className="card-header btn-cust rounded m-2">
            <h5 className="card-title text-center">Payment Details</h5>
          </div>
          <div className="card-body">
            <form onSubmit={payForOrder}>
              <div className="mb-3">
                <label htmlFor="name" class="form-label">
                  <b> Name on Card</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="cardName"
                  onChange={handleCardInput}
                  value={card.cardName}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  <b> Card Number</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  name="cardNumber"
                  onChange={handleCardInput}
                  value={card.cardNumber}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="validThrough" className="form-label">
                  <b>Valid Through</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validThrough"
                  name="validThrough"
                  onChange={handleCardInput}
                  value={card.validThrough}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="cvv" className="form-label">
                  <b>CVV</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cvv"
                  name="cvv"
                  onChange={handleCardInput}
                  value={card.cvv}
                  required
                />
              </div>

              <input
                type="submit"
                className="btn btn-cust col-12"
                value={`Pay ₹ ${priceToPay}`}
              />

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardDetails;
