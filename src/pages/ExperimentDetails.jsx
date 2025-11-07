import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ExperimentDetails() {
  const { id } = useParams();
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I'm your Virtual Lab Assistant 🤖. How can I help you with this experiment?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    // Simulated AI reply
    setTimeout(() => {
      const aiReply = { sender: "ai", text: generateAIResponse(input) };
      setMessages((prev) => [...prev, aiReply]);
    }, 1000);
  };

  const generateAIResponse = (query) => {
    const lower = query.toLowerCase();
    if (lower.includes("step") || lower.includes("procedure"))
      return "Make sure you carefully follow the experimental steps in the given order for accurate readings.";
    if (lower.includes("theory"))
      return "This experiment demonstrates the basic scientific principle behind the law being tested.";
    if (lower.includes("result"))
      return "Analyze your readings and calculate the mean values for precise results.";
    return "I’m here to assist with theory, procedure, or safety guidelines of this experiment.";
  };

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light p-8 font-poppins">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🔬 Experiment {id} - Details
      </motion.h1>

      {/* Theory & Procedure */}
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-smooth p-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-semibold mb-2 text-primary">📘 Theory</h2>
        <p className="opacity-80">
          This experiment focuses on understanding key scientific principles and their real-world applications.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-secondary">⚙️ Procedure</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Setup all apparatus properly on the lab table.</li>
          <li>Record initial observations before applying any input.</li>
          <li>Perform the experiment step-by-step with precision.</li>
          <li>Note final readings and calculate the results.</li>
        </ol>
      </motion.div>

      {/* 💬 AI Chatbot Section */}
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-glow p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-accent">🤖 Virtual Lab Assistant</h2>

        {/* Chat Box */}
        <div className="h-72 overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-xl p-4 mb-4 bg-gray-50 dark:bg-gray-800">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                  msg.sender === "user"
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about theory, steps, or result..."
            className="flex-1 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-secondary transition active:scale-95"
          >
            Send
          </button>
        </div>
      </motion.div>
    </div>
  );
}
