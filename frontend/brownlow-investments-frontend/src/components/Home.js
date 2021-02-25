import React from "react";
import { Container, Row } from "react-bootstrap";
import logo from "../img/111.png";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row style={{ justifyContent: "center" }}>
            <img style={{ width: 500, height: 500 }} src={logo}></img>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
