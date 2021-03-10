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
              <div className="cash-form-info">
                <div>
                  <p className="s">{this.props.name}</p>
                </div>
                <div>
                  <p className="s">
                    Available ${parseFloat(this.state.dayCash.cash).toFixed(2)}
                  </p>
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
                    backgroundColor: "#494d50",
                    borderColor: "#333333",
                    color: "#C0C0C0",
                    boxShadow:
                      "3px 0px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)",
                  }}
                />
              </Col>
              <Col className="accBtn">
                <Row>
                  <div className="cash-btn">
                    <Button
                      className="btn-shadow"
                      onClick={() => this.handleDeposit()}
                      variant="dark"
                    >
                      Deposit
                    </Button>
                  </div>
                  <Button
                    className="btn-shadow"
                    onClick={() => this.handleWithdrawal()}
                    variant="dark"
                  >
                    Withdraw
                  </Button>
                </Row>
              </Col>
              <Col className="accBtn">
                <Button className="btn-shadow" variant="dark" type="submit">
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
