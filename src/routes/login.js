import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:9071/api/v1/user/login", {
        email: email,
        password: password,
      });

      console.log(response.data);

      if (response.data.id === undefined) {
        setError(false);
        localStorage.setItem("userid", response.data.id);
        navigate("/home");
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <br />
        <div className="center">
          <h1 className="logintitle">Login here</h1>
          <form onSubmit={handleSubmit}>
            <div className="inputbox">
              <span>Email</span>
              <input
                type="text"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputbox">
              <span>Password</span>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="inputbox">
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
        <br />
        {error && <h6 className="errlogin">Incorrect email or password</h6>}
        <br />
        <br />
        <h4>
          <Link className="linkd" to="/register">
            Dont Have An Account? Register Here!
          </Link>
        </h4>
      </div>
    </div>
  );
}

export default Login;
