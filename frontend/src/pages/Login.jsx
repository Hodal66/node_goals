import React, { useState } from "react";
import { FaUserNinja } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="heading">
        <h1>
          <RiLoginCircleFill />
          Login
        </h1>
        <p>Login and starting Goals</p>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter Your email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Enter Your password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Login Now
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
