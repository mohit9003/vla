import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, FlaskConical, FileText, LogOut, Megaphone, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ManageExperiments() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Manage Experiments");
  const [experiments, setExperiments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);
  const [resourceName, setResourceName] = useState("");
  const [resourceType, setResourceType] = useState("PDF");
  const [uploadMethod, setUploadMethod] = useState("url");
  const [resourceUrl, setResourceUrl] = useState("");
  const [file, setFile] = useState(null);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    { name: "Manage Users", icon: <Users size={20} />, path: "/admin/users" },
    { name: "Manage Experiments", icon: <FlaskConical size={20} />, path: "/admin/experiments" },
    { name: "View Reports", icon: <FileText size={20} />, path: "/admin/reports" },
    { name: "Announcements", icon: <Megaphone size={20} />, path: "/admin/announcements" },
  ];

  const handleLogout = () => navigate("/admin/login");

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = () => {
    fetch("/api/labs")
      .then(res => res.json())
      .then(data => setExperiments(data))
      .catch(err => console.log(err));
  };

  const handleAddResource = (e) => {
    e.preventDefault();
    
    let finalUrl = resourceUrl;
    if (uploadMethod === "file" && file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        finalUrl = reader.result;
        saveResource(finalUrl);
      };
      reader.readAsDataURL(file);
      return;
    }
    saveResource(finalUrl);
  };

  const saveResource = (url) => {
    const updatedResources = [...(selectedLab.resources || []), { name: resourceName, type: resourceType, url }];
    
    fetch(`/api/labs/${selectedLab._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...selectedLab, resources: updatedResources })
    })
      .then(res => res.json())
      .then(() => {
        setResourceName("");
        setResourceType("PDF");
        setResourceUrl("");
        setFile(null);
        setUploadMethod("url");
        setShowModal(false);
        fetchLabs();
      })
      .catch(err => console.log(err));
  };

  const handleDeleteResource = (labId, resourceIndex) => {
    const lab = experiments.find(l => l._id === labId);
    const updatedResources = lab.resources.filter((_, i) => i !== resourceIndex);
    
    fetch(`/api/labs/${labId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lab, resources: updatedResources })
    })
      .then(() => fetchLabs())
      .catch(err => console.log(err));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-64 bg-gray-900 text-white flex flex-col p-5">
        <h1 className="text-2xl font-bold mb-10 text-center">Admin Panel 🧑💼</h1>
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
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Manage Experiment Resources</h2>

        <div className="space-y-4">
          {experiments.map((exp) => (
            <div key={exp._id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{exp.name}</h3>
                <button
                  onClick={() => {
                    setSelectedLab(exp);
                    setShowModal(true);
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2"
                >
                  <Plus size={18} /> Add Resource
                </button>
              </div>
              
              {exp.resources && exp.resources.length > 0 ? (
                <div className="space-y-2">
                  {exp.resources.map((resource, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div>
                        <span className="font-semibold">{resource.name}</span>
                        <span className="text-sm text-gray-500 ml-2">({resource.type})</span>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-sm ml-2 hover:underline">View</a>
                      </div>
                      <button
                        onClick={() => handleDeleteResource(exp._id, idx)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No resources added yet</p>
              )}
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
                <h3 className="text-2xl font-bold mb-4">Add Resource to {selectedLab?.name}</h3>
                <form onSubmit={handleAddResource}>
                  <input
                    type="text"
                    placeholder="Resource Name"
                    value={resourceName}
                    onChange={(e) => setResourceName(e.target.value)}
                    required
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <select
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value)}
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Video">Video</option>
                    <option value="Link">Link</option>
                  </select>
                  <select
                    value={uploadMethod}
                    onChange={(e) => {
                      setUploadMethod(e.target.value);
                      setResourceUrl("");
                      setFile(null);
                    }}
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="url">Enter URL</option>
                    <option value="file">Upload File</option>
                  </select>
                  {uploadMethod === "url" ? (
                    <input
                      type="url"
                      placeholder="Resource URL"
                      value={resourceUrl}
                      onChange={(e) => setResourceUrl(e.target.value)}
                      required
                      className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      required
                      accept=".pdf,.doc,.docx,.mp4,.avi,.mov"
                      className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                    />
                  )}
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition-all"
                    >
                      Add
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
