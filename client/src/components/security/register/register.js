import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Flex } from "@react-css/flex";
import { Card } from "@material-ui/core";
import logo from "../../../img/logo.svg";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        email,
        password,
        name,
      };

      const response = await fetch("/auth/register", {
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
        toast.success("Register Complete!");
        window.location.reload();
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {}
  };

  return (
    <Fragment>
      <div className="w-100">
        <Card className="w-25 m-auto mt-5" elevation={12}>
          <Flex column alignItemsCenter>
            <img src={logo} style={{ width: "10rem" }} alt="logo"/>
            <h2 className="m-2 text-center">Register</h2>
          </Flex>
          <Flex className="p-2" justifyCenter alignItemsCenter>
            <form onSubmit={onSubmitForm}>
              <Flex column alignItemsCenter>
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => onChange(e)}
                  className="form-control my-3"
                  placeholder="Enter username"
                />
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
                <button className="btn btn-success btn-block">Register</button>
              </Flex>
            </form>
          </Flex>
        </Card>
      </div>
      <div className="d-flex justify-content-center my-4">
        <Link to="/authentication/login">
          Already have an account? Sign in here!
        </Link>
      </div>
    </Fragment>
  );
};
export default Register;
