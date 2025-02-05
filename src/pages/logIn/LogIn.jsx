import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import icon from "../../assets/favicon.ico";
import google from "../../assets/icons/google.svg";
import github from "../../assets/icons/github.svg";
import iks from "../../assets/icons/iks.svg";
import eye from "../../assets/icons/eye.svg";
import eyeOpen from "../../assets/icons/eyeOpen.svg";
import  "./LogIn.css";

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState(""); 

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);  
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); 
  };

  const isFormValid = email !== "" && password !== "";  

  return (
    <div className="wrapper">
      <header className="header">
        <a href="" className="logo">
          <img src={icon} alt="icon" />
        </a>

        <a href="" className="help-link">
          Need help?
        </a>
      </header>
      <div className="div">
        <div className="form-name">
          <h5 className="form-start">Sign in</h5>
          <p className="form-paragraph">
            Don't have an account?
            <span className="registrate-link">Get started</span>
          </p>
        </div>
        <div className="form">
          <div className="input-container">
            <label htmlFor="email" className="label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="input"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <a href="" className="password-help">
            Forgot password?
          </a>
          <div className="input-container">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="input"
              value={password}
              onChange={handlePasswordChange} 
            />

            <button className="showButton" onClick={togglePasswordVisibility}>
              <img src={showPassword ? eyeOpen : eye} alt="" />
            </button>
          </div>

          {isFormValid ? (
            <Link to="/students" className="singButton">
              Sign in
            </Link>
          ) : (
            <button className="singButton" type="submit" disabled>
              Sign in
            </button>
          )}
        </div>

        <div className="divider">
          <span className="divider-span">OR</span>
        </div>
        <div className="options">
          <button className="optionButton">
            <img src={google} alt="icon" />
          </button>
          <button className="optionButton">
            <img src={github} alt="icon" />
          </button>
          <button className="optionButton">
            <img src={iks} alt="icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
