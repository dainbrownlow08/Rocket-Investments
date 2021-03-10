import React, { Fragment } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { key } from "../keys.js";

class StockForm extends React.Component {
  state = {
    symbol: null,
    quantity: null,
    accounts: [],
    bos: null,
    days: {},
    day: [],
  };

  componentDidMount() {
    this.getAccounts(localStorage);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps != this.props) {
      this.getAccounts(localStorage);
    }
  }

  getDayIds = (accountIds) => {
    if (!accountIds.length == 0) {
      fetch(`http://localhost:3000/accounts/days/${accountIds}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            days: data,
            day: data[this.state.accounts[0].name],
          });
        });
    }
  };

  getAccounts = (i) => {
    if (i == undefined) {
      fetch("http://localhost:3000/accounts")
        .then((res) => res.json())
        .then((res) => {
          let yourAccs = res.filter((acc) => acc.user_id == this.props.user.id);
          if (yourAccs[0] == undefined) {
            this.setState({
              day: [],
            });
          } else {
            this.setState(
              {
                accounts: yourAccs,
              },
              () => {
                let ids = this.state.accounts.map((a) => a.id);
                this.getDayIds(ids);
              }
            );
          }
        });
    } else {
      fetch("http://localhost:3000/accounts")
        .then((res) => res.json())
        .then((res) => {
          let yourAccs = res.filter((acc) => acc.user_id == i.id);
          if (yourAccs[0] == undefined) {
            this.setState({
              day: [],
            });
          } else {
            this.setState(
              {
                accounts: yourAccs,
              },
              () => {
                let ids = this.state.accounts.map((a) => a.id);
                this.getDayIds(ids);
              }
            );
          }
        });
    }
  };

  handleBought = () => {
    let newQuantity = 0;
    if (this.state.quantity < 0) {
      newQuantity = parseInt(this.state.quantity) * -1;
    } else {
      newQuantity = parseInt(this.state.quantity);
    }
    this.setState({
      bos: "Bought",
      quantity: newQuantity,
    });
  };

  handleSold = () => {
    let newQuantity = 0;
    if (this.state.quantity > 0) {
      newQuantity = parseInt(this.state.quantity) * -1;
    } else {
      newQuantity = parseInt(this.state.quantity);
    }
    this.setState({
      bos: "Sold",
      quantity: newQuantity,
    });
  };

  onSymbolChange = (e) => {
    this.setState({
      symbol: e.target.value,
    });
  };

  onAccChange = (e) => {
    this.setState({
      day: parseInt(e.target.value),
    });
  };

  onQuantityChange = (e) => {
    if (e.target.value) {
      this.setState({
        quantity: parseInt(e.target.value),
      });
    } else {
      this.setState({
        quantity: 0,
      });
    }
  };

  createS = (e) => {
    e.preventDefault();
    let tickerPrice = 0.0;
    fetch(
      `https://api.polygon.io/v2/aggs/ticker/${this.state.symbol}/prev?unadjusted=true&apiKey=${key}`
    )
      .then((res) => res.json())
      .then((res) => {
        tickerPrice = res.results[0].c;
        fetch(
          `https://api.polygon.io/v1/meta/symbols/${this.state.symbol}/company?&apiKey=${key}`
        )
          .then((res) => res.json())
          .then((data) => {
            this.props.postStock({
              symbol: this.state.symbol,
              quantity: this.state.quantity,
              day: this.state.day,
              bos: this.state.bos,
              price: tickerPrice,
              sector: data.sector,
            });
          });
      });
  };

  render() {
    return (
      <Fragment>
        <Form onSubmit={(e) => this.createS(e)}>
          <Row>
            <Col>
              <Row className="tFormTL">
                <Form.Label style={{ color: "#C0C0C0" }}>Symbol</Form.Label>
                <Form.Control
                  onChange={(e) => this.onSymbolChange(e)}
                  type="text"
                  style={{
                    backgroundColor: "#18191A",
                    borderColor: "#333333",
                    color: "#C0C0C0",
                  }}
                />
              </Row>
              <Row className="tFormBL">
                <Form.Label style={{ color: "#C0C0C0" }}>Quantity</Form.Label>
                <Form.Control
                  onChange={(e) => this.onQuantityChange(e)}
                  type="text"
                  style={{
                    backgroundColor: "#18191A",
                    borderColor: "#333333",
                    color: "#C0C0C0",
                  }}
                />
              </Row>
            </Col>
            <Col>
              <Row className="tFormTR">
                <Form.Label
                  className="my-1 mr-2"
                  htmlFor="inlineFormCustomSelectPref"
                  style={{ color: "#C0C0C0" }}
                >
                  Account
                </Form.Label>
                <Form.Control
                  onChange={(e) => this.onAccChange(e)}
                  as="select"
                  id="inlineFormCustomSelectPref"
                  custom
                  style={{
                    backgroundColor: "#18191A",
                    borderColor: "#333333",
                    color: "#C0C0C0",
                  }}
                >
                  {this.props.accounts.length > 0
                    ? this.props.accounts.map((a) => (
                        <option value={`${this.props.dayId[a.name]}`}>
                          {a.name}
                        </option>
                      ))
                    : this.state.accounts.map((a) => (
                        <option value={`${this.state.days[a.name]}`}>
                          {a.name}
                        </option>
                      ))}
                </Form.Control>
              </Row>
              <Row>
                <Col xs={4} className="tCol1">
                  <Row className="stock-buttons">
                    <div>
                      <Button
                        variant="primary"
                        onClick={() => this.handleBought()}
                      >
                        Bought
                      </Button>
                    </div>
                    <div className="stock-button">
                      <Button
                        variant="primary"
                        onClick={() => this.handleSold()}
                      >
                        Sold
                      </Button>
                    </div>
                  </Row>
                </Col>
                <Col className="tCol2">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Fragment>
    );
  }
}

export default StockForm;
