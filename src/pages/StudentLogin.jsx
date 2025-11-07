import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function StudentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // simple validation
    if (email === "" || password === "") {
      alert("Please fill all fields!");
      return;
    }

    // after validation → go to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6">🎓 Student Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/forgot" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="text-center mt-2">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
