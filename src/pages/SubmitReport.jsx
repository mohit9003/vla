import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SubmitReport() {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [experiment, setExperiment] = useState("");
  const [teacherCode, setTeacherCode] = useState(localStorage.getItem("teacherCode") || "");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    
    try {
      const res = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentName, experiment, teacherCode }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("teacherCode", teacherCode);
        setMessage("success");
        setStudentName("");
        setExperiment("");
      } else {
        setMessage("error");
      }
    } catch (err) {
      console.log(err);
      setMessage("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-10">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 mb-8 px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl shadow-md hover:shadow-lg transition-all"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Dashboard</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4">
            <FileText size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Submit Lab Report
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share your experiment findings with your teacher
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Student Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Experiment Name
              </label>
              <input
                type="text"
                placeholder="Enter experiment name"
                value={experiment}
                onChange={(e) => setExperiment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Teacher Code
              </label>
              <input
                type="text"
                placeholder="Enter teacher code (e.g., VLA1234)"
                value={teacherCode}
                onChange={(e) => setTeacherCode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-all"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl hover:shadow-xl transition-all font-semibold flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Submit Report
            </motion.button>
          </form>

          {message === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 border-2 border-green-500 rounded-xl text-center"
            >
              <p className="text-green-700 dark:text-green-300 font-semibold">
                ✅ Report submitted successfully!
              </p>
            </motion.div>
          )}

          {message === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 rounded-xl text-center"
            >
              <p className="text-red-700 dark:text-red-300 font-semibold">
                ❌ Error submitting report. Please try again.
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
