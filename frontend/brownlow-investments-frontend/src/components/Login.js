import React from "react";
import { Form, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <Container>
          <Form
            onSubmit={(e) => {
              this.props.handleLoginOrSignup(e, this.state);
            }}
          >
            <Form.Label style={{ color: "#C0C0C0" }}>Username</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              name="username"
              placeholder="Username..."
              style={{
                backgroundColor: "#181818",
                borderColor: "#333333",
                color: "#C0C0C0",
              }}
            />
            <br />
            <Form.Label style={{ color: "#C0C0C0" }}>Password</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="password"
              name="password"
              placeholder="Password..."
              style={{
                backgroundColor: "#181818",
                borderColor: "#333333",
                color: "#C0C0C0",
              }}
            />
            <br />
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Login;
