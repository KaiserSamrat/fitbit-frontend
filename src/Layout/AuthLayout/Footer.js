import React from "react";
import { Col, Container, Row } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6} className="custom-footer">
              {new Date().getFullYear()} 
            </Col>
            <Col md={6} className="text-end">
              <div className="text-sm-right d-none d-sm-block">
               
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
