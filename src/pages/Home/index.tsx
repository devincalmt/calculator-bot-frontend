import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/apis";
import style from "./home.module.scss";

const Home = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(email).then((userId) => {
      sessionStorage.setItem("userID", userId);
      navigate("/chat");
    });
  };

  return (
    <div className={style.botCalculatorContainer}>
      <h1>Bot Calculator</h1>
      <form className={style.inputForm} onSubmit={handleEmailSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          required
          className={style.emailInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className={style.continueButton}>Continue</button>
      </form>
    </div>
  );
};

export default Home;
