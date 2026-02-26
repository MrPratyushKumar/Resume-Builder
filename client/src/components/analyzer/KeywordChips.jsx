import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const KeywordChips = ({ matched = [], missing = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle size={18} className="text-green-600" />
          <h4 className="text-sm font-semibold text-green-800">
            Matched Keywords ({matched.length})
          </h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {matched.length > 0 ? (
            matched.map((kw, i) => (
              <span key={i} className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full border border-green-300">
                {kw}
              </span>
            ))
          ) : (
            <p className="text-xs text-green-700 italic">None found</p>
          )}
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <XCircle size={18} className="text-red-500" />
          <h4 className="text-sm font-semibold text-red-800">
            Missing Keywords ({missing.length})
          </h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {missing.length > 0 ? (
            missing.map((kw, i) => (
              <span key={i} className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full border border-red-300">
                {kw}
              </span>
            ))
          ) : (
            <p className="text-xs text-red-700 italic">No critical keywords missing!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeywordChips;
