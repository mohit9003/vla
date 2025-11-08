import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function Progress() {
  const navigate = useNavigate();
  const [labs, setLabs] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/labs")
      .then(res => res.json())
      .then(data => setLabs(data))
      .catch(err => console.log(err));

    const studentName = localStorage.getItem("studentName") || "Student";
    fetch("http://localhost:5000/api/reports")
      .then(res => res.json())
      .then(data => setReports(data.filter(r => r.studentName === studentName)))
      .catch(err => console.log(err));
  }, []);

  const getStatus = (lab) => {
    const isCompleted = reports.some(r => r.experiment === lab.name);
    if (isCompleted) return "completed";
    
    if (lab.deadline) {
      const now = new Date();
      const deadline = new Date(lab.deadline);
      const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
      
      if (daysLeft < 0) return "overdue";
      if (daysLeft <= 3) return "urgent";
      return "pending";
    }
    return "pending";
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "completed": return "from-green-500 to-emerald-600";
      case "overdue": return "from-red-500 to-red-600";
      case "urgent": return "from-orange-500 to-yellow-600";
      default: return "from-blue-500 to-indigo-600";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "completed": return <CheckCircle size={24} />;
      case "overdue": return <AlertCircle size={24} />;
      case "urgent": return <Clock size={24} />;
      default: return <Clock size={24} />;
    }
  };

  const completed = labs.filter(l => getStatus(l) === "completed").length;
  const total = labs.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

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
          My Progress
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg px-4">
          Track your experiment completion and deadlines
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Overall Progress</h2>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{percentage}%</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{completed} of {total} experiments completed</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {labs.map((lab, idx) => {
          const status = getStatus(lab);
          const daysLeft = lab.deadline ? Math.ceil((new Date(lab.deadline) - new Date()) / (1000 * 60 * 60 * 24)) : null;
          
          return (
            <motion.div
              key={lab._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getStatusColor(status)} rounded-full flex items-center justify-center text-white flex-shrink-0`}>
                  {getStatusIcon(status)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{lab.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{lab.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-3 py-1 rounded-full font-semibold ${
                      status === "completed" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                      status === "overdue" ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" :
                      status === "urgent" ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" :
                      "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    }`}>
                      {status === "completed" ? "Completed" :
                       status === "overdue" ? "Overdue" :
                       status === "urgent" ? "Due Soon" : "Pending"}
                    </span>
                    {lab.deadline && (
                      <span className="text-gray-600 dark:text-gray-400">
                        {status === "completed" ? "Submitted" :
                         status === "overdue" ? `${Math.abs(daysLeft)} days overdue` :
                         `${daysLeft} days left`}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
