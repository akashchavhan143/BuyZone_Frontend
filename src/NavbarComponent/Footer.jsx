import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light pt-3 container-fluid mt-5">
      <div className="container-fluid p-1 mt-3 bg-dark text-center text-white">
        <br /> <br /> <br />
        www.BuyZone.com
      </div>
      <div className="container ">
        <div className="row">
          {/* Sections */}
          <hr />
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="text-warning">ABOUT</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/contactus">Contact Us</Link>
              </li>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="#">Careers</Link>
              </li>
              <li>
                <Link to="#">BuyZone Stories</Link>
              </li>
              <li>
                <Link to="#">Press</Link>
              </li>
              <li>
                <Link to="#">BuyZone Wholesale</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-warning">HELP</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="#">Payments</Link>
              </li>
              <li>
                <Link to="#">Shipping</Link>
              </li>
              <li>
                <Link to="#">Cancellation & Returns</Link>
              </li>
              <li>
                <Link to="#">FAQ</Link>
              </li>
              <li>
                <Link to="#">Report Infringement</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-warning">POLICY</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="#">Return Policy</Link>
              </li>
              <li>
                <Link to="#">Terms Of Use</Link>
              </li>
              <li>
                <Link to="#">Security</Link>
              </li>
              <li>
                <Link to="#">Privacy</Link>
              </li>
              <li>
                <Link to="#">Sitemap</Link>
              </li>
              <li>
                <Link to="#">EPR Compliance</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-warning">FOLLOW US/SOCIAL</h5>
            <div className="social-icons">
              <Link to="#">
                <FaFacebookF className="text-light mx-2" />
              </Link>
              <Link to="#">
                <FaTwitter className="text-light mx-2" />
              </Link>
              <Link to="#">
                <FaYoutube className="text-light mx-2" />
              </Link>
              <Link to="#">
                <FaLinkedinIn className="text-light mx-2" />
              </Link>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <div className="footer-bottom">
              <div className="payment-methods">
                <img
                  src="https://img.icons8.com/color/48/000000/visa.png"
                  alt="Visa"
                />
                <img
                  src="https://img.icons8.com/color/48/000000/mastercard.png"
                  alt="MasterCard"
                />
                <img
                  src="https://img.icons8.com/color/48/000000/maestro.png"
                  alt="Maestro"
                />
                <img
                  src="https://img.icons8.com/color/48/000000/paypal.png"
                  alt="PayPal"
                />
                <img
                  src="https://img.icons8.com/color/48/000000/visa.png"
                  alt="Visa"
                />
                <img
                  src="https://img.icons8.com/color/48/000000/mastercard.png"
                  alt="MasterCard"
                />
                <img
                  src="https://img.icons8.com/color/48/000000/maestro.png"
                  alt="Maestro"
                />
                <img
                  src="https://img.icons8.com/color/48/000000/paypal.png"
                  alt="PayPal"
                />
              </div>
              <hr />
              <p>&copy; 2024 BuyZone. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
