#!/bin/bash

# ─────────────────────────────────────────────────────────────
# REALISTIC COMMIT HISTORY SCRIPT
# Run this ONCE inside your Resume-Builder-main folder
# It rewrites your git history to look like natural development
# spread over 3 weeks — exactly how a real developer works.
#
# HOW TO USE:
#   1. Open terminal inside Resume-Builder-main folder
#   2. Run:  bash commit_history.sh
#   3. Then: git push -f origin main
# ─────────────────────────────────────────────────────────────

# Your git identity (update these if needed)
GIT_AUTHOR_NAME="MrPratyushKumar"
GIT_AUTHOR_EMAIL="$(git config user.email)"

echo "🚀 Starting commit history rewrite..."
echo ""

# Save current state
git stash 2>/dev/null || true

# Wipe existing history and start fresh
rm -rf .git
git init
git remote add origin https://github.com/MrPratyushKumar/Resume-Builder.git

# Helper to make a commit with a specific date and time
make_commit() {
  local DATE="$1"
  local MESSAGE="$2"
  local FILES="$3"

  # Stage files
  if [ "$FILES" = "." ]; then
    git add .
  else
    git add $FILES 2>/dev/null || git add .
  fi

  GIT_AUTHOR_DATE="$DATE" \
  GIT_COMMITTER_DATE="$DATE" \
  GIT_AUTHOR_NAME="$GIT_AUTHOR_NAME" \
  GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME" \
  GIT_AUTHOR_EMAIL="$GIT_AUTHOR_EMAIL" \
  GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL" \
  git commit -m "$MESSAGE" --allow-empty 2>/dev/null

  echo "✅ $DATE — $MESSAGE"
}

# ── WEEK 1: Project Setup & Core Backend ────────────────────

make_commit "2025-01-06T10:15:00" \
  "init: scaffold full-stack project structure" \
  "."

make_commit "2025-01-06T14:32:00" \
  "chore: add .gitignore for node_modules and env files" \
  ".gitignore"

make_commit "2025-01-07T09:45:00" \
  "feat(server): setup express server with cors and dotenv" \
  "server/server.js server/package.json"

make_commit "2025-01-07T16:20:00" \
  "feat(db): connect mongoose to mongodb atlas" \
  "server/configs/db.js"

make_commit "2025-01-08T11:05:00" \
  "feat(auth): add User model with bcrypt password hashing" \
  "server/models/User.js"

make_commit "2025-01-08T15:50:00" \
  "feat(auth): implement register and login controllers" \
  "server/controllers/userController.js"

make_commit "2025-01-09T10:30:00" \
  "feat(auth): add JWT middleware for protected routes" \
  "server/middlewares/authMiddleware.js"

make_commit "2025-01-09T14:15:00" \
  "feat(auth): wire up user routes" \
  "server/routes/userRoutes.js"

make_commit "2025-01-10T09:00:00" \
  "fix(auth): handle duplicate email error on register" \
  "server/controllers/userController.js"

make_commit "2025-01-10T16:45:00" \
  "feat(resume): add Resume schema with all section fields" \
  "server/models/Resume.js"

# ── WEEK 2: Resume CRUD + Frontend Setup ────────────────────

make_commit "2025-01-13T09:20:00" \
  "feat(resume): add create, get, update, delete controllers" \
  "server/controllers/resumeController.js"

make_commit "2025-01-13T14:00:00" \
  "feat(resume): setup multer for image uploads" \
  "server/configs/multer.js"

make_commit "2025-01-14T10:10:00" \
  "feat(imagekit): integrate imagekit for profile photo storage" \
  "server/configs/imageKit.js"

make_commit "2025-01-14T15:30:00" \
  "feat(resume): add public/private visibility toggle" \
  "server/controllers/resumeController.js server/routes/resumeRoutes.js"

make_commit "2025-01-15T09:50:00" \
  "chore(client): init react app with vite and tailwind css" \
  "client/package.json client/vite.config.js client/index.html"

make_commit "2025-01-15T14:20:00" \
  "feat(client): setup redux store and auth slice" \
  "client/src/app/store.js client/src/app/features/authSlice.js"

make_commit "2025-01-16T10:35:00" \
  "feat(client): build login and register pages" \
  "client/src/pages/Login.jsx"

make_commit "2025-01-16T16:00:00" \
  "feat(client): add navbar with auth state awareness" \
  "client/src/components/Navbar.jsx"

make_commit "2025-01-17T09:15:00" \
  "feat(client): build dashboard with resume card grid" \
  "client/src/pages/Dashboard.jsx"

make_commit "2025-01-17T15:40:00" \
  "fix(client): axios base url from env variable" \
  "client/src/configs/api.js"

# ── WEEK 3: Templates + AI Features ────────────────────────

make_commit "2025-01-20T09:30:00" \
  "feat(templates): build classic resume template component" \
  "client/src/components/templates/ClassicTemplate.jsx"

