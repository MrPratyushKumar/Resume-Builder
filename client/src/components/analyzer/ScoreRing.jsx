import React from "react";

const ScoreRing = ({ score }) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - score) / 100) * circumference;

  const getColor = () => {
    if (score >= 75) return "#22c55e";
    if (score >= 50) return "#eab308";
    return "#ef4444";
  };

  const getLabel = () => {
    if (score >= 75) return "Strong Match";
    if (score >= 50) return "Good Foundation";
    if (score >= 35) return "Needs Work";
    return "Weak Match";
  };

  return (
    <div className="flex flex-col items-center justify-center relative w-36 h-36">
      <svg width="140" height="140" className="absolute top-0 left-0 -rotate-90">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="70" cy="70" r={radius} fill="none"
          stroke={getColor()} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={progress}
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
        />
      </svg>
      <div className="flex flex-col items-center justify-center z-10">
        <span className="text-3xl font-bold" style={{ color: getColor() }}>{score}%</span>
        <span className="text-xs text-gray-500 font-medium mt-0.5">{getLabel()}</span>
      </div>
    </div>
  );
};

export default ScoreRing;
