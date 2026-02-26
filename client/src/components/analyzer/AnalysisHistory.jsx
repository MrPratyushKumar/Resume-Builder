import React from "react";
import { Clock, ChevronRight } from "lucide-react";

const AnalysisHistory = ({ history = [], onSelect }) => {
  if (history.length === 0) {
    return <p className="text-sm text-gray-400 italic py-2">No past analyses yet.</p>;
  }

  const getScoreColor = (score) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-500";
  };

  return (
    <div className="space-y-2">
      {history.map((item) => (
        <button
          key={item._id}
          onClick={() => onSelect(item._id)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm transition-all text-left group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Clock size={15} className="text-gray-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{item.jobTitle || "Untitled Role"}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-sm font-bold ${getScoreColor(item.matchScore)}`}>{item.matchScore}%</span>
            <ChevronRight size={15} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
          </div>
        </button>
      ))}
    </div>
  );
};

export default AnalysisHistory;