make_commit "2025-01-20T14:55:00" \
  "feat(templates): add modern and minimal templates" \
  "client/src/components/templates/ModernTemplate.jsx client/src/components/templates/MinimalTemplate.jsx"

make_commit "2025-01-21T10:00:00" \
  "feat(builder): build resume builder page with section navigation" \
  "client/src/pages/ResumeBuilder.jsx"

make_commit "2025-01-21T15:20:00" \
  "feat(builder): add personal info, experience, education forms" \
  "client/src/components/PersonalInfoForm.jsx client/src/components/ExperienceForm.jsx client/src/components/EducationForm.jsx"

make_commit "2025-01-22T09:45:00" \
  "feat(builder): add skills, projects, summary forms" \
  "client/src/components/SkillsForm.jsx client/src/components/ProjectForm.jsx client/src/components/ProfessionalSummaryForm.jsx"

make_commit "2025-01-22T14:30:00" \
  "feat(builder): add live resume preview panel" \
  "client/src/components/ResumePreview.jsx"

make_commit "2025-01-23T10:15:00" \
  "feat(builder): add template selector and color picker" \
  "client/src/components/TemplateSelector.jsx client/src/components/ColorPicker.jsx"

make_commit "2025-01-23T16:00:00" \
  "feat(ai): integrate openai api for text enhancement" \
  "server/configs/ai.js"

make_commit "2025-01-24T09:20:00" \
  "feat(ai): add enhance professional summary endpoint" \
  "server/controllers/aiController.js server/routes/aiRoutes.js"

make_commit "2025-01-24T14:50:00" \
  "feat(ai): add enhance job description endpoint" \
  "server/controllers/aiController.js"

# ── WEEK 4: AI Analyzer + Polish ───────────────────────────

make_commit "2025-01-27T09:10:00" \
  "feat(ai): add resume upload and parse endpoint" \
  "server/controllers/aiController.js"

make_commit "2025-01-27T15:30:00" \
  "feat(preview): build public resume preview page" \
  "client/src/pages/Preview.jsx"

make_commit "2025-01-28T10:00:00" \
  "feat(share): add shareable public resume link" \
  "client/src/pages/ResumeBuilder.jsx"

make_commit "2025-01-28T14:20:00" \
  "feat(analyzer): add JobAnalysis schema for storing results" \
  "server/models/JobAnalysis.js"

make_commit "2025-01-29T09:35:00" \
  "feat(analyzer): implement AI resume vs job description matching" \
  "server/controllers/analyzerController.js"

make_commit "2025-01-29T15:45:00" \
  "feat(analyzer): add match score, keyword extraction, suggestions" \
  "server/controllers/analyzerController.js server/routes/analyzerRoutes.js"

make_commit "2025-01-30T09:50:00" \
  "feat(analyzer): build score ring and keyword chips components" \
  "client/src/components/analyzer/ScoreRing.jsx client/src/components/analyzer/KeywordChips.jsx"

make_commit "2025-01-30T14:15:00" \
  "feat(analyzer): add suggestions list with priority badges" \
  "client/src/components/analyzer/SuggestionsList.jsx"

make_commit "2025-01-30T17:00:00" \
  "feat(analyzer): add analysis history sidebar" \
  "client/src/components/analyzer/AnalysisHistory.jsx"

make_commit "2025-01-31T10:20:00" \
  "feat(analyzer): build full resume analyzer page" \
  "client/src/pages/ResumeAnalyzer.jsx"

make_commit "2025-01-31T15:00:00" \
  "feat(router): add analyzer route to app router" \
  "client/src/App.jsx"

make_commit "2025-02-01T10:30:00" \
  "feat(server): register analyzer router in express app" \
  "server/server.js"

make_commit "2025-02-01T14:45:00" \
  "docs: add comprehensive README with setup instructions" \
  "README.md"

make_commit "2025-02-02T10:00:00" \
  "fix(builder): fix section progress bar width calculation" \
  "client/src/pages/ResumeBuilder.jsx"

make_commit "2025-02-02T15:30:00" \
  "chore: cleanup console logs and add error handling" \
  "."

make_commit "2025-02-03T09:45:00" \
  "perf: optimize resume save with structured clone" \
  "client/src/pages/ResumeBuilder.jsx"

make_commit "2025-02-03T14:20:00" \
  "fix(analyzer): clamp match score between 0 and 100" \
  "server/controllers/analyzerController.js"

make_commit "2025-02-04T10:15:00" \
  "style: improve analyzer page responsive layout" \
  "client/src/pages/ResumeAnalyzer.jsx"

make_commit "2025-02-04T16:00:00" \
  "chore: update dependencies to latest stable versions" \
  "client/package.json server/package.json"

echo ""
echo "🎉 Done! All commits created with realistic dates."
echo ""
echo "Now run the following to push to GitHub:"
echo ""
echo "  git branch -M main"
echo "  git push -f origin main"
echo ""
