import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <Container className="mt-5 mb-5 p-4 bg-light rounded shadow">
      <h4 className="text-center mb-4">Contact Us</h4>
      <Row className="text-center">
        <Col md={4} className="mb-4">
          <FaPhoneAlt size={40} className="text-primary mb-3" />
          <h5>Phone</h5>
          <p>+1 (800) 123-4567</p>
        </Col>
        <Col md={4} className="mb-4">
          <FaEnvelope size={40} className="text-success mb-3" />
          <h5>Email</h5>
          <p>support@buyzone.com</p>
        </Col>
        <Col md={4} className="mb-4">
          <FaMapMarkerAlt size={40} className="text-danger mb-3" />
          <h5>Location</h5>
          <p>123 BuyZone St., Cityville, USA</p>
        </Col>
      </Row>

      <Row className="text-center mt-4">
        <Col md={4} className="mb-4">
          <FaFacebook size={40} className="text-primary mb-3" />
          <h5>Facebook</h5>
          <p>
            <a
              href="https://facebook.com/BuyZone"
              target="_blank"
              rel="noopener noreferrer"
            >
              facebook.com/BuyZone
            </a>
          </p>
        </Col>
        <Col md={4} className="mb-4">
          <FaTwitter size={40} className="text-info mb-3" />
          <h5>Twitter</h5>
          <p>
            <a
              href="https://twitter.com/BuyZone"
              target="_blank"
              rel="noopener noreferrer"
            >
              twitter.com/BuyZone
            </a>
          </p>
        </Col>
        <Col md={4} className="mb-4">
          <FaInstagram size={40} className="text-danger mb-3" />
          <h5>Instagram</h5>
          <p>
            <a
              href="https://instagram.com/BuyZone"
              target="_blank"
              rel="noopener noreferrer"
            >
              instagram.com/BuyZone
            </a>
          </p>
        </Col>
      </Row>

      <Row className="text-center mt-4">
        <Col md={12}>
          <h5>Working Hours</h5>
          <p>Monday - Friday: 9 AM - 6 PM</p>
          <p>Saturday - Sunday: 10 AM - 4 PM</p>
        </Col>
      </Row>

      <Row className="text-center mt-4">
        <Col>
          <p className="text-muted">
            We value your feedback, questions, and inquiries. Whether you need
            assistance with an order or just want to connect, our team is here
            to help. Your satisfaction is our priority!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
