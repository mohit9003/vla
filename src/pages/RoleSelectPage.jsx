import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck } from "lucide-react";

export default function RoleSelectPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-12 w-[450px] text-center"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Virtual Lab Assistant
          </h1>
          <p className="text-gray-600 mb-8">Empowering Education with AI 🔬</p>
        </motion.div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login/student")}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-3 font-semibold"
          >
            <GraduationCap size={24} />
            Student Login
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin/login")}
            className="w-full py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-3 font-semibold"
          >
            <ShieldCheck size={24} />
            Admin Login
          </motion.button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Choose your role to continue your journey
        </p>
      </motion.div>
    </div>
  );
}
