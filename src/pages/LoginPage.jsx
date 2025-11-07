import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Firebase config

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("student"); // default role

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect based on role
      if (role === "student") navigate("/dashboard/student");
      else if (role === "admin") navigate("/dashboard/admin");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[400px] text-center">
        <h1 className="text-3xl font-bold mb-6">Virtual Lab Assistant 🔬</h1>

        {/* Role Selection */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setRole("student")}
            className={`px-4 py-2 rounded-xl ${
              role === "student" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            🎓 Student
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`px-4 py-2 rounded-xl ${
              role === "admin" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            🧑‍💼 Admin
          </button>
        </div>

        {/* Email / Password */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Forgot Password? <span className="text-blue-600 cursor-pointer">Click here</span>
        </p>
      </div>
    </div>
  );
}
