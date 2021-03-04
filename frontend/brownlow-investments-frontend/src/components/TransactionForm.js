import React, { Fragment } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import key from "../keys.js";

class TransactionForm extends React.Component {
  state = {
    symbol: null,
    quantity: null,
    account: [],
    bos: null,
  };

  componentDidMount() {
    this.getAccounts(localStorage);
  }

  getAccounts = (i) => {
    if (i == undefined) {
      fetch("http://localhost:3000/accounts")
        .then((res) => res.json())
        .then((res) => {
          let yourAccs = res.filter((acc) => acc.user_id == this.props.user.id);
          this.setState({
            account: yourAccs[0].id,
          });
        });
    } else {
      fetch("http://localhost:3000/accounts")
        .then((res) => res.json())
        .then((res) => {
          let yourAccs = res.filter((acc) => acc.user_id == parseInt(i.id));
          this.setState({
            account: yourAccs[0].id,
          });
        });
    }
  };

  handleBought = () => {
    this.setState({
      bos: "Bought",
    });
  };

  handleSold = () => {
    this.setState({
      bos: "Sold",
    });
  };

  onSymbolChange = (e) => {
    this.setState({
      symbol: e.target.value,
    });
  };

  onAccChange = (e) => {
    this.setState({
      account: e.target.value,
    });
  };

  onQuantityChange = (e) => {
    if (e.target.value) {
      this.setState({
        quantity: e.target.value,
      });
    } else {
      this.setState({
        quantity: 0,
      });
    }
  };

  createT = (e) => {
    e.preventDefault();
    let tickerPrice = 0.0;
    fetch(
      `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${this.state.symbol}?&apiKey=ijnvwxgPJOuMRmP4d7CwnSTy8sLpX1Lq`
    )
      .then((res) => res.json())
      .then((res) => {
        tickerPrice = res.ticker.lastQuote.P;
        this.props.postTransaction({
          symbol: this.state.symbol,
          quantity: this.state.quantity,
          account: parseInt(this.state.account),
          bos: this.state.bos,
          price: tickerPrice,
        });
      });
  };

  render() {
    return (
      <Fragment>
        <Form onSubmit={(e) => this.createT(e)}>
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
                  {this.props.accounts &&
                    this.props.accounts.map((a) => (
                      <option value={`${a.id}`}>{a.name}</option>
                    ))}
                </Form.Control>
              </Row>
              <Row>
                <Col xs={4} className="tCol1">
                  <Button variant="dark" onClick={() => this.handleBought()}>
                    Bought
                  </Button>
                  <Button variant="dark" onClick={() => this.handleSold()}>
                    Sold
                  </Button>
                </Col>
                <Col className="tCol2">
                  <Button variant="dark" type="submit">
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

export default TransactionForm;
