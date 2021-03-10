import React, { Fragment } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

class CashForm extends React.Component {
  state = {
    amount: 0.0,
    dow: "",
    dayCash: {},
  };

  componentDidMount() {
    this.getCash(this.props.dayId);
  }

  getCash = (dayId) => {
    fetch(`http://localhost:3000/days/${dayId}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dayCash: data,
        });
      });
  };

  onAmountChange = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  handleWithdrawal = () => {
    this.setState({
      dow: "Withdrawal",
    });
  };

  handleDeposit = () => {
    this.setState({
      dow: "Deposit",
    });
  };

  newTransaction = () => {
    return { amount: this.state.amount, dow: this.state.dow };
  };

  render() {
    return (
      <Fragment>
        <div className="account-div">
          <Form
            onSubmit={(e) => {
              this.props.postTransaction(e, this.newTransaction());
            }}
          >
            <Row className="accForm">
              <div>
                <div>
                  <p>{this.props.name}</p>
                </div>
                <div>
                  <p>${parseFloat(this.state.dayCash.cash).toFixed(2)}</p>
                </div>
              </div>
              <Col>
                <Form.Label style={{ color: "#C0C0C0" }}>
                  Deposit/Withdrawal Total
                </Form.Label>
                <Form.Control
                  onChange={(e) => this.onAmountChange(e)}
                  type="text"
                  style={{
                    backgroundColor: "#18191A",
                    borderColor: "#333333",
                    color: "#C0C0C0",
                  }}
                />
              </Col>
              <Col className="accBtn">
                <Button onClick={() => this.handleDeposit()} variant="primary">
                  Deposit
                </Button>
                <Button
                  onClick={() => this.handleWithdrawal()}
                  variant="primary"
                >
                  Withdraw
                </Button>
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

export default CashForm;
