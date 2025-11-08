import { useState } from "react";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me anything about your Virtual Lab.", sender: "bot" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { text: `❌ Error: ${data.error}`, sender: "bot" }]);
      } else {
        setMessages(prev => [...prev, { text: data.answer, sender: "bot" }]);
      }
    } catch (err) {
      console.log(err);
      setMessages(prev => [...prev, { text: `❌ Network Error: ${err.message}`, sender: "bot" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-96">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.sender === "bot" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[80%] whitespace-pre-line ${
                m.sender === "bot" 
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200" 
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask your question..."
          className="flex-1 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={handleSend}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 rounded-xl hover:shadow-lg transition-all font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
