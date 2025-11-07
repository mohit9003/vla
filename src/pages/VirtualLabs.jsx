import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function VirtualLabs() {
  const navigate = useNavigate();
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/labs")
      .then(res => res.json())
      .then(data => setLabs(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-10">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 mb-8 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Dashboard</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Virtual Labs
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg flex items-center justify-center gap-2">
          <Sparkles size={20} />
          Explore interactive lab simulations
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {labs.map((lab, i) => (
          <motion.div
            key={lab._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
            onClick={() => navigate(`/experiment/${lab._id}`)}
            className={`bg-gradient-to-br ${lab.color} text-white rounded-3xl shadow-xl p-8 cursor-pointer relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4"></div>
              <h2 className="text-2xl font-bold mb-3">{lab.name}</h2>
              <p className="text-sm opacity-90">{lab.description}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Interactive</span>
                <span className="text-2xl">→</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
