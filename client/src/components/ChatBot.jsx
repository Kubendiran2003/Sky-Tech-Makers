import React, { useState, useEffect, useRef } from "react";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi there! How can I help you today?" },
  ]);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const loadingMsg = { type: "bot", text: "Thinking..." };
    setMessages((prev) => [...prev, loadingMsg]);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: userMessage.text }] }],
        }),
      });
      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't respond.";
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "bot", text: reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "bot", text: "Something went wrong!" },
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full cursor-pointer z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src="/src/assets/ChatBot-Robot-1.gif"
          alt="Robot"
          className="w-12 h-12 sm:w-16 sm:h-16"
        />
      </div>

      {/* Chat Box Panel */}
      {isOpen && (
        <div className="fixed bottom-20 left-8 right-2 sm:left-auto sm:right-28 w-auto sm:w-full sm:max-w-md bg-white rounded-xl shadow-xl flex flex-col z-50 border">
          {/* Header */}
          <div className="bg-blue-500 text-white text-center py-2 rounded-t-xl relative">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <span
              className="absolute right-4 top-2 cursor-pointer text-lg"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </span>
          </div>

          {/* Messages */}
          <ul
            ref={chatBoxRef}
            className="max-h-[60vh] sm:max-h-[400px] overflow-y-auto p-4 space-y-2 bg-gray-50"
          >
            {messages.map((msg, i) => (
              <li
                key={i}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <p
                  className={`px-4 py-2 rounded-lg max-w-[80%] text-sm whitespace-pre-wrap ${
                    msg.type === "user"
                      ? "bg-blue-200 text-black"
                      : "bg-green-200 text-black"
                  }`}
                >
                  {msg.text}
                </p>
              </li>
            ))}
          </ul>

          {/* Input Section */}
          <div className="flex items-center gap-2 p-3 border-t bg-blue-100">
            <textarea
              className="flex-1 resize-none p-2 rounded-md text-sm focus:outline-none"
              rows={1}
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                !e.shiftKey &&
                (e.preventDefault(), handleSend())
              }
            ></textarea>
            <button
              className="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full"
              onClick={handleSend}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
