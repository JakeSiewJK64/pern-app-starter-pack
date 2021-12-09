import logo from "../../img/logo.svg";
import "./home.css";
import React, { Fragment, useEffect, useState } from "react";

const Home = ({ setAuth }) => {
  const [name, setName] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/authentication/userprofile", {
        method: "GET",
        headers: {
          token: localStorage.token
        },
      });

      const parseRes = await response.json();
      console.log(parseRes);
      if (parseRes) {
        setName(parseRes.name);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
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
            Learn React, {name}
          </a>
          <button
            onClick={(e) => logout(e)}
            className="btn btn-danger btn-block"
          >
            Logout
          </button>
        </header>
      </div>
    </Fragment>
  );
};

export default Home;
