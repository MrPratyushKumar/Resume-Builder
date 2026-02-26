import Resume from "../models/Resume.js";
import JobAnalysis from "../models/JobAnalysis.js";
import ai from "../configs/ai.js";

/**
 * Converts a resume Mongoose document into readable plain text for the AI prompt.
 */
const serializeResumeToText = (resume) => {
  const lines = [];

  const p = resume.personal_info || {};
  if (p.full_name) lines.push(`Name: ${p.full_name}`);
  if (p.profession) lines.push(`Profession: ${p.profession}`);
  if (p.location) lines.push(`Location: ${p.location}`);

  if (resume.professional_summary) {
    lines.push(`\nProfessional Summary:\n${resume.professional_summary}`);
  }

  if (resume.skills?.length) {
    lines.push(`\nSkills:\n${resume.skills.join(", ")}`);
  }

  if (resume.experience?.length) {
    lines.push("\nWork Experience:");
    resume.experience.forEach((exp) => {
      lines.push(
        `  - ${exp.position} at ${exp.company} (${exp.start_date} – ${
          exp.is_current ? "Present" : exp.end_date
        })`
      );
      if (exp.description) lines.push(`    ${exp.description}`);
    });
  }

  if (resume.education?.length) {
    lines.push("\nEducation:");
    resume.education.forEach((edu) => {
      lines.push(
        `  - ${edu.degree} in ${edu.field} from ${edu.institution} (${edu.graduation_date})`
      );
    });
  }

  if (resume.project?.length) {
    lines.push("\nProjects:");
    resume.project.forEach((proj) => {
      lines.push(`  - ${proj.name} (${proj.type}): ${proj.description}`);
    });
  }

  return lines.join("\n");
};

// POST /api/analyzer/analyze
export const analyzeResumeMatch = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;
    const userId = req.userId;

    if (!resumeId || !jobDescription?.trim()) {
      return res.status(400).json({ message: "resumeId and jobDescription are required." });
    }

    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found or access denied." });
    }

    const resumeText = serializeResumeToText(resume);

    const systemPrompt = `You are a senior technical recruiter and ATS expert with 15 years of experience.
Analyze a candidate's resume against a provided job description and return a structured, objective assessment.
Always respond with valid JSON only — no markdown, no prose outside the JSON.`;

    const userPrompt = `Analyze the following resume against the job description below.

--- RESUME ---
${resumeText}

--- JOB DESCRIPTION ---
${jobDescription}

Return a JSON object with exactly this structure:
{
  "jobTitle": "inferred job title from the JD",
  "matchScore": <integer 0-100>,
  "matchedKeywords": ["keywords from JD found in resume"],
  "missingKeywords": ["important keywords from JD missing from resume"],
  "suggestions": [
    {
      "category": "one of: Skills, Experience, Summary, Education, Projects, Formatting",
      "priority": "one of: high, medium, low",
      "suggestion": "specific actionable recommendation in 1-2 sentences"
    }
  ],
  "analysisSummary": "2-3 sentence executive summary of the match quality and key gaps"
}

Scoring guide: 80-100 strong match, 60-79 good foundation, 40-59 moderate match, 0-39 weak match.`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    let parsed;
    try {
      parsed = JSON.parse(response.choices[0].message.content);
    } catch {
      return res.status(500).json({ message: "AI returned an unexpected format. Please try again." });
    }

    const { jobTitle, matchScore, matchedKeywords, missingKeywords, suggestions, analysisSummary } = parsed;

    if (typeof matchScore !== "number") {
      return res.status(500).json({ message: "Invalid analysis data received from AI." });
    }

    const analysisRecord = await JobAnalysis.create({
      userId,
      resumeId,
      jobDescription,
      jobTitle: jobTitle || "",
      matchScore: Math.min(100, Math.max(0, Math.round(matchScore))),
      matchedKeywords: matchedKeywords || [],
      missingKeywords: missingKeywords || [],
      suggestions: suggestions || [],
      analysisSummary: analysisSummary || "",
    });

    return res.status(201).json({
      analysisId: analysisRecord._id,
      jobTitle: analysisRecord.jobTitle,
      matchScore: analysisRecord.matchScore,
      matchedKeywords: analysisRecord.matchedKeywords,
      missingKeywords: analysisRecord.missingKeywords,
      suggestions: analysisRecord.suggestions,
      analysisSummary: analysisRecord.analysisSummary,
      createdAt: analysisRecord.createdAt,
    });
  } catch (error) {
    console.error("[analyzeResumeMatch]", error);
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/analyzer/history/:resumeId
export const getAnalysisHistory = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.userId;

    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found or access denied." });
    }

    const history = await JobAnalysis.find({ resumeId, userId })
      .sort({ createdAt: -1 })
      .select("jobTitle matchScore analysisSummary createdAt _id")
      .lean();

    return res.status(200).json({ history });
  } catch (error) {
    console.error("[getAnalysisHistory]", error);
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/analyzer/result/:analysisId
export const getAnalysisById = async (req, res) => {
  try {
    const { analysisId } = req.params;
    const userId = req.userId;

    const analysis = await JobAnalysis.findOne({ _id: analysisId, userId }).lean();
    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found or access denied." });
    }

    return res.status(200).json({ analysis });
  } catch (error) {
    console.error("[getAnalysisById]", error);
    return res.status(500).json({ message: error.message });
  }
};
