import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; 
import { ClipLoader } from "react-spinners";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the login process
    try {
      const response = await axios.post("https://legai.onrender.com/login", {
        username,
        password,
      });
      Cookies.set("token", response.data.token, { expires: 7 }); // Set cookie to expire in 7 days
      setMessage("User logged in successfully!");
      navigate("/");
    } catch (error) {
      setMessage(`Error: ${error.response.data.error}`);
    } finally {
      setLoading(false); // Set loading to false after login process
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form className="signin-signupform" onSubmit={handleSubmit}>
        <h1 className="headloginform">Sign In</h1>
        <div className="social-container">
          <div className="aEle social">
            <i className="fab fa-facebook-f" />
          </div>
          <div className="aEle social">
            <i className="fab fa-google-plus-g" />
          </div>
          <div className="aEle social">
            <i className="fab fa-linkedin-in" />
          </div>
        </div>
        <span className="spanEle">or use your account</span>
        <input
          className="inputvalueclass"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="inputvalueclass"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a className="aEle">Forgot your password?</a>
        <button className="signinsignupbutton" type="submit" disabled={loading}>
          {loading ? <ClipLoader size={16} color="#ffffff" /> : 'Sign In'}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default SignInForm;
