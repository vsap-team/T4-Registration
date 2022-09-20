import React ,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, login } from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import { selectUserEmail } from "./features/userSlice";
import { useAuthState } from "react-firebase-hooks/auth";


export default function Login() {
  const initialValues = { email: "", password: "" };
  const [user, loading] = useAuthState(auth);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const userEmail = useSelector(selectUserEmail);

  async function handleLogin() {
    try {
      await login(formValues.email, formValues.password);
      // alert("Welcome");
    } catch {
      alert("Credentials doesnt match !!");
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
    // console.log(formErrors);
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
    }
    return errors;
  };

  return (
    <div className="container" style={{ backgroundColor: "lightblue" }}>
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              autoComplete="false"
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

          <button
            className="fluid ui button blue"
            onClick={() => {
              handleLogin();
            }}
          >
            Submit
          </button>
          <p>
            New user ? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
