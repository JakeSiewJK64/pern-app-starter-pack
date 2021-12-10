import "./App.css";
import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// components
import Customers from "./components/customers/customers";
import Pokemon from "./components/pokemon/pokemon";
import Home from "./components/home/home";
import Register from "./components/security/register/register";
import Login from "./components/security/login/login";

const logger = require("../../utils/logger");

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("/authentication/verify", {
        method: "POST",
        headers: {
          jwt_token: localStorage.token,
        },
      });

      const parseRes = await res.json();

      if (parseRes) {
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setIsAuthenticated(false);
      }
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      logger.log({
        level: "info",
        message: `${error.message}`,
      });
    }
  };

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return isLoading ? (
    <div>loading</div>
  ) : (
    <Fragment>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              isAuthenticated ? (
                <Home {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/authentication/login" />
              )
            }
          />
          <Route
            exact
            path="/customers"
            render={(props) =>
              isAuthenticated ? (
                <Customers {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/authentication/login" />
              )
            }
          />
          <Route
            exact
            path="/pokemon"
            render={(props) =>
              isAuthenticated ? (
                <Pokemon {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/authentication/login" />
              )
            }
          ></Route>
          <Route
            exact
            path="/authentication/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          ></Route>
          <Route
            exact
            path="/authentication/register"
            exact
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          ></Route>
          <Route
            exact
            path="*"
            exact
            render={(props) => <div>404 not found</div>}
          ></Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
