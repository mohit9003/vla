import { useNavigate } from "react-router-dom";

export default function RoleSelectPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[400px] text-center">
        <h1 className="text-3xl font-bold mb-6">Virtual Lab Assistant 🔬</h1>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/login/student")}
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
          >
            🎓 Student Login
          </button>

          <button
            onClick={() => navigate("/admin/login")}
            className="w-full py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all"
          >
            🧑‍💼 Admin Login
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Choose your role to continue
        </p>
      </div>
    </div>
  );
}
