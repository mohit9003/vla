import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, FlaskConical, FileText, LogOut, Megaphone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Announcements() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Announcements");
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    { name: "Manage Users", icon: <Users size={20} />, path: "/admin/users" },
    { name: "Manage Experiments", icon: <FlaskConical size={20} />, path: "/admin/experiments" },
    { name: "View Reports", icon: <FileText size={20} />, path: "/admin/reports" },
    { name: "Announcements", icon: <Megaphone size={20} />, path: "/admin/announcements" },
  ];

  const handleLogout = () => navigate("/admin/login");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = () => {
    fetch("/api/announcements")
      .then(res => res.json())
      .then(data => setAnnouncements(data))
      .catch(err => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, message })
    })
      .then(res => res.json())
      .then(() => {
        setTitle("");
        setMessage("");
        setShowModal(false);
        fetchAnnouncements();
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    fetch(`/api/announcements/${id}`, { method: "DELETE" })
      .then(() => fetchAnnouncements())
      .catch(err => console.log(err));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
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

      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Announcements</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition-all"
          >
            + New Announcement
          </button>
        </div>

        <div className="space-y-4">
          {announcements.map((ann) => (
            <div key={ann._id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{ann.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{ann.message}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(ann.createdAt).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(ann._id)}
                  className="text-red-600 hover:text-red-700 ml-4"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
              >
                <h3 className="text-2xl font-bold mb-4">Create Announcement</h3>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <textarea
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows="4"
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition-all"
                    >
                      Post
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white py-2 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
