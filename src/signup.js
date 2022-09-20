import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "./firebase";
import React from 'react';

export default function Signup() {
  const initialValues = { email: "", password: "", confirmpassword: "" };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  async function handleSignup() {
    try {
      await signup(formValues.email, formValues.password);
      // alert("Account created !!!");
      navigate("/");
    } catch (error) {
      alert("Error!");
      console.log(error.message);
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    } else if (!(values.password === values.confirmpassword)) {
      errors.password = "Passwords does not match";
    }
    return errors;
  };

  return (
    <div className="container" style={{ backgroundColor: "lightblue" }}>
      <form onSubmit={handleSubmit}>
        <h1>Signup Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Password"
              value={formValues.confirmpassword}
              onChange={handleChange}
            />
          </div>

          <button
            className="fluid ui button blue"
            onClick={() => {
              handleSignup();
            }}
          >
            Submit
          </button>

          <p>
            Already a user ? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
