import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // 認証状態を取得するロジックをここに記述
  const token = localStorage.getItem("token");

  console.log("Is Authenticated:", token);

  if (!token) {
    return <Navigate to="/" />; // 認証されていない場合はログインページへリダイレクト
  }

  return children; // 認証されている場合は子コンポーネントを表示
};

export default ProtectedRoute;
