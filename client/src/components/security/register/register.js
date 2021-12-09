import { Component, Fragment, useState } from "react";

const Register = () => {
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

      const response = await fetch("/authentication/register", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const paraseRes = await response.json();
      console.log(paraseRes);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <h2 className="text-center my-5">Register</h2>
      <div className="d-flex justify-content-center">
        <form onSubmit={onSubmitForm}>
          <input
            type="email"
            name="email"
            placeholder="Please enter email"
            className="form-control my-3"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Please enter password"
            className="form-control my-3"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="name"
            placeholder="Please enter username"
            className="form-control my-3"
            value={name}
            onChange={(e) => onChange(e)}
          />
          <button className="btn btn-success btn-block" name="submit-button">
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};
export default Register;
