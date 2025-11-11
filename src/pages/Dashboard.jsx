import { useState, useEffect, useCallback } from "react";

import TextInput from "../components/TextInput";
import ResultCard from "../components/ResultCard";
import SentimentChart from "../components/SentimentChart";
import Header from "../pages/Header";
import HistoryList from "../pages/HistoryList";
import { analyzeText } from "../utils/textAnalysis";

function Dashboard() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sma_history");
      if (saved) setHistory(JSON.parse(saved));
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("sma_history", JSON.stringify(history));
    }
  }, [history]);

  const handleAnalyze = useCallback(
    (text) => {
      if (!text.trim()) return;
      const analysis = analyzeText(text);
      setResult(analysis);
      const newHistory = [
        { input: text, analysis, ts: Date.now() },
        ...history,
      ].slice(0, 20);
      setHistory(newHistory);
    },
    [history]
  );

  const handleClearHistory = () => {
    if (window.confirm("Clear all history?")) {
      localStorage.removeItem("sma_history");
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex items-start justify-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <Header />

        {/* Input Area */}
        <TextInput onAnalyze={handleAnalyze} />

        {/* Analysis Result + Chart */}
        {result && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ResultCard data={result} />
            </div>
            <div className="md:col-span-1">
              <SentimentChart data={result} />
            </div>
          </div>
        )}

        {/* History Section */}
        <HistoryList history={history} onClear={handleClearHistory} />
      </div>
    </div>
  );
}

export default Dashboard;