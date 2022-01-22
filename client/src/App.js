import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./hoc/auth";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

export default function App() {
  const NewLandingPage = Auth(LandingPage, true);
  const NewLoginPage = Auth(LoginPage, false);
  const NewRegisterPage = Auth(RegisterPage, false);
  return (
    <Router>
      <div>
        <Routes>
          {/* 라우터 경로가 부분적으로 닮아도 같이 넘어가버리는 오류를 없애기위해 exact 필요  v6 이전엔..*/}
          <Route path="/register" element={<NewRegisterPage />} />
          <Route path="/login" element={<NewLoginPage />} />
          <Route path="/" element={<NewLandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
