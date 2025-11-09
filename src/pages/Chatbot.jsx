import { useState } from "react";

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me anything about your Virtual Lab.", sender: "bot" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { text: data.answer, sender: "bot" }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { text: "Error fetching AI response", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">AI Assistant 🤖</h1>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-xs ${
              m.sender === "bot"
                ? "bg-indigo-100 text-black"
                : "bg-gray-300 text-black ml-auto"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && <div className="text-gray-500 italic">AI is typing...</div>}
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask your question..."
          className="flex-1 border rounded-l-xl px-4 py-2 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 text-white px-5 py-2 rounded-r-xl hover:bg-indigo-700 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}
