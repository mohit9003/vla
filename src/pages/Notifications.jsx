import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Megaphone } from "lucide-react";

export default function Notifications() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch("/api/announcements")
      .then(res => res.json())
      .then(data => setAnnouncements(data))
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
          All Notifications
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg px-4">
          View all announcements and updates
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-4">
        {announcements.length > 0 ? (
          announcements.map((ann, idx) => (
            <motion.div
              key={ann._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Megaphone size={20} className="sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {ann.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                    {ann.message}
                  </p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                    <span>Posted by {ann.createdBy}</span>
                    <span>•</span>
                    <span>{new Date(ann.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-12 rounded-2xl shadow-lg text-center"
          >
            <Megaphone size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              No Announcements Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back later for updates from your instructors
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
