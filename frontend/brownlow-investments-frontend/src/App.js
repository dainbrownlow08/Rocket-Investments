//import { polygonClient, restClient, websocketClient } from "polygon.io";
import React from "react";
import { Fragment } from "react";
import "./App.css";
import { Alert, Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import history from "./history.js";

import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home.js";
import Navigation from "./components/Navigation.js";
import Login from "./components/Login";

const API = "http://localhost:3000";

class App extends React.Component {
  state = {
    user: {},
  };

  // getTicker = () => {
  //   fetch(
  //     `https://api.polygon.io/v1/open-close/AAPL/2021-02-24?unadjusted=true&apiKey=ijnvwxgPJOuMRmP4d7CwnSTy8sLpX1Lq`
  //   )
  //     .then((res) => res.json())
  //     .then(console.log);
  // };

  componentDidMount() {
    const token = localStorage.token;
    if (token) {
      this.persistUser(token);
    }
  }

  persistUser = (token) => {
    fetch(API + "/persist", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.username) {
          const { username } = data;
          this.setState({
            user: {
              username,
            },
          });
        }
      });
  };

  handleAuthResponse = (data) => {
    console.log(history);
    if (data.username) {
      const { username, id, token } = data;
      this.setState({
        user: {
          username,
          id,
        },
        error: null,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("id", this.state.user.id);
      history.push("/user");
    } else if (data.error) {
      this.setState({
        error: data.error,
      });
    }
  };

  handleLogin = (e, userInfo) => {
    e.preventDefault();

    fetch(API + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((resp) => resp.json())
      .then((data) => this.handleAuthResponse(data))
      .catch(console.log);
  };

  handleSignup = (e, userInfo) => {
    e.preventDefault();

    fetch(API + "/sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userInfo }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.handleAuthResponse(data);
      })
      .catch(console.log);
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({ user: {} });
    history.push("/");
  };

  render() {
    return (
      <Fragment>
        <Router>
          <div>
            <Navigation
              handleLogout={this.handleLogout}
              user={this.state.user}
            />
            <br />
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route exact path="/login">
                <Login handleLoginOrSignup={this.handleLogin}></Login>
              </Route>
              <Route exact path="/signup">
                <Login handleLoginOrSignup={this.handleSignup}></Login>
              </Route>
            </Switch>
          </div>
        </Router>
      </Fragment>
    );
  }
}

export default App;
