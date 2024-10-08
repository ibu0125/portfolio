// AdminDashboard.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import ContactList from "./ContactList";
import AdminLogin from "./AdominLogin"; // 修正: 綴りのエラーを修正
import "./AdominDashboard.css";

function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <Routes>
        <Route
          path="/login"
          element={
            <div className="login-container">
              <h2>ログイン</h2>
              <AdminLogin />
            </div>
          }
        />
        <Route
          path="/"
          element={
            <>
              <h1 className="header">管理ダッシュボード</h1>
              <div className="contact-list">
                <ContactList />
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default AdminDashboard;
