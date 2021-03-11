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
            <Form.Label style={{ color: "#E4E6EB" }}>
              {this.props.ioo}
            </Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              name="username"
              placeholder="Username..."
              style={{
                backgroundColor: "#494d50",
                borderColor: "#333333",
                color: "#C0C0C0",
                boxShadow:
                  "3px 0px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)",
              }}
            />
            <br />
            <Form.Label style={{ color: "#E4E6EB" }}>Password</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="password"
              name="password"
              placeholder="Password..."
              style={{
                backgroundColor: "#494d50",
                borderColor: "#333333",
                color: "#C0C0C0",
                boxShadow:
                  "3px 0px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)",
              }}
            />
            <br />
            <Button className="btn-shadow" variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Login;
