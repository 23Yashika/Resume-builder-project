import React from 'react'
import Register from "../pages/Register";
import { Route, Routes } from "react-router-dom";
import ChangePassword from "../pages/ChangePassword";
import Login from "../pages/Login";
import HomePage from '../pages/HomePage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/home' element={<HomePage />} />
       <Route path="/forget-password" element={<ChangePassword />} />
      <Route path="/register" element={<Register />} />
      </Routes>
  )
}

export default AppRouter