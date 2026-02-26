import React from "react";
import { Lightbulb } from "lucide-react";

const PRIORITY_STYLES = {
  high:   { badge: "bg-red-100 text-red-700 border-red-300",    border: "border-l-red-500" },
  medium: { badge: "bg-yellow-100 text-yellow-700 border-yellow-300", border: "border-l-yellow-500" },
  low:    { badge: "bg-blue-100 text-blue-700 border-blue-300", border: "border-l-blue-400" },
};

const SuggestionsList = ({ suggestions = [] }) => {
  const ordered = [...suggestions].sort((a, b) => {
    const rank = { high: 0, medium: 1, low: 2 };
    return (rank[a.priority] ?? 1) - (rank[b.priority] ?? 1);
  });

  if (ordered.length === 0) {
    return <p className="text-sm text-gray-500 italic">No suggestions available.</p>;
  }

  return (
    <div className="space-y-3">
      {ordered.map((item, i) => {
        const styles = PRIORITY_STYLES[item.priority] || PRIORITY_STYLES.low;
        return (
          <div key={i} className={`flex gap-3 p-4 bg-white border border-gray-100 border-l-4 ${styles.border} rounded-lg shadow-sm`}>
            <Lightbulb size={18} className="text-gray-400 mt-0.5 shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{item.category}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${styles.badge}`}>{item.priority}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{item.suggestion}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestionsList;
