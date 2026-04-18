import { useState } from "react";
import { askQuestion } from "./api";

export default function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await askQuestion(query);
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-3 sm:px-6 py-4 flex flex-col items-center">
      
      {/* Header */}
      <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
        🧠 Smart Research Agent
      </h1>

      {/* Input */}
      <div className="w-full max-w-3xl">
        <textarea
          className="w-full p-3 sm:p-4 text-sm sm:text-base rounded-xl bg-[#1e293b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="4"
          placeholder="Ask something like 'Latest IPL updates today'..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={handleAsk}
          className="mt-3 sm:mt-4 w-full sm:w-auto px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      {/* Response */}
      {response && (
        <div className="w-full max-w-3xl mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          
          {/* User Message */}
          <div className="bg-[#1e293b] p-3 sm:p-4 rounded-xl border border-gray-700">
            <p className="text-xs sm:text-sm text-gray-400 mb-1">You</p>
            <p className="text-sm sm:text-base break-words">{query}</p>
          </div>

          {/* AI Response */}
          <div className="bg-[#020617] p-4 sm:p-6 rounded-xl border border-gray-800 shadow-lg space-y-4">
            
            {/* Summary */}
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-blue-400 mb-2">
                Summary
              </h2>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed break-words">
                {response.summary}
              </p>
            </div>

            {/* Key Points */}
            {response.key_points?.length > 0 && (
              <div>
                <h3 className="text-sm sm:text-md font-semibold text-green-400 mb-2">
                  Key Insights
                </h3>
                <ul className="space-y-2">
                  {response.key_points.map((point, i) => (
                    <li
                      key={i}
                      className="bg-[#1e293b] p-2 sm:p-3 rounded-lg border border-gray-700 text-sm sm:text-base break-words"
                    >
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sources */}
            {response.sources?.length > 0 && (
              <div>
                <h3 className="text-sm sm:text-md font-semibold text-purple-400 mb-2">
                  Sources
                </h3>
                <div className="space-y-2">
                  {response.sources.map((src, i) => (
                    <a
                      key={i}
                      href={src}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-blue-400 hover:underline text-xs sm:text-sm break-all"
                    >
                      🔗 {src}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}