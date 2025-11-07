import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy validation for now
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-400">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[400px]">
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Admin Username"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
