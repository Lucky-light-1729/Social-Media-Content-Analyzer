import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

export default function HistoryList({ history, onClear }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="mt-10 pt-6 border-t border-slate-200">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-lg font-semibold text-slate-700 hover:text-slate-900 transition"
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          Analysis History
        </button>

        {history.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-sm bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-200 transition font-medium"
          >
            <Trash2 size={14} /> Clear
          </button>
        )}
      </div>

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        {history.length === 0 ? (
          <p className="text-sm text-slate-500 italic mt-2">
            No analysis history yet.
          </p>
        ) : (
          <div className="space-y-2 overflow-y-auto pr-1 h-60">
            {history.map((h) => (
              <div
                key={h.ts}
                className="p-3 bg-white rounded-xl shadow hover:shadow-md transition"
              >
                <div className="text-xs text-slate-400 mb-1">
                  {new Date(h.ts).toLocaleString()}
                </div>
                <div className="text-sm text-slate-700 line-clamp-3">
                  {h.input}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
