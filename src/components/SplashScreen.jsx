
import React, { useEffect, useState } from "react";
import "../css/SplashScreen.css";

function SplashScreen() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeOut(true), 3500);
  }, []);

  return (
    <div className={`splash-container energy-bg ${fadeOut ? "fade-out" : ""}`}>
      <div className="energy-glow">
        <div className="energy-spinner"></div>
      </div>
      <h1 className="splash-title energy-title">RideApp</h1>
      <p className="splash-subtitle energy-subtitle">Fast & Reliable Rides Anytime, Anywhere</p>
    </div>
  );
}

export default SplashScreen;
