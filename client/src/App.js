import "./App.css";
import React, { Fragment, useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// components
import Customers from "./components/customers/customers";
import Pokemon from "./components/pokemon/pokemon";
import Home from "./components/home/home";
import Register from "./components/security/register/register";
import Users from "./components/users/users";
import Login from "./components/security/login/login";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppHeader } from "./shared/shared-components/header/header";
import LoadingSpinner from "./shared/shared-components/loadingSpinner/loadingSpinner";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("/auth/verify", {
        method: "POST",
        headers: {
          jwt_token: localStorage.token,
        },
      });

      const parseRes = await res.json();
      if (parseRes) {
        setIsLoading(false);
      }
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {}
  };

  const getProfile = async () => {
    try {
      const response = await fetch("/auth/userprofile", {
        method: "GET",
        headers: {
          jwt_token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setName(parseRes.user_name);
      setRole(parseRes.role_name);
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  useEffect(() => {
    checkAuthenticated();
    getProfile();
  }, []);

  return isLoading ? (
    <div style={{ marginTop: "25vh" }}>
      <LoadingSpinner />
    </div>
  ) : (
    <Fragment>
      <header>
        <ToastContainer />
        {isAuthenticated ? (
          <AppHeader props={setAuth} username={name} userrole={role} />
        ) : (
          <div></div>
        )}
        <Switch>
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
            path="/users"
            render={(props) =>
              isAuthenticated && role === "administrator" ? (
                <Users {...props} setAuth={setAuth} />
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
          />
          <Route
            exact
            path="/authentication/register"
            exact
            render={(props) =>
              isAuthenticated ? (
                <Redirect to="/" />
              ) : (
                <Register {...props} setAuth={setAuth} />
              )
            }
          />
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
          />
          <Route
            exact
            path="/"
            render={(props) =>
              isAuthenticated ? (
                <Home {...props} setAuth={setAuth} username={name} />
              ) : (
                <Redirect to="/authentication/login" />
              )
            }
          />
          <Route
            exact
            path="*"
            exact
            render={(props) => <div>404 not found</div>}
          />
        </Switch>
      </header>
    </Fragment>
  );
}

export default App;
