import { useNavigate } from "react-router-dom";

const labs = [
  { id: 1, name: "Physics Lab", desc: "Explore mechanics, optics and motion.", color: "from-indigo-500 to-purple-500" },
  { id: 2, name: "Chemistry Lab", desc: "Mix and analyze compounds safely.", color: "from-pink-500 to-red-400" },
  { id: 3, name: "Computer Science Lab", desc: "Run algorithms and simulations.", color: "from-green-500 to-emerald-400" },
  { id: 4, name: "Electrical Lab", desc: "Circuit theory and power systems.", color: "from-yellow-400 to-orange-500" },
];

export default function VirtualLabs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light p-10 font-poppins">
      <h1 className="text-4xl font-bold mb-8 text-center animate-fadeIn">⚡ Virtual Labs</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {labs.map((lab) => (
          <div
            key={lab.id}
            onClick={() => navigate(`/experiment/${lab.id}`)}
            className={`bg-gradient-to-br ${lab.color} text-white rounded-2xl shadow-glow p-6 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl`}
          >
            <h2 className="text-2xl font-semibold mb-2">{lab.name}</h2>
            <p className="text-sm opacity-90">{lab.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
