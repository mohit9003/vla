import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-400">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-2xl shadow-2xl w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign Up</h1>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-purple-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
