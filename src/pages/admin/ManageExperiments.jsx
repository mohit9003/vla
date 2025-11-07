import { useState } from "react";

export default function ManageExperiments() {
  const [experiments, setExperiments] = useState([
    { id: 1, name: "Ohm’s Law", subject: "Physics" },
    { id: 2, name: "Acid-Base Titration", subject: "Chemistry" },
  ]);

  const [newExp, setNewExp] = useState({ name: "", subject: "" });

  const addExperiment = () => {
    if (newExp.name && newExp.subject) {
      setExperiments([...experiments, { id: Date.now(), ...newExp }]);
      setNewExp({ name: "", subject: "" });
    }
  };

  const deleteExperiment = (id) => {
    setExperiments(experiments.filter((exp) => exp.id !== id));
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">⚗️ Manage Experiments</h2>

      <div className="flex gap-3 mb-6">
        <input
          placeholder="Experiment Name"
          className="border p-2 rounded-lg"
          value={newExp.name}
          onChange={(e) => setNewExp({ ...newExp, name: e.target.value })}
        />
        <input
          placeholder="Subject"
          className="border p-2 rounded-lg"
          value={newExp.subject}
          onChange={(e) => setNewExp({ ...newExp, subject: e.target.value })}
        />
        <button
          onClick={addExperiment}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          ➕ Add
        </button>
      </div>

      <ul className="space-y-3">
        {experiments.map((exp) => (
          <li
            key={exp.id}
            className="flex justify-between items-center bg-white shadow p-3 rounded-lg"
          >
            <span>{exp.name} ({exp.subject})</span>
            <button
              onClick={() => deleteExperiment(exp.id)}
              className="text-red-500 hover:text-red-700"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
