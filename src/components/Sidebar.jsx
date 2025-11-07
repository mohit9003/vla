import { motion } from "framer-motion";
import { useState } from "react";
import { Home, MessageCircle, FlaskConical, BookOpen, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const menus = [
    { name: "Dashboard", icon: <Home size={20} /> },
    { name: "AI Assistant", icon: <MessageCircle size={20} /> },
    { name: "Virtual Labs", icon: <FlaskConical size={20} /> },
    { name: "Resources", icon: <BookOpen size={20} /> },
    { name: "Profile", icon: <User size={20} /> },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <motion.div
      animate={{ width: open ? "250px" : "80px" }}
      className="bg-indigo-700 text-white h-screen p-4 flex flex-col transition-all duration-500"
    >
      <div className="flex items-center justify-between mb-8">
        <h1
          className={`text-2xl font-bold transition-all ${
            open ? "opacity-100" : "opacity-0 w-0"
          }`}
        >
          VLA AI
        </h1>
        <button
          onClick={() => setOpen(!open)}
          className="bg-indigo-500 hover:bg-indigo-600 p-2 rounded-lg"
        >
          {open ? "←" : "→"}
        </button>
      </div>

      <div className="flex flex-col gap-4 flex-grow">
        {menus.map((menu, i) => (
          <button
            key={i}
            className="flex items-center gap-3 hover:bg-indigo-600 px-3 py-2 rounded-lg transition-all"
          >
            {menu.icon}
            <span className={`${open ? "block" : "hidden"} text-sm font-medium`}>
              {menu.name}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 bg-indigo-600 hover:bg-red-500 px-3 py-2 rounded-lg transition-all"
      >
        <LogOut size={20} />
        <span className={`${open ? "block" : "hidden"} text-sm font-medium`}>
          Logout
        </span>
      </button>
    </motion.div>
  );
}
