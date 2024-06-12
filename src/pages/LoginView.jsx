import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logohello.png";
import "../css/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };

    // userLoginApi(data)
    //   .then((res) => {
    //     if (res.data.success) {
    //       toast.success("Logged in successfully!");
    //       localStorage.setItem("token", res.data.token);
    //       localStorage.setItem("user", JSON.stringify(res.data.user));
    //       navigate("/userdashboard");
    //     } else {
    //       toast.error(res.data.message);
    //     }
    //   })
    //   .catch((err) => {
    //     let errorMessage = "Internal server error";
    //     if (err.response && err.response.data && err.response.data.message) {
    //       errorMessage = err.response.data.message;
    //     } else if (err.message) {
    //       errorMessage = err.message;
    //     }
    //     toast.error(errorMessage);
    //   });
  };

  return (
    <section className="login-container">
      <div className="login-content">
        <img src={Logo} className="logo" alt="Hello Sathi Logo" />
        <div className="login-card">
          <div className="login-form">
            <h1 className="login-title">Welcome to Hello Sathi</h1>
            <p className="login-subtitle">Your AI Learning Assistant</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Enter your email
                </label>
                <input
                  onChange={handleEmail}
                  type="email"
                  name="email"
                  id="email"
                  className="form-input"
                  placeholder="yourcoolname@mail.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  onChange={handlePassword}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="form-input"
                  required
                />
              </div>
              <button type="submit" className="login-button">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
