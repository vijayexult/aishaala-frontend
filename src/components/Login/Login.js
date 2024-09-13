import React, { useState } from "react";
import "./styles.css";
import Cookies from "js-cookie"
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import { Navigate } from "react-router-dom";

const  Login =()=> {
  const [type, setType] = useState("signIn");
  const token = Cookies.get("token")

  if(token!=undefined){
    return <Navigate to="/"/>
  }
  
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "containerlogin " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="Applogin">
      <h2 className="headloginform2">Sign in/up Form</h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="headloginform">Welcome Back!</h1>
              <p className="paraloginform">
                To keep connected with us please login with your personal info
              </p>
              <button
                
                className="buttonghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1  className="headloginform">Hello, Friend!</h1>
              <p className="paraloginform">Enter your personal details and start journey with us</p>
              <button
                className="buttonghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login