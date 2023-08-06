import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/apis";

const Home = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    await login(email).then((userId) => {
    sessionStorage.setItem("userID", userId);
    navigate("/chat");
    })
  };

  return (
    <div>
      <h1>Bot Calculator</h1>
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleEmailSubmit}>Continue</button>
      </div>
    </div>
  );
};

export default Home;