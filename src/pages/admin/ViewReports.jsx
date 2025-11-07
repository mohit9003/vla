import { useEffect, useState } from "react";

export default function ViewReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch reports submitted by students from localStorage
    const storedReports = JSON.parse(localStorage.getItem("submittedReports")) || [];

    // Get teacher's class code
    const teacherCode = localStorage.getItem("teacherCode");

    // Filter reports by teacher code
    const teacherReports = storedReports.filter((r) => r.classCode === teacherCode);

    setReports(teacherReports);
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📄 Submitted Reports</h2>

      {reports.length === 0 ? (
        <div className="text-center mt-10 bg-white p-10 rounded-2xl shadow-md">
          <p className="text-gray-600 text-lg">
            No reports submitted yet for your class code. 💡
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">#</th>
                <th className="p-3">Student</th>
                <th className="p-3">Experiment</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, index) => (
                <tr key={index} className="border-b hover:bg-gray-100 transition">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{r.student}</td>
                  <td className="p-3">{r.experiment}</td>
                  <td className="p-3">{r.date}</td>
                  <td className="p-3">
                    <button className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
