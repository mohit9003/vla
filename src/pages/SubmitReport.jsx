import { useState } from "react";

export default function SubmitReport() {
  const [studentName, setStudentName] = useState("");
  const [experiment, setExperiment] = useState("");
  const [teacherCode, setTeacherCode] = useState(localStorage.getItem("teacherCode") || "");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentName, experiment, teacherCode }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Report submitted successfully ✅");
        setStudentName("");
        setExperiment("");
      } else {
        setMessage(data.message || "Error submitting report ❌");
      }
    } catch (err) {
      console.log(err);
      setMessage("Server error ❌");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Submit Report 📤</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Experiment Name"
          value={experiment}
          onChange={(e) => setExperiment(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Teacher Code"
          value={teacherCode}
          onChange={(e) => setTeacherCode(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </div>
  );
}
