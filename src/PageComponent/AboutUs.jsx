import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const AboutUs = () => {
  return (
    <section className="about-us py-5">
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <h1 className="display-4">About BuyZone</h1>
            <p className="lead">
              Welcome to BuyZone, your one-stop shop for all things fashion,
              electronics, and lifestyle.
            </p>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col md={6} className="mb-4 ">
            <img
              src="/ecom.jpeg"
              alt="About BuyZone"
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col md={6}>
            <Card className="shadow border-0">
              <Card.Body>
                <h3>Who We Are</h3>
                <p>
                  BuyZone was founded with the goal of providing top-quality
                  products at unbeatable prices. We are committed to offering a
                  seamless shopping experience with exceptional customer
                  service.
                </p>
                <h3>Our Vision</h3>
                <p>
                  To become the leading e-commerce platform known for
                  innovation, quality, and customer satisfaction.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
