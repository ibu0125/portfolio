import React from "react";
import { useLocation } from "react-router-dom";

const LocationWrapper = ({ children }) => {
  const location = useLocation();
  const isFormPage = location.pathname === "/form";

  return (
    <div
      className="form-wrapper"
      style={{
        overflow: isFormPage ? "hidden" : "auto",
        height: isFormPage ? "100vh" : "auto", // Formページのときに全画面表示
      }}
    >
      {children}
    </div>
  );
};

export default LocationWrapper;
