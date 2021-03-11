import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../img/111.png";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row style={{ justifyContent: "center" }}>
            <img style={{ width: 400, height: 400 }} src={logo}></img>
          </Row>
        </Container>
        <div className="s2">
          <Row>
            <Col>
              <div className="p-front">
                <p className="s3">
                  Rocket Investments is a react application that allows
                  investors to track their cummulitive portfolio performance,
                  without the hastle of swtiching between brokerage sites.
                </p>
              </div>
            </Col>
            <Col>
              <div className="p-front">
                <p className="s">
                  Track all your accounts, and get the news on your investments
                  all in one convenient and easy to use app.
                </p>
              </div>
            </Col>
            <Col>
              <div className="p-front">
                <p className="s">
                  Created by Dain Brownlow for Flatiron School's Personal
                  Capstone Project. Utilizes Polygon API for stock market data,
                  and a Ruby on Rails backend/database framework.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Home;
