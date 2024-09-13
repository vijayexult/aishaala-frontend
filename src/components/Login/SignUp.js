import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners"; // Import ClipLoader

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true); // Set loading to true when starting the registration process

    try {
      const response = await axios.post("https://legai.onrender.com/register", {
        username,
        password,
      });
      setMessage(response.data.message); // Set success message
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false); // Set loading to false after registration process
      setUsername("");
      setPassword("");

      // Clear the message after the animation ends
      setTimeout(() => setMessage(""), 4000); // Adjust timeout to match animation duration
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form className="signin-signupform" onSubmit={handleOnSubmit}>
        <h1 className="headloginform">Create Account</h1>
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
        <span className="spanEle">{/* or use your email for registration */}</span>
        <input
          className="inputvalueclass"
          type="text"
          name="name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="User Name"
        />
        <input
          className="inputvalueclass"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="signinsignupbutton" type="submit" disabled={loading}>
          {loading ? <ClipLoader size={16} color="#ffffff" /> : 'Sign Up'}
        </button>
        {message && <p className="floating-message-login">{message}</p>}
      </form>
    </div>
  );
}

export default SignUpForm;
