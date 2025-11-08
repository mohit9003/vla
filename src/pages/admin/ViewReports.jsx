import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Calendar, User, Trash2, Download } from "lucide-react";

export default function ViewReports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    fetch("http://localhost:5000/api/reports")
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.log(err));
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this report?")) return;

    try {
      await fetch(`http://localhost:5000/api/reports/${id}`, { method: "DELETE" });
      fetchReports();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate("/admin/dashboard")}
        className="flex items-center gap-2 mb-6 px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl shadow-md hover:shadow-lg transition-all"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Dashboard</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Submitted Reports
        </h1>
        <p className="text-gray-600 dark:text-gray-400">View all lab reports submitted by students</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            All Reports ({reports.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-semibold">#</th>
                <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-semibold">Student</th>
                <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-semibold">Experiment</th>
                <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-semibold">Teacher Code</th>
                <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-semibold">Submitted</th>
                <th className="text-left p-4 text-gray-600 dark:text-gray-400 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <motion.tr
                  key={report._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  <td className="p-4 text-gray-800 dark:text-gray-200">{index + 1}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {report.studentName.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{report.studentName}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <FileText size={16} />
                      {report.experiment}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold">
                      {report.teacherCode}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <Calendar size={16} />
                      {new Date(report.submittedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-all"
                        title="Download"
                      >
                        <Download size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(report._id)}
                        className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {reports.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                <FileText size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No reports submitted yet
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
