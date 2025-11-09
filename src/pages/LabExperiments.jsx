import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Beaker } from "lucide-react";

export default function LabExperiments() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lab, setLab] = useState(null);
  const [experiments, setExperiments] = useState([]);

  useEffect(() => {
    fetch(`/api/labs/${id}`)
      .then(res => res.json())
      .then(data => setLab(data))
      .catch(err => console.log(err));

    fetch(`/api/experiments/lab/${id}`)
      .then(res => res.json())
      .then(data => setExperiments(data))
      .catch(err => console.log(err));
  }, [id]);

  if (!lab) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-10">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate("/virtual-labs")}
        className="flex items-center gap-2 mb-6 sm:mb-8 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
      >
        <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
        <span className="font-medium">Back to Labs</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {lab.name} Experiments
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg px-4">
          {lab.description}
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {experiments.length > 0 ? (
          experiments.map((exp, idx) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => navigate(`/experiment/${exp._id}`)}
              className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${lab.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Beaker size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-1">{exp.name}</h3>
                  {exp.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{exp.description}</p>
                  )}
                  {exp.deadline && (
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                      Due: {new Date(exp.deadline).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No experiments available yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
