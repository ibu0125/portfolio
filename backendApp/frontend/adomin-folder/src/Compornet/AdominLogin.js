import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; // スタイルシートをインポート

function AdominLogin() {
  const [userName, setUserName] = useState(""); // ユーザー名の state
  const [password, setPassword] = useState(""); // パスワードの state
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      userName,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5165/api/adomin/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.token) {
        console.log("ログインに成功しました", response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        console.error("No data received.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="ユーザー名"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">
          ログイン
        </button>
      </form>
    </div>
  );
}

export default AdominLogin;
