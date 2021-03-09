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
import Portfolio from "./components/Portfolio";

const API = "http://localhost:3000";

class App extends React.Component {
  state = {
    user: {},
    loggedIn: false,
  };

  componentDidMount() {
    const token = localStorage.token;
    if (token) {
      this.persistUser(token);
    }
    document.body.style.background = "#18191A";
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
          const username = data["username"];
          const id = data["id"];
          this.setState({
            user: {
              username,
              id,
            },
            loggedIn: true,
          });
        }
      });
  };

  handleAuthResponse = (data) => {
    if (data.username) {
      const { username, id, token } = data;
      this.setState({
        user: {
          username,
          id,
        },
        error: null,
        loggedIn: true,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("id", this.state.user.id);
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
    this.setState({
      user: {},
      loggedIn: false,
    });
  };

  render() {
    return (
      <Fragment>
        <Router>
          <Navigation handleLogout={this.handleLogout} user={this.state.user} />
          <div className="contrast"></div>
          <br />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              {this.state.loggedIn ? (
                <Redirect to="/portfolio" />
              ) : (
                <Login
                  ioo={"Username"}
                  handleLoginOrSignup={this.handleLogin}
                ></Login>
              )}
            </Route>
            <Route exact path="/signup">
              {this.state.loggedIn ? (
                <Redirect to="/portfolio" />
              ) : (
                <Login
                  ioo={"New Username"}
                  handleLoginOrSignup={this.handleSignup}
                ></Login>
              )}
            </Route>
            <Route exact path="/portfolio">
              <Portfolio user={this.state.user}></Portfolio>
            </Route>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;
