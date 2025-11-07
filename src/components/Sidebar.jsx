import { motion } from "framer-motion";
import { useState } from "react";
import { Home, FlaskConical, BookOpen, FileText, LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const menus = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Virtual Labs", icon: <FlaskConical size={20} />, path: "/virtual-labs" },
    { name: "Resources", icon: <BookOpen size={20} />, path: "/resources" },
    { name: "Submit Report", icon: <FileText size={20} />, path: "/submit-report" }
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <motion.div
      animate={{ width: open ? "280px" : "80px" }}
      className="bg-gradient-to-b from-indigo-700 to-indigo-900 text-white h-screen p-5 flex flex-col shadow-2xl"
    >
      <div className="flex items-center justify-between mb-10">
        <motion.h1
          animate={{ opacity: open ? 1 : 0 }}
          className="text-2xl font-bold"
        >
          VLA 🔬
        </motion.h1>
        <button
          onClick={() => setOpen(!open)}
          className="bg-indigo-600 hover:bg-indigo-500 p-2 rounded-lg transition-all"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="flex flex-col gap-3 flex-grow">
        {menus.map((menu, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05, x: 5 }}
            onClick={() => navigate(menu.path)}
            className="flex items-center gap-4 hover:bg-indigo-600 px-4 py-3 rounded-xl transition-all"
          >
            {menu.icon}
            <motion.span
              animate={{ opacity: open ? 1 : 0, display: open ? "block" : "none" }}
              className="text-sm font-medium"
            >
              {menu.name}
            </motion.span>
          </motion.button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={handleLogout}
        className="flex items-center gap-4 bg-red-600 hover:bg-red-500 px-4 py-3 rounded-xl transition-all mt-auto"
      >
        <LogOut size={20} />
        <motion.span
          animate={{ opacity: open ? 1 : 0, display: open ? "block" : "none" }}
          className="text-sm font-medium"
        >
          Logout
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
