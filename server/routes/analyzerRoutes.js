import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  analyzeResumeMatch,
  getAnalysisHistory,
  getAnalysisById,
} from "../controllers/analyzerController.js";

const analyzerRouter = express.Router();

analyzerRouter.use(protect);

analyzerRouter.post("/analyze", analyzeResumeMatch);
analyzerRouter.get("/history/:resumeId", getAnalysisHistory);
analyzerRouter.get("/result/:analysisId", getAnalysisById);

export default analyzerRouter;
