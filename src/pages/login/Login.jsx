/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./Login.css";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yub from "yup";

const Login = ({ setLogin }) => {
  // url of server backend
  const url = "http://localhost:3000";

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errorValidation, setErrorValidation] = useState("");

  // error validation style
  const errorValidationStyle = {
    marginBottom: "10px",
    color: "red",
    fontSize: "14px",
  };

  // validation
  const validationSchema = Yub.object({
    email: Yub.string()
      .email("invalid email address")
      .trim()
      .min(5, "length must be at least 5 characters long")
      .max(255, "length must be at most 255 characters long")
      .required("The email is required"),
    password: Yub.string()
      .min(6, "length must be at least 6 characters long")
      .required("The password is required"),
  });

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    // validation of inputs
    try {
      await validationSchema.validate(data, { abortEarly: false });
    } catch (error) {
      const newError = {};
      error.inner.forEach((err) => {
        newError[err.path] = err.message;
        setErrorValidation(newError);
      });
    }

    // logic of login and register
    const response = await axios.post(`${url}/admin/login`, data);

    if (response.data.success) {
      setLogin(true);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.errorMessage);
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={onLogin}>
        <div className="admin-login-title">
          <h2>Admin Panel</h2>
          <span></span>
        </div>
        <label>Admin email :</label>
        <input
          type="email"
          name="email"
          onChange={onChange}
          value={data.name}
          placeholder="Enter your email address"
        />
        <p style={errorValidationStyle}>{errorValidation.email}</p>
        <label>Admin password :</label>
        <input
          type="password"
          name="password"
          onChange={onChange}
          value={data.name}
          placeholder="Enter your password"
        />
        <p style={errorValidationStyle}>{errorValidation.password}</p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
