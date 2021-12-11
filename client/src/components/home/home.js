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
      const response = await fetch("/auth/userprofile", {
        method: "GET",
        headers: {
          jwt_token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setName(parseRes.user_name);
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

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
            Learn React, {name}
          </a>
          <button
            onClick={(e) => logout(e)}
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
