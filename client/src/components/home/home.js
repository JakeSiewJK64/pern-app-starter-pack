import logo from "../../img/logo.svg";
import "./home.css";
import React, { Fragment } from "react";
import LogoutFunction from "../security/logout/logout";

const Home = ({ setAuth, username }) => {
  return (
    <Fragment>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React, {username}
          </a>
          <button
            onClick={(e) => LogoutFunction({setAuth})}
            className="btn btn-danger btn-block"
          >
            Logout
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
