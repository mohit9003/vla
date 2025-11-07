import { useState } from "react";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me anything about your Virtual Lab.", sender: "bot" },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { text: data.answer, sender: "bot" }]);
    } catch (err) {
      console.log(err);
      setMessages(prev => [...prev, { text: "Error fetching AI response", sender: "bot" }]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-xs ${
              m.sender === "bot" ? "bg-indigo-100 text-black" : "bg-gray-300 text-black ml-auto"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask your question..."
          className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 text-white px-4 rounded-r-lg hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
