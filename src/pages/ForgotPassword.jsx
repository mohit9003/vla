import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 to-blue-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
          Forgot Password
        </h2>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Enter your registered email"
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <p className="text-center text-green-600">
            ✅ Password reset link sent! Check your email.
          </p>
        )}

        <p className="text-sm text-center mt-4">
          <Link to="/login" className="text-indigo-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
