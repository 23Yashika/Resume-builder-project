import React, { useState, useEffect } from "react";
import { Mail, Lock, User, Plus, ArrowRight, Moon, Sun } from "lucide-react";
import authUser from "../hooks/authUser";

const Register = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    register,
    error,
    loading,
  } = authUser();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-all duration-700 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100"
      }`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110 ${
          isDarkMode
            ? "bg-gray-800/80 hover:bg-gray-700/80 text-yellow-400 border border-gray-600/30"
            : "bg-white/80 hover:bg-white/90 text-gray-700 border border-white/30"
        } backdrop-blur-md shadow-lg`}
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6" />
        ) : (
          <Moon className="w-6 h-6" />
        )}
      </button>

      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-20 left-20 w-32 h-32 rounded-full blur-3xl animate-bounce ${
            isDarkMode ? "bg-blue-500/10" : "bg-blue-400/20"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 right-20 w-40 h-40 rounded-full blur-3xl ${
            isDarkMode ? "bg-purple-500/10" : "bg-purple-400/20"
          }`}
        ></div>
      </div>

      <div className="relative w-full max-w-md mx-auto">
        <div
          className={`backdrop-blur-xl rounded-3xl p-8 shadow-2xl transition-all duration-500 ${
            isDarkMode
              ? "bg-gray-800/10 border border-gray-700/20 hover:bg-gray-800/15"
              : "bg-white/10 border border-white/20 hover:bg-white/15"
          }`}
        >
          {/* Form Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2
              className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Create Account
            </h2>
            <p
              className={`transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Join our financial community
            </p>
          </div>

          {/* Form Fields */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await register();
            }}
            className="space-y-6"
          >
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label
                className={`block text-sm font-medium transition-colors duration-300 ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800/50 border-gray-600/30 hover:border-gray-500/50 focus:bg-gray-800/70 text-white placeholder-gray-400"
                      : "bg-white/50 border-white/30 hover:border-white/50 focus:bg-white/70 text-gray-900 placeholder-gray-500"
                  }`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                className={`block text-sm font-medium transition-colors duration-300 ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800/50 border-gray-600/30 hover:border-gray-500/50 focus:bg-gray-800/70 text-white placeholder-gray-400"
                      : "bg-white/50 border-white/30 hover:border-white/50 focus:bg-white/70 text-gray-900 placeholder-gray-500"
                  }`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                className={`block text-sm font-medium transition-colors duration-300 ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800/50 border-gray-600/30 hover:border-gray-500/50 focus:bg-gray-800/70 text-white placeholder-gray-400"
                      : "bg-white/50 border-white/30 hover:border-white/50 focus:bg-white/70 text-gray-900 placeholder-gray-500"
                  }`}
                  required
                />
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 group hover:scale-105 hover:shadow-lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Register</span>
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div
            className={`text-center mt-8 transition-colors duration-300 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <a
              href="/"
              className="text-blue-500 hover:text-blue-400 font-medium transition-colors duration-300 hover:underline"
            >
              Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
