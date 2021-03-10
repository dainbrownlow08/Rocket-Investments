import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Plot from "react-plotly.js";
import StockForm from "./StockForm.js";
import AccountForm from "./AccountForm.js";
import CashForm from "./CashForm.js";
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
    dayCash: null,
    cashDisplay: false,
    cashName: null,
    cashHash: {},
    tickerNews: [],
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

  toggleCashDisplay = (e) => {
    if (!this.state.cashDisplay) {
      this.getCash(this.state.dayId[e.target.textContent]);
      let newCashHash = { ...this.state.cashHash };
      newCashHash[this.state.dayId[e.target.textContent]] = 1;
      let name = e.target.textContent;
      let newCashDisplay = !this.state.cashDisplay;
      this.setState({
        cashDisplay: newCashDisplay,
        cashName: name,
        cashHash: newCashHash,
      });
    } else {
      if (this.state.cashHash[this.state.dayId[e.target.textContent]]) {
        this.getCash(this.state.dayId[e.target.textContent]);
        let newCashDisplay = !this.state.cashDisplay;
        this.setState({
          cashDisplay: newCashDisplay,
          cashHash: {},
        });
      } else {
        let newCashHash = { ...this.state.cashHash };
        newCashHash[this.state.dayId[e.target.textContent]] = 1;
        let day = this.getCash(this.state.dayId[e.target.textContent]);
        let name = e.target.textContent;
        this.setState({
          cashName: name,
          cashHash: newCashHash,
        });
      }
    }
  };

  // GETS

  getCash = (dayId) => {
    fetch(`http://localhost:3000/days/${dayId}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dayCash: data,
        });
      });
  };

  getAccounts = (i) => {
    if (i == undefined) {
      fetch("http://localhost:3000/accounts")
        .then((res) => res.json())
        .then((res) => {
          this.getTickerNews(localStorage);
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
          this.getTickerNews(localStorage);
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

  getTickerNews = (i) => {
    if (i == undefined) {
      fetch(`http://localhost:3000/users/news/${this.props.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          let index = 0;
          if (data.length > 0) {
            for (let i = 0; i <= data.length; i++) {
              fetch(
                `https://api.polygon.io/v1/meta/symbols/${data[i]}/news?perpage=50&page=1&apiKey=${key}`
              )
                .then((res) => res.json())
                .then((data) => {
                  if (data[i] != undefined) {
                    let article = {
                      title: data[i].title,
                      url: data[i].url,
                      summary: data[i].summary,
                    };
                    this.setState({
                      tickerNews: [...this.state.tickerNews, article],
                    });
                  }
                  index += 1;
                });
            }
          }
        });
    } else {
      fetch(`http://localhost:3000/users/news/${i.id}`)
        .then((res) => res.json())
        .then((data) => {
          let index = 0;
          if (data.length > 0) {
            for (let i = 0; i <= data.length; i++) {
              fetch(
                `https://api.polygon.io/v1/meta/symbols/${data[i]}/news?perpage=50&page=1&apiKey=${key}`
              )
                .then((res) => res.json())
                .then((data) => {
                  if (data[i] != undefined) {
                    let article = {
                      title: data[i].title,
                      url: data[i].url,
                      summary: data[i].summary,
                    };
                    this.setState({
                      tickerNews: [...this.state.tickerNews, article],
                    });
                  }
                  index += 1;
                });
            }
          }
        });
    }
  };

  createDays = () => {
    this.state.accounts.length > 0 &&
      fetch(`http://localhost:3000/accounts/${this.state.accountId}`)
        .then((res) => res.json())
        .then((res) => {
          if (Object.keys(res).length == 0) {
            this.getPlotPoints(localStorage);
            console.log("stocks utd");
          } else {
            debugger;
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
          xVals.push(xs.toString());
        }
        // sort xVals here
        xVals = xVals.sort((a, b) => (a < b ? -1 : 1));
        xVals.forEach((date) => {
          yVals.push(dayTotals[date]);
        });
        xVals = xVals.map((date) => date.split(" ")[0]);
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

  postTransaction = (e, data) => {
    e.preventDefault();
    this.setState({
      cashDisplay: false,
    });
    fetch(`http://localhost:3000/days/${this.state.dayCash.id}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        debugger;
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
              <div onClick={this.toggleAccountDisplay} className="ptab2">
                <p className="tab-text">
                  {this.state.accountDisplay ? "-" : "+"}
                </p>
              </div>
            </Col>
            {this.state.accounts?.map((a) => (
              <Col>
                <div onClick={this.toggleCashDisplay} className="tab">
                  <p className="tab-text">{a.name}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <Row>
          {this.state.cashDisplay ? (
            <CashForm
              name={this.state.cashName}
              dayId={this.state.dayId[this.state.cashName]}
              postTransaction={this.postTransaction}
            />
          ) : null}
        </Row>
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
                      marker: { color: "#0275d8", size: 2 },
                    },
                  ]}
                  layout={{
                    title: "Total Performance",
                    color: "red",
                    width: 736,
                    height: 450,
                    paper_bgcolor: "rgba(0,0,0,0)",
                    plot_bgcolor: "rgba(0,0,0,0)",
                    xaxis: {
                      showgrid: false,
                      visible: true,
                    },
                    yaxis: {
                      showgrid: true,
                      showline: false,
                      gridcolor: "#3d4042",
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
                    title: "Asset Allocation",
                    paper_bgcolor: "rgba(0,0,0,0)",
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <div>
              <h4>Your Ticker News</h4>
            </div>
          </Row>
          <Row>
            {this.state.tickerNews.length > 0
              ? this.state.tickerNews.slice(0, 2).map((a) => (
                  <Col>
                    <div className="flex-news">
                      <a href={`${a.url}`}>{a.title}</a>
                      <p>{a.summary}</p>
                    </div>
                  </Col>
                ))
              : null}
            <div style={{ width: 30 }}></div>
          </Row>
          <Row>
            {this.state.tickerNews.length > 0
              ? this.state.tickerNews.slice(2).map((a) => (
                  <Col>
                    <div className="flex-news">
                      <a href={`${a.url}`}>{a.title}</a>
                      <p>{a.summary}</p>
                    </div>
                  </Col>
                ))
              : null}
            <div style={{ width: 30 }}></div>
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
