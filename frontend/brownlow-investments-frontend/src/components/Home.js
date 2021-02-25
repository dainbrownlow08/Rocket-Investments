import React from "react";
import { Container, Row } from "react-bootstrap";
import bi_logo from "../img/bi_logo.png";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row style={{ textAlign: "center" }}>
            <img style={{ width: 854, height: 175 }} src={bi_logo}></img>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
