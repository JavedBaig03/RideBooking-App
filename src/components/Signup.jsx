import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Generate a random 4-digit OTP
  const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP
    setGeneratedOtp(otp);
    alert(`Your OTP is: ${otp}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (otp === String(generatedOtp)) {
      const userData = { email, name };

      try {
        const response = await fetch("http://localhost:9001/api/user/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          alert("✅ Signup successful!");
          navigate("/login");
        } else {
          alert("❌ Signup failed.");
        }
      } catch (error) {
        alert("❌ Server error occurred!");
      }
    } else {
      setMessage("❌ Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Create Account</h1>
        <p>Sign up to start booking rides</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* OTP input field */}
          <button type="button" onClick={generateOtp}>
            Generate OTP
          </button>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        {message && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
}

export default Signup;
