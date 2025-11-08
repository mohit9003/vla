import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Beaker, BookOpen, MessageCircle, Send, Sparkles } from "lucide-react";
import CodeEditor from "../components/CodeEditor";
import { experimentContent } from "../data/experimentContent";

export default function ExperimentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lab, setLab] = useState(null);
  const [labInfo, setLabInfo] = useState(null);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I'm your Virtual Lab Assistant 🤖. How can I help you with this experiment?" },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/experiments/${id}`)
      .then(res => res.json())
      .then(data => {
        setLab(data);
        if (data.labId) {
          fetch(`http://localhost:5000/api/labs/${data.labId}`)
            .then(res => res.json())
            .then(labData => setLabInfo(labData))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

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
    return "I'm here to assist with theory, procedure, or safety guidelines of this experiment.";
  };

  if (!lab) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate("/virtual-labs")}
        className="flex items-center gap-2 mb-6 px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl shadow-md hover:shadow-lg transition-all"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Labs</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${lab.color} rounded-full mb-4 shadow-lg`}>
          <Beaker size={40} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {lab.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg flex items-center justify-center gap-2">
          <Sparkles size={18} />
          {lab.description}
        </p>
      </motion.div>

      {labInfo?.name === "Computer Science Lab" ? (
        <div className="max-w-7xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6"
          >
            <CodeEditor experimentName={lab.name} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">AI Assistant</h2>
            </div>

            <div className="h-64 overflow-y-auto border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-4 mb-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-md ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none"
                        : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about the experiment..."
                className="flex-1 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Send size={18} />
              </motion.button>
            </div>
          </motion.div>

          <button
            onClick={() => navigate("/submit-report")}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold"
          >
            Submit Lab Report
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 space-y-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <BookOpen size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Theory</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {experimentContent[lab.name]?.theory || "Theory content for this experiment will be available soon."}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Beaker size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Procedure</h2>
              </div>
              <ol className="space-y-3 text-gray-600 dark:text-gray-300">
                {experimentContent[lab.name]?.procedure?.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full flex items-center justify-center text-sm font-bold">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                )) || (
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <span>Procedure steps will be available soon.</span>
                  </li>
                )}
              </ol>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate("/submit-report")}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold"
              >
                Submit Lab Report
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8"
          >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <MessageCircle size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">AI Assistant</h2>
          </div>

          <div className="h-96 overflow-y-auto border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-4 mb-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl text-sm shadow-md ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none"
                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about theory, steps, or results..."
              className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Send size={18} />
            </motion.button>
          </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
