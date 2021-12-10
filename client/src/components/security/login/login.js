import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Login = ({ setAuth }) => {
  // setting default state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // set default credentials
  const { email, password } = inputs;

  // declare onchange function
  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitForm = async (e) => {
    // todo: implement login api
    e.preventDefault();
    try {
      // declare application body
      const body = {
        email,
        password,
      };

      const response = await fetch("/auth/login", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Login Complete!");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
    }
  };

  return (
    <Fragment>
      <h2 className="text-center my-5">Login</h2>
      <div className="d-flex justify-content-center">
        <form onSubmit={onSubmitForm}>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="form-control my-3"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => onChange(e)}
            className="form-control my-3"
            placeholder="Enter Password"
          />
          <button className="btn btn-warning btn-block">Login</button>
        </form>
        <Link to="/authentication/register">Don't have an account? Sign up!</Link>
      </div>
    </Fragment>
  );
};

export default Login;
