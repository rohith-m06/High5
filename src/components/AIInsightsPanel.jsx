'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIInsightsPanel({ publication }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const generateSummary = async () => {
    if (!publication?.source_url) {
      setSummary("⚠️ No URL available for this publication.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/aiSummary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source_url: publication.source_url }),
      });
      const data = await res.json();
      setSummary(data.summary || "🧠 No summary generated for this article.");
    } catch (err) {
      setSummary("❌ Error generating summary.");
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newUserMsg = { role: 'user', content: chatInput };
    setChatHistory((prev) => [...prev, newUserMsg]);
    setChatInput('');

    try {
      const res = await fetch('/api/chatWithPublication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: chatInput,
          publicationData: publication,
        }),
      });
      const data = await res.json();
      const botReply = { role: 'assistant', content: data.reply || '🤖 No response.' };
      setChatHistory((prev) => [...prev, botReply]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Error connecting to chat service.' },
      ]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-black/70 backdrop-blur-md border border-cyan-700 shadow-lg"
    >
      <h2 className="text-xl font-semibold text-cyan-400 mb-3">🧠 AI Insights</h2>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={generateSummary}
          disabled={loading}
          className={`px-5 py-2 rounded-xl font-semibold text-white transition ${
            loading
              ? 'bg-cyan-800 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90'
          }`}
        >
          {loading ? 'Generating Summary...' : '✨ Generate Summary'}
        </button>

        <button
          onClick={() => setChatOpen((prev) => !prev)}
          className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition"
        >
          {chatOpen ? '💬 Close Chat' : '💬 Continue Chat'}
        </button>
      </div>

      {/* Summary Section */}
      <AnimatePresence>
        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-5 p-4 rounded-lg bg-black/50 border border-cyan-700 text-gray-300 text-sm leading-relaxed"
          >
            {summary}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className="mt-6 p-4 rounded-xl bg-gray-900/80 border border-purple-700 shadow-inner"
          >
            <div className="h-60 overflow-y-auto mb-4 space-y-3 pr-2">
              {chatHistory.length === 0 && (
                <p className="text-gray-500 text-sm text-center">
                  👋 Start chatting about this publication!
                </p>
              )}
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg max-w-[85%] ${
                    msg.role === 'user'
                      ? 'bg-cyan-700 text-white self-end ml-auto'
                      : 'bg-gray-700 text-gray-200'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            <form onSubmit={handleChat} className="flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a question about this research..."
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-purple-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                🚀 Ask
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
