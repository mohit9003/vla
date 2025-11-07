import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FlaskConical, BookOpen, FileText, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [labs, setLabs] = useState([]);
  const [teacherCode, setTeacherCode] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/labs")
      .then(res => res.json())
      .then(data => setLabs(data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/last-teacher-code")
      .then(res => res.json())
      .then(data => setTeacherCode(data.code || ""))
      .catch(err => console.log(err));
  }, []);

  const cards = [
    {
      title: "Virtual Labs",
      icon: <FlaskConical size={32} />,
      desc: "Access lab simulations, procedures, and AI guidance.",
      color: "from-blue-500 to-indigo-600",
      path: "/virtual-labs",
      stat: `${labs.length} Labs`
    },
    {
      title: "Study Resources",
      icon: <BookOpen size={32} />,
      desc: "View manuals, PDFs, and video tutorials.",
      color: "from-purple-500 to-pink-600",
      path: "/resources",
      stat: "Coming Soon"
    },
    {
      title: "Submit Report",
      icon: <FileText size={32} />,
      desc: "Upload your lab report using Teacher Code.",
      color: "from-green-500 to-emerald-600",
      path: "/submit-report",
      stat: teacherCode ? `Code: ${teacherCode}` : "No code"
    }
  ];

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Sidebar role="student" />

      <div className="flex-1 p-8">
        <Navbar role="student" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome Back! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Continue your learning journey
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => navigate(card.path)}
              className={`bg-gradient-to-br ${card.color} p-6 rounded-2xl shadow-lg cursor-pointer text-white relative overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
              <div className="relative z-10">
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-sm opacity-90 mb-3">{card.desc}</p>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <TrendingUp size={16} />
                  {card.stat}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
              🤖
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              AI Assistant
            </h2>
          </div>
          <Chatbot />
        </motion.div>
      </div>
    </div>
  );
}
