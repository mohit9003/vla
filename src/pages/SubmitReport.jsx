import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Send, ArrowLeft, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SubmitReport() {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [experiment, setExperiment] = useState("");
  const [teacherCode, setTeacherCode] = useState(localStorage.getItem("teacherCode") || "");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    
    try {
      const formData = new FormData();
      formData.append('studentName', studentName);
      formData.append('experiment', experiment);
      formData.append('teacherCode', teacherCode);
      if (selectedFile) {
        formData.append('reportFile', selectedFile);
      }

      const res = await fetch("/api/reports", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("teacherCode", teacherCode);
        setMessage("success");
        setStudentName("");
        setExperiment("");
        setSelectedFile(null);
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

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Attach Report File (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-indigo-500 transition-all">
                {!selectedFile ? (
                  <div>
                    <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      PDF, DOC, DOCX up to 10MB
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 cursor-pointer transition-all"
                    >
                      <Upload size={16} className="mr-2" />
                      Choose File
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center">
                      <FileText size={24} className="text-indigo-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>
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
