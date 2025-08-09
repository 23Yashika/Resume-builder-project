import React from "react";

import authUser from "../hooks/authUser";

const ChangePassword = () => {
  const { email, setEmail, password, setPassword, forget, error, loading } =
    authUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20 px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-delayed"></div>
      </div>

      <div className="max-w-md mx-auto relative z-10">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/30">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center pulse-glow">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">
                Reset Your Password
              </h3>
              <p className="text-slate-600 text-sm">
                Enter your email and new password to update your password.
              </p>
            </div>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await forget();
            }}
            className="space-y-6"
          >
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <p>{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-3 flex items-center space-x-2"
              >
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 4.5A2.25 2.25 0 004.5 2.25h15a2.25 2.25 0 012.25 2.25v15a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 19.5v-15zm1.5.75v.512l7.5 4.688 7.5-4.688v-.512h-15zm15 2.487l-7.182 4.488a.75.75 0 01-.636 0L3.75 7.737v10.763h15V7.737z"
                    clipRule="evenodd"
                  />
                </svg>
                <span> Email </span>
              </label>
              <input
                type="password"
                id="email"
                placeholder="••••••••"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none px-4 py-3 text-slate-800 placeholder-slate-400 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                required
              />
            </div>
            <div>
              <label
                htmlFor="New-password"
                className="block text-sm font-semibold text-slate-700 mb-3 flex items-center space-x-2"
              >
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2a4 4 0 00-4 4v2H7a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2h-4zm2 5a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span> New Password</span>
              </label>
              <input
                type="password"
                id="New-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none px-4 py-3 text-slate-800 placeholder-slate-400 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-2xl text-lg flex items-center justify-center space-x-3 group disabled:opacity-70 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Changing ...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 group-hover:animate-bounce"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <div className="text-center text-sm text-slate-600">
              <p>
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
