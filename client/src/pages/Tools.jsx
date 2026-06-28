import { useState } from "react";
import { motion } from "framer-motion";
import { formatJson } from "../services/tools";
import { FiCode, FiCopy, FiCheck, FiTool, FiZap } from "react-icons/fi";

const TOOL_CARDS = [
  {
    id: "json",
    label: "JSON Formatter",
    icon: FiCode,
    desc: "Paste and format raw JSON into readable, indented output instantly.",
    color: "from-sky-500 to-indigo-500",
    border: "border-sky-500/20",
    glow: "bg-sky-500/10",
  },
];

export default function Tools() {
  const [jsonInput, setJsonInput] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFormat = async () => {
    try {
      const result = await formatJson(jsonInput);
      setFormattedJson(result);
      setError("");
    } catch {
      setError("Invalid JSON format. Please check your input.");
      setFormattedJson("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-sky-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 mb-5">
            <FiTool className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">Developer Tools</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Dev <span className="gradient-text-blue">Utilities</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            A collection of handy tools to speed up your developer workflow.
          </p>
        </motion.div>

        {/* Tool Cards row */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {TOOL_CARDS.map(({ id, label, icon: Icon, color, border, glow }) => (
            <div key={id} className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10121f] border ${border} cursor-pointer`}>
              <div className={`w-7 h-7 rounded-lg ${glow} flex items-center justify-center`}>
                <Icon className="w-3.5 h-3.5 text-sky-400" />
              </div>
              <span className="text-sm font-semibold text-white">{label}</span>
            </div>
          ))}
        </div>

        {/* JSON Formatter */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Input */}
          <div className="bg-[#10121f] border border-white/7 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-sky-500/10 border border-sky-500/20 rounded-lg flex items-center justify-center">
                <FiCode className="w-3.5 h-3.5 text-sky-400" />
              </div>
              <h2 className="text-white font-bold text-base">Input JSON</h2>
            </div>
            <textarea
              id="json-input"
              rows={14}
              className="w-full px-4 py-3 bg-[#080b14] border border-white/6 rounded-xl font-mono text-sm text-slate-300 placeholder-slate-700 focus:outline-none focus:border-sky-500/40 focus:bg-sky-500/3 resize-none transition-all scrollbar-thin"
              placeholder={'{\n  "key": "value",\n  "array": [1, 2, 3]\n}'}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            <motion.button
              onClick={handleFormat}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 shadow-lg shadow-sky-500/20 transition-all duration-200"
            >
              <FiZap className="w-4 h-4" />
              Format JSON
            </motion.button>
          </div>

          {/* Output */}
          <div className="bg-[#10121f] border border-white/7 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center">
                  <FiCheck className="w-3.5 h-3.5 text-green-400" />
                </div>
                <h2 className="text-white font-bold text-base">Formatted Output</h2>
              </div>
              {formattedJson && (
                <motion.button
                  onClick={handleCopy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200 ${
                    copied
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/20"
                  }`}
                >
                  {copied ? <><FiCheck className="w-3 h-3" /> Copied!</> : <><FiCopy className="w-3 h-3" /> Copy</>}
                </motion.button>
              )}
            </div>

            {error ? (
              <div className="px-4 py-3 bg-red-500/8 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
                ⚠ {error}
              </div>
            ) : formattedJson ? (
              <pre className="bg-[#080b14] border border-white/6 rounded-xl p-4 overflow-auto max-h-[360px] font-mono text-sm text-green-300 scrollbar-thin">
                {formattedJson}
              </pre>
            ) : (
              <div className="bg-[#080b14] border border-white/6 rounded-xl p-4 h-[360px] flex items-center justify-center">
                <p className="text-slate-700 text-sm font-medium">Formatted JSON will appear here...</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}