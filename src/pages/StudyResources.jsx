import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, FileText, Video, Download } from "lucide-react";

export default function StudyResources() {
  const navigate = useNavigate();

  const resources = [
    {
      category: "Lab Manuals",
      icon: <BookOpen size={32} />,
      color: "from-blue-500 to-indigo-600",
      items: [
        { name: "Physics Lab Manual", type: "PDF", size: "2.5 MB" },
        { name: "Chemistry Lab Manual", type: "PDF", size: "3.1 MB" },
        { name: "Computer Science Lab Manual", type: "PDF", size: "1.8 MB" },
      ]
    },
    {
      category: "Video Tutorials",
      icon: <Video size={32} />,
      color: "from-purple-500 to-pink-600",
      items: [
        { name: "Introduction to Virtual Labs", type: "Video", size: "15 min" },
        { name: "Safety Guidelines", type: "Video", size: "10 min" },
        { name: "Equipment Usage", type: "Video", size: "20 min" },
      ]
    },
    {
      category: "Reference Materials",
      icon: <FileText size={32} />,
      color: "from-green-500 to-emerald-600",
      items: [
        { name: "Experiment Procedures", type: "PDF", size: "1.2 MB" },
        { name: "Data Analysis Guide", type: "PDF", size: "900 KB" },
        { name: "Report Writing Tips", type: "PDF", size: "750 KB" },
      ]
    }
  ];

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
        {resources.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8"
          >
            <div className={`flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-white bg-gradient-to-r ${section.color} p-3 sm:p-4 rounded-xl sm:rounded-2xl`}>
              <div className="w-6 h-6 sm:w-8 sm:h-8">{section.icon}</div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{section.category}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {section.items.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-5 rounded-xl cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white flex-1">{item.name}</h3>
                    <Download size={16} className="sm:w-[18px] sm:h-[18px] text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded">
                      {item.type}
                    </span>
                    <span>{item.size}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
