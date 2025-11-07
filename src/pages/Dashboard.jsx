import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [labs, setLabs] = useState([]);
  const [teacherCode, setTeacherCode] = useState("");

  // Fetch available labs from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/labs")
      .then(res => res.json())
      .then(data => setLabs(data))
      .catch(err => console.log(err));
  }, []);

  // Fetch last used teacher code for student
  useEffect(() => {
    fetch("http://localhost:5000/api/users/last-teacher-code")
      .then(res => res.json())
      .then(data => setTeacherCode(data.code || ""))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-all">
      {/* Sidebar */}
      <Sidebar role="student" />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Navbar role="student" />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Side Cards */}
          <div className="space-y-6">
            {/* Virtual Labs Card */}
            <div
              onClick={() => navigate("/virtual-labs")}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
                Virtual Labs 🧪
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Access lab simulations, procedures, and AI guidance.
              </p>
              <p className="text-gray-500 mt-1">Total Labs: {labs.length}</p>
            </div>

            {/* Study Resources Card */}
            <div
              onClick={() => navigate("/resources")}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
                Study Resources 📘
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                View manuals, PDFs, and video tutorials.
              </p>
            </div>

            {/* Submit Report Card */}
            <div
              onClick={() => navigate("/submit-report")}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
                Submit Report 📤
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Upload your lab report and submit using your Teacher Code.
              </p>
              {teacherCode && (
                <p className="text-gray-500 mt-1">Last used code: {teacherCode}</p>
              )}
            </div>
          </div>

          {/* Right Side - AI Chatbot */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300 mb-4">
              AI Assistant 🤖
            </h2>
            <Chatbot />
          </div>
        </div>
      </div>
    </div>
  );
}
