import mongoose from "mongoose";

/**
 * JobAnalysis Model
 * Stores the results of an AI-powered resume vs. job description analysis.
 * Standalone collection — does NOT alter the existing Resume schema.
 */
const JobAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      index: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      default: "",
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    matchedKeywords: [{ type: String }],
    missingKeywords: [{ type: String }],
    suggestions: [
      {
        category: { type: String },
        priority: { type: String, enum: ["high", "medium", "low"] },
        suggestion: { type: String },
      },
    ],
    analysisSummary: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const JobAnalysis = mongoose.model("JobAnalysis", JobAnalysisSchema);

export default JobAnalysis;
