import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, FileText, Video, Download } from "lucide-react";

export default function StudyResources() {
  const navigate = useNavigate();
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    fetch("/api/labs")
      .then(res => res.json())
      .then(data => setLabs(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-10">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 mb-6 sm:mb-8 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
      >
        <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
        <span className="font-medium">Back to Dashboard</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Study Resources
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg px-4">
          Access manuals, tutorials, and reference materials
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {labs.map((lab, idx) => (
          <motion.div
            key={lab._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8"
          >
            <div className={`flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-white bg-gradient-to-r ${lab.color} p-3 sm:p-4 rounded-xl sm:rounded-2xl`}>
              <BookOpen size={24} className="sm:w-8 sm:h-8" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{lab.name}</h2>
            </div>

            {lab.resources && lab.resources.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {lab.resources.map((resource, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(resource.url, '_blank')}
                    className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-5 rounded-xl cursor-pointer hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white flex-1">{resource.name}</h3>
                      <Download size={16} className="sm:w-[18px] sm:h-[18px] text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                      <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded">
                        {resource.type}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No resources available yet</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
