import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Plot from "react-plotly.js";
import TransactionForm from "./TransactionForm.js";
import AccountForm from "./AccountForm.js";

class Portfolio extends React.Component {
  state = {
    accountDisplay: false,
    accounts: [],
  };

  componentDidMount() {
    this.getAccounts(localStorage);
  }

  toggleAccountDisplay = () => {
    let newAccountDisplay = !this.state.accountDisplay;
    this.setState({
      accountDisplay: newAccountDisplay,
    });
  };

  postAccount = (e, account) => {
    e.preventDefault();
    this.setState({
      accountDisplay: false,
    });
    let newAccount = { ...account, user_id: this.props.user.id };
    fetch("http://localhost:3000/accounts", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
    })
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          accounts: [...this.state.accounts, res],
        })
      );
  };

  getAccounts = (i) => {
    if (i == undefined) {
      fetch("http://localhost:3000/accounts")
        .then((res) => res.json())
        .then((res) => {
          let yourAccs = res.filter((acc) => acc.user_id == this.props.user.id);
          this.setState({
            accounts: yourAccs,
          });
        });
    } else {
      fetch("http://localhost:3000/accounts")
        .then((res) => res.json())
        .then((res) => {
          let yourAccs = res.filter((acc) => acc.user_id == parseInt(i.id));
          this.setState({
            accounts: yourAccs,
          });
        });
    }
  };

  postTransaction = (e, transaction) => {
    e.preventDefault();
    fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  render() {
    return (
      <div>
        <div className="tabs-div">
          <Row>
            <Col xs={1}>
              <div id="account-tab">
                <p className="tab-text">Accounts</p>
              </div>
            </Col>
            <Col>
              <div onClick={this.toggleAccountDisplay} className="ptab">
                <p className="tab-text">+</p>
              </div>
            </Col>
            {this.state.accounts?.map((a) => (
              <Col>
                <div className="tab">
                  <p className="tab-text">{a.name}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <Row>
          {this.state.accountDisplay ? (
            <AccountForm postAccount={this.postAccount} />
          ) : null}
        </Row>
        <Row>
          <div className="form-div">
            <TransactionForm
              getAccounts={this.getAccounts}
              accounts={this.state.accounts}
              user={this.props.user}
              postTransaction={this.postTransaction}
            ></TransactionForm>
          </div>
        </Row>
        <div className="data-container">
          <Row>
            <Col>
              <div className="scatter-div">
                <Plot
                  data={[
                    {
                      x: [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        20,
                        21,
                        22,
                        23,
                        24,
                        25,
                        26,
                        27,
                        28,
                        29,
                        30,
                        31,
                        32,
                        33,
                        34,
                        35,
                        36,
                        37,
                        38,
                        39,
                        40,
                        41,
                      ],
                      y: [
                        2,
                        3,
                        4,
                        6,
                        10,
                        11,
                        12,
                        15,
                        10,
                        9,
                        13,
                        14,
                        17,
                        21,
                        27,
                        28,
                        24,
                        29,
                        41,
                        40,
                        44,
                        47,
                        51,
                        40,
                        39,
                        38,
                        43,
                        51,
                        54,
                        59,
                        39,
                        63,
                        60,
                        71,
                        79,
                        79,
                        79,
                        79,
                        81,
                        77,
                        88,
                      ],
                      type: "scatter",
                      fill: "tozeroy",
                      mode: "lines+markers",
                      marker: { color: "#23487d", size: 2 },
                    },
                  ]}
                  layout={{
                    width: 736,
                    height: 450,
                    paper_bgcolor: "rgba(0,0,0,0)",
                    plot_bgcolor: "rgba(0,0,0,0)",
                    xaxis: {
                      showgrid: false,
                      visible: false,
                    },
                    yaxis: {
                      showgrid: true,
                      showline: false,
                      gridcolor: "#323232",
                    },
                  }}
                />
              </div>
            </Col>
            <Col>
              <div className="pie-div">
                <Plot
                  data={[
                    {
                      values: [414, 916, 755, 20, 100, 14, 17, 18, 12],
                      labels: [
                        "Information Technology",
                        "Minerals",
                        "Banking",
                        "d",
                        "e",
                        "f",
                        "g",
                        "h",
                        "i",
                        "j",
                        "k",
                      ],
                      "marker": {
                        "colors": ["rgb(95, 158, 160)"],
                      },
                      type: "pie",
                      opacity: 0.8,
                    },
                  ]}
                  layout={{
                    height: 400,
                    width: 500,
                    title: "Sector Distribution",
                    paper_bgcolor: "rgba(0,0,0,0)",
                  }}
                />
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default Portfolio;
