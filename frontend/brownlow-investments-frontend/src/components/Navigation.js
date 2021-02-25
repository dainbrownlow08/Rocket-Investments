import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import r_i_2 from "../img/r_i_2.png";

function Navigation(props) {
  console.log(props);
  return (
    <Fragment>
      <Navbar style={{ backgroundColor: "#242526" }}>
        <LinkContainer style={{ color: "#C0C0C0" }} to="/">
          <Navbar.Brand>
            <img style={{ width: 168, height: 50 }} src={r_i_2}></img>
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="ml-auto">
          {props.user.username == undefined ? (
            <Fragment>
              <br />
              <LinkContainer style={{ color: "black" }} to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer style={{ color: "black" }} to="/signup">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </Fragment>
          ) : (
            <Fragment>
              <LinkContainer style={{ color: "#C0C0C0" }} to="/">
                <Nav.Link onClick={props.handleLogout}>Log Out</Nav.Link>
              </LinkContainer>
            </Fragment>
          )}
        </Nav>
      </Navbar>
    </Fragment>
  );
}

export default Navigation;
