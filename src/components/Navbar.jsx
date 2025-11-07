import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 shadow-md p-4 rounded-xl mb-4 transition-all">
      <h1 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
        Dashboard
      </h1>

      <button
        onClick={toggleTheme}
        className="bg-indigo-100 dark:bg-gray-700 p-2 rounded-full hover:scale-110 transition-transform"
      >
        {dark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}
