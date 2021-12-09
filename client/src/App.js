import "./App.css";
import React, { Fragment, useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

// components
import Customers from "./components/customers/customers";
import Pokemon from "./components/pokemon/pokemon";
import Home from "./components/home/home";
import Register from "./components/security/register/register";
import Login from "./components/security/login/login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              isAuthenticated ? (
                <Home setAuth={setAuth} />
              ) : (
                <Navigate to="/authentication/login" />
              )
            }
          />
          <Route
            exact
            path="/customers"
            element={
              isAuthenticated ? (
                <Customers setAuth={setAuth} />
              ) : (
                <Navigate to="/authentication/login" />
              )
            }
          />
          <Route
            exact
            path="/pokemon"
            element={
              isAuthenticated ? (
                <Pokemon setAuth={setAuth} />
              ) : (
                <Navigate to="/authentication/login" />
              )
            }
          ></Route>
          <Route
            exact
            path="/authentication/login"
            element={
              !isAuthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          ></Route>
          <Route
            exact
            path="/authentication/register"
            element={
              !isAuthenticated ? (
                <Register setAuth={setAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          ></Route>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
