import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiX, FiMessageSquare } from "react-icons/fi";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi there! I am the Sky Tech Makers assistant. How can I help you today?" },
  ]);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages, isOpen]);

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
      
      if (res.status === 429) {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { 
            type: "bot", 
            text: "⚠️ Gemini API Quota Exceeded (HTTP 429):\n\nYour API key Generate Content limit is set to 0 per minute in Google Cloud Console or the region is restricted. Please check your Google Cloud/AI Studio quota settings or swap in a new API key in your client/.env file." 
          },
        ]);
        return;
      }

      if (!res.ok) {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { 
            type: "bot", 
            text: `⚠️ API Error (${res.status}):\n\n${data?.error?.message || "Failed to get a response from Gemini."}` 
          },
        ]);
        return;
      }

      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't respond. Please check your network or try again later.";
      
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "bot", text: reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: "bot", text: "Something went wrong! Please check your network connection." },
      ]);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Chat Button */}
      <motion.div
        drag
        dragMomentum={false}
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full cursor-grab active:cursor-grabbing z-50 bg-gradient-to-br from-indigo-500 to-violet-600 shadow-2xl shadow-indigo-500/30 border border-white/10"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {isOpen ? (
          <FiX className="w-6 h-6 text-white" />
        ) : (
          <img
            src="/ChatBot-Robot-1.gif"
            alt="Robot"
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
        )}
      </motion.div>

      {/* Chat Box Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-8 w-auto sm:w-full sm:max-w-md bg-[#10121f] border border-white/7 rounded-2xl shadow-2xl shadow-black/50 flex flex-col z-50 overflow-hidden cursor-grab active:cursor-grabbing"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 px-5 flex items-center justify-between relative shadow-lg shadow-indigo-600/10">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <FiMessageSquare className="w-4 h-4 text-white" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 border border-indigo-600 animate-pulse" />
                </div>
                <div className="text-left">
                  <h2 className="text-sm font-extrabold leading-none">Sky Assistant</h2>
                  <span className="text-[10px] text-indigo-200 font-medium leading-none block mt-1">Ask questions 24/7</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 text-white flex items-center justify-center transition-all duration-200"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Messages container */}
            <ul
              ref={chatBoxRef}
              className="h-[60vh] sm:h-[380px] overflow-y-auto p-4 space-y-4 bg-[#080b14] scrollbar-thin"
            >
              {messages.map((msg, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.text === "Thinking..." ? (
                    <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-none bg-[#131524] border border-white/5 text-slate-400">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  ) : (
                    <p
                      className={`px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-lg ${
                        msg.type === "user"
                          ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-tr-none shadow-indigo-600/10"
                          : "bg-[#131524] text-slate-200 border border-white/6 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </p>
                  )}
                </motion.li>
              ))}
            </ul>

            {/* Input Section */}
            <div className="flex items-center gap-2 p-3 bg-[#10121f] border-t border-white/5">
              <textarea
                className="flex-grow resize-none p-3 bg-[#131524] border border-white/8 text-white rounded-xl text-sm focus:outline-none focus:border-indigo-500/50 placeholder-slate-700 transition-all duration-200"
                rows={1}
                placeholder="Ask anything about tech..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  (e.preventDefault(), handleSend())
                }
              />
              <button
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all flex-shrink-0"
                onClick={handleSend}
              >
                <FiSend className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
