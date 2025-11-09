import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  FlaskConical,
  FileText,
  LogOut,
  KeyRound,
  Megaphone,
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Dashboard");
  const [classCode, setClassCode] = useState(
    localStorage.getItem("teacherCode") || "VLA123"
  );
  const [reports, setReports] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeLabs, setActiveLabs] = useState(0);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    { name: "Manage Users", icon: <Users size={20} />, path: "/admin/users" },
    { name: "Manage Experiments", icon: <FlaskConical size={20} />, path: "/admin/experiments" },
    { name: "View Reports", icon: <FileText size={20} />, path: "/admin/reports" },
    { name: "Announcements", icon: <Megaphone size={20} />, path: "/admin/announcements" },
  ];

  const handleLogout = () => {
    navigate("/admin/login");
  };

  // Generate new teacher code
  const generateCode = () => {
    const newCode = "VLA" + Math.floor(1000 + Math.random() * 9000);
    setClassCode(newCode);
    localStorage.setItem("teacherCode", newCode); // store for future report fetch
  };

  // Fetch reports for this teacher code
  useEffect(() => {
    const storedCode = localStorage.getItem("teacherCode") || classCode;

    fetch(`/api/reports/teacher/${storedCode}`)
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.log(err));
  }, [classCode]);

  // Fetch total users
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setTotalUsers(data.length))
      .catch((err) => console.log(err));
  }, []);

  // Fetch active experiments
  useEffect(() => {
    fetch("/api/labs")
      .then((res) => res.json())
      .then((data) => setActiveLabs(data.length))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col p-5">
        <h1 className="text-2xl font-bold mb-10 text-center">Admin Panel 🧑‍💼</h1>

        <nav className="flex-1 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActive(item.name);
                navigate(item.path);
              }}
              className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-xl transition-all ${
                active === item.name ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 mt-auto py-2 rounded-xl bg-red-600 hover:bg-red-700 transition-all"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Welcome, Admin 👋
        </h2>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-2xl hover:shadow-xl transition-all">
            <h3 className="font-semibold text-lg mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-2xl hover:shadow-xl transition-all">
            <h3 className="font-semibold text-lg mb-2">Active Experiments</h3>
            <p className="text-3xl font-bold text-green-600">{activeLabs}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-2xl hover:shadow-xl transition-all">
            <h3 className="font-semibold text-lg mb-2">Reports Received</h3>
            <p className="text-3xl font-bold text-purple-600">{reports.length}</p>
          </div>
        </div>

        {/* Class Code Generator */}
        <div className="mt-10 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <KeyRound size={26} className="text-indigo-600" />
            <h3 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-300">
              Teacher Code Generator
            </h3>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Share this code with your students — they’ll use it to submit experiment reports.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-xl font-mono bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600">
              {classCode}
            </span>
            <button
              onClick={generateCode}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition-all"
            >
              Generate New Code
            </button>
          </div>
        </div>

        {/* Reports Table */}
        <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <h3 className="text-2xl font-semibold mb-4">Submitted Reports</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-3">#</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Experiment</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, index) => (
                <tr key={r._id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{r.studentName}</td>
                  <td className="p-3">{r.experiment}</td>
                  <td className="p-3">{new Date(r.submittedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
