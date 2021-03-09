import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Plot from "react-plotly.js";
import StockForm from "./StockForm.js";
import AccountForm from "./AccountForm.js";
import { key } from "../keys.js";

class Portfolio extends React.Component {
  state = {
    accountDisplay: false,
    accounts: [],
    accountId: [],
    dayId: {},
    plotXs: [],
    plotYs: [],
    pieUnits: [],
    pieVals: [],
  };

  componentDidMount() {
    this.getAccounts(localStorage);
  }

  // TOGGLES

  toggleAccountDisplay = () => {
    let newAccountDisplay = !this.state.accountDisplay;
    this.setState({
      accountDisplay: newAccountDisplay,
    });
  };

  // GETS

  getAccounts = (i) => {
    if (i == undefined) {
      fetch("http://localhost:3000/accounts")
        .then((res) => res.json())
        .then((res) => {
          let yourAccs = res.filter((acc) => acc.user_id == this.props.user.id);
          let accIds = yourAccs.map((acc) => acc.id);
          this.setState(
            {
              accounts: yourAccs,
              accountId: accIds,
            },
            () => this.createDays()
          );
        });
    } else {
      fetch("http://localhost:3000/accounts")
        .then((res) => res.json())
        .then((res) => {
          let yourAccs = res.filter((acc) => acc.user_id == parseInt(i.id));
          let accIds = yourAccs.map((acc) => acc.id);
          this.setState(
            {
              accounts: yourAccs,
              accountId: accIds,
            },
            () => this.createDays()
          );
        });
    }
  };

  createDays = () => {
    fetch(`http://localhost:3000/accounts/${this.state.accountId}`)
      .then((res) => res.json())
      .then((res) => {
        if (Object.keys(res).length == 0) {
          this.getPlotPoints(localStorage);
          console.log("stocks utd");
        } else {
          let counter = 0;
          for (let k in res) {
            for (let v in res[k]) {
              counter += 1;
            }
          }
          for (let k in res) {
            for (let v in res[k]) {
              fetch(
                `https://api.polygon.io/v2/aggs/ticker/${k}/prev?unadjusted=true&apiKey=${key}`
              )
                .then((res) => res.json())
                .then((json) => {
                  let tickerPrice = json.results[0].c;
                  fetch(`http://localhost:3000/stocks/${res[k][v]}`, {
                    method: "PATCH",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                      price: tickerPrice,
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      fetch(`http://localhost:3000/days`)
                        .then((res) => res.json())
                        .then((res) => {
                          if (!--counter) {
                            this.getPlotPoints(localStorage);
                          }
                        });
                    });
                });
            }
          }
        }
      });
  };

  getDayIds = (accountIds) => {
    if (!accountIds.length == 0) {
      fetch(`http://localhost:3000/accounts/days/${accountIds}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.setState({
            dayId: data,
          });
        });
    }
  };

  getDistro = (i) => {
    if (i == undefined) {
      fetch(`http://localhost:3000/users/distro/${this.props.user.id}`)
        .then((res) => res.json())
        .then(console.log);
    } else {
      fetch(`http://localhost:3000/users/distro/${i.id}`)
        .then((res) => res.json())
        .then((data) => {
          let newSectors = [];
          let newSectorNums = [];
          for (let k in data) {
            newSectors.push(k);
            newSectorNums.push(data[k]);
          }
          this.setState(
            {
              pieUnits: newSectors,
              pieVals: newSectorNums,
            },
            () => this.getDayIds(this.state.accountId)
          );
        });
    }
  };

  getPlotPoints = (i) => {
    let id = 0;
    if (i.id == undefined) {
      id = this.props.user.id;
    } else {
      id = i.id;
    }
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let dayTotals = {};
        for (let account in data) {
          for (let days in data[account]) {
            if (!dayTotals[days]) {
              dayTotals[days] = data[account][days];
            } else {
              dayTotals[days] += data[account][days];
            }
          }
        }
        let xVals = [];
        let yVals = [];
        for (let xs in dayTotals) {
          xVals.push(xs.toString().split(" ")[0]);
          yVals.push(parseFloat(dayTotals[xs]));
        }
        this.setState(
          {
            plotXs: xVals,
            plotYs: yVals,
          },
          () => this.getDistro(localStorage)
        );
      });
  };

  // POSTS

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
      .then((res) => {
        this.setState(
          {
            accounts: [...this.state.accounts, res],
            accountId: [...this.state.accountId, res.id],
          },
          () => {
            this.getDayIds(this.state.accountId);
          }
        );
      });
  };

  postStock = (data) => {
    fetch("http://localhost:3000/stocks", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.getPlotPoints(localStorage);
      });
  };

  // RENDER

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
            <StockForm
              user={this.props.user}
              postStock={this.postStock}
              accounts={this.state.accounts}
              dayId={this.state.dayId}
            ></StockForm>
          </div>
        </Row>
        <div className="data-container">
          <Row>
            <Col>
              <div className="scatter-div">
                <Plot
                  data={[
                    {
                      x: this.state.plotXs,
                      y: this.state.plotYs,
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
                      values: this.state.pieVals,
                      labels: this.state.pieUnits,
                      "marker": {},
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
