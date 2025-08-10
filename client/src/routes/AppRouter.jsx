import React from "react";
import Register from "../pages/Register";
import { Route, Routes } from "react-router-dom";
import ChangePassword from "../pages/ChangePassword";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import Resume from "../pages/Resume";
import ResumeTemplatePage from "../pages/ResumeTemplatePage";
import ResumePreviewPage from "../pages/ResumePreviewPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/resume-preview" element={<ResumePreviewPage />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/resume-template" element={<ResumeTemplatePage />} />
      <Route path="/forget-password" element={<ChangePassword />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRouter;
