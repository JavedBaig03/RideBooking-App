import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:9001/api/user/all");
      const users = await response.json();

      const user = users.find(
        (user) => user.email === email && user.name === name
      );

      if (user) {
        setMessage("✅ Login Successful!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", user.id);
        setTimeout(() => navigate("/ride-confirmation"), 1500);
      } else {
        setMessage("❌ Invalid credentials.");
      }
    } catch (error) {
      setMessage("❌ Server Error.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Please login to book your ride</p>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {message && <p className="login-message">{message}</p>}
        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
