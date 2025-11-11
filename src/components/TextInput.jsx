import { useState } from "react";

function TextInput({ onAnalyze }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAnalyze(text.trim());
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-2xl shadow-md transition"
    >
      <textarea
        className="w-full border p-3 rounded-lg resize-none focus:ring-2 focus:ring-blue-400 outline-none"
        rows="5"
        placeholder="Paste your social media post or caption here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center justify-between mt-3">
        <span className="text-sm text-slate-500">
          {text.length} / 500 characters
        </span>
        <button
          type="submit"
          disabled={!text.trim()}
          className={`px-4 py-2 rounded-lg text-white transition ${
            !text.trim()
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Analyze
        </button>
      </div>
    </form>
  );
}

export default TextInput;
