import React, { Fragment } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

class AccountForm extends React.Component {
  state = {
    name: "",
    accountType: "Individual",
  };

  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onAccTypeChange = (e) => {
    this.setState({
      accountType: e.target.value,
    });
  };

  newAccount = () => {
    return { name: this.state.name, accountType: this.state.accountType };
  };

  render() {
    return (
      <Fragment>
        <div className="account-div">
          <Form
            onSubmit={(e) => {
              this.props.postAccount(e, this.newAccount());
            }}
          >
            <Row className="accForm">
              <Col>
                <Form.Label style={{ color: "#C0C0C0" }}>
                  New Account Brokerage
                </Form.Label>
                <Form.Control
                  onChange={(e) => this.onNameChange(e)}
                  type="text"
                  style={{
                    backgroundColor: "#18191A",
                    borderColor: "#333333",
                    color: "#C0C0C0",
                  }}
                />
              </Col>
              <Col>
                <Form.Label style={{ color: "#C0C0C0" }}>
                  Account Type
                </Form.Label>
                <Form.Control
                  onChange={(e) => this.onAccTypeChange(e)}
                  as="select"
                  id="inlineFormCustomSelectPref"
                  custom
                  style={{
                    backgroundColor: "#18191A",
                    borderColor: "#333333",
                    color: "#C0C0C0",
                  }}
                >
                  <option value="Individual">Individual</option>
                  <option value="401k">401k</option>
                  <option value="IRA">IRA</option>
                </Form.Control>
              </Col>
              <Col className="accBtn">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default AccountForm;
