import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const authUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");

  const register = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setName("");
      setEmail("");
      setPassword("");
      setUser(res.data.user);
      navigate("/");
      console.log("Registration successful:", res.data);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed ");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // Ensure cookies are sent with the request

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setEmail("");
      setPassword("");
      setUser(res.data.user);
      navigate("/home");
      console.log("Login successful:", res.data);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkForgetPassword = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/password/forgot-password",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setEmail("");
      navigate("/forget-password");
      alert("Check your email for password reset instructions");
      console.log("Forget password check successful:", res.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Error checking forget password"
      );
      console.error("Forget password check error:", error);
    }
  };

  const forget = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/password/reset-password",

        {
          email,
          newPassword: password,
        },
        {
          withCredentials: true, // ✅ Keep this
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCurrentPassword("");
      setPassword("");
      navigate("/");
      alert("Password changed successfully");
    } catch (error) {
      setError(error.response?.data?.message || "Password change failed");
      console.error("Password change error:", error);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {}, // Empty body
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUser(null); // or whatever your user state clear should be
      navigate("/");
      alert("Logout successful");
    } catch (error) {
      setError(error.response?.data?.message || "Logout failed");
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    currentPassword,
    setCurrentPassword,
    checkForgetPassword,
    register,
    login,
    logout,
    forget,
    error,
    loading,
    user,
  };
};

export default authUser;
