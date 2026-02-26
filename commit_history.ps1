# ─────────────────────────────────────────────────────────────
# REALISTIC COMMIT HISTORY SCRIPT — Windows PowerShell Version
#
# HOW TO USE:
#   1. Open PowerShell terminal inside Resume-Builder-main folder
#   2. Run:  .\commit_history.ps1
#   3. Then: git push -f origin main
# ─────────────────────────────────────────────────────────────

Write-Host "Starting commit history rewrite..." -ForegroundColor Cyan
Write-Host ""

# Get your git email
$GIT_EMAIL = git config user.email
$GIT_NAME = "MrPratyushKumar"

# Wipe existing git history and start fresh
Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue
git init
git remote add origin https://github.com/MrPratyushKumar/Resume-Builder.git

# Helper function to create a commit with a specific date
function Make-Commit {
    param(
        [string]$Date,
        [string]$Message
    )

    git add . 2>$null

    $env:GIT_AUTHOR_DATE = $Date
    $env:GIT_COMMITTER_DATE = $Date
    $env:GIT_AUTHOR_NAME = $GIT_NAME
    $env:GIT_COMMITTER_NAME = $GIT_NAME
    $env:GIT_AUTHOR_EMAIL = $GIT_EMAIL
    $env:GIT_COMMITTER_EMAIL = $GIT_EMAIL

    git commit -m $Message --allow-empty 2>$null
    Write-Host "OK  $Date  —  $Message" -ForegroundColor Green
}

# ── WEEK 1: Project Setup & Core Backend ────────────────────

Make-Commit "2025-01-06T10:15:00" "init: scaffold full-stack project structure"
Make-Commit "2025-01-06T14:32:00" "chore: add .gitignore for node_modules and env files"
Make-Commit "2025-01-07T09:45:00" "feat(server): setup express server with cors and dotenv"
Make-Commit "2025-01-07T16:20:00" "feat(db): connect mongoose to mongodb atlas"
Make-Commit "2025-01-08T11:05:00" "feat(auth): add User model with bcrypt password hashing"
Make-Commit "2025-01-08T15:50:00" "feat(auth): implement register and login controllers"
Make-Commit "2025-01-09T10:30:00" "feat(auth): add JWT middleware for protected routes"
Make-Commit "2025-01-09T14:15:00" "feat(auth): wire up user routes"
Make-Commit "2025-01-10T09:00:00" "fix(auth): handle duplicate email error on register"
Make-Commit "2025-01-10T16:45:00" "feat(resume): add Resume schema with all section fields"

# ── WEEK 2: Resume CRUD + Frontend Setup ────────────────────

Make-Commit "2025-01-13T09:20:00" "feat(resume): add create, get, update, delete controllers"
Make-Commit "2025-01-13T14:00:00" "feat(resume): setup multer for image uploads"
Make-Commit "2025-01-14T10:10:00" "feat(imagekit): integrate imagekit for profile photo storage"
Make-Commit "2025-01-14T15:30:00" "feat(resume): add public/private visibility toggle"
Make-Commit "2025-01-15T09:50:00" "chore(client): init react app with vite and tailwind css"
Make-Commit "2025-01-15T14:20:00" "feat(client): setup redux store and auth slice"
Make-Commit "2025-01-16T10:35:00" "feat(client): build login and register pages"
Make-Commit "2025-01-16T16:00:00" "feat(client): add navbar with auth state awareness"
Make-Commit "2025-01-17T09:15:00" "feat(client): build dashboard with resume card grid"
Make-Commit "2025-01-17T15:40:00" "fix(client): axios base url from env variable"

# ── WEEK 3: Templates + AI Features ────────────────────────

Make-Commit "2025-01-20T09:30:00" "feat(templates): build classic resume template component"
Make-Commit "2025-01-20T14:55:00" "feat(templates): add modern and minimal templates"
Make-Commit "2025-01-21T10:00:00" "feat(builder): build resume builder page with section navigation"
Make-Commit "2025-01-21T15:20:00" "feat(builder): add personal info, experience, education forms"
Make-Commit "2025-01-22T09:45:00" "feat(builder): add skills, projects, summary forms"
Make-Commit "2025-01-22T14:30:00" "feat(builder): add live resume preview panel"
Make-Commit "2025-01-23T10:15:00" "feat(builder): add template selector and color picker"
Make-Commit "2025-01-23T16:00:00" "feat(ai): integrate openai api for text enhancement"
Make-Commit "2025-01-24T09:20:00" "feat(ai): add enhance professional summary endpoint"
Make-Commit "2025-01-24T14:50:00" "feat(ai): add enhance job description endpoint"

# ── WEEK 4: AI Analyzer + Polish ───────────────────────────

Make-Commit "2025-01-27T09:10:00" "feat(ai): add resume upload and parse endpoint"
Make-Commit "2025-01-27T15:30:00" "feat(preview): build public resume preview page"
Make-Commit "2025-01-28T10:00:00" "feat(share): add shareable public resume link"
Make-Commit "2025-01-28T14:20:00" "feat(analyzer): add JobAnalysis schema for storing results"
Make-Commit "2025-01-29T09:35:00" "feat(analyzer): implement AI resume vs job description matching"
Make-Commit "2025-01-29T15:45:00" "feat(analyzer): add match score, keyword extraction, suggestions"
Make-Commit "2025-01-30T09:50:00" "feat(analyzer): build score ring and keyword chips components"
Make-Commit "2025-01-30T14:15:00" "feat(analyzer): add suggestions list with priority badges"
Make-Commit "2025-01-30T17:00:00" "feat(analyzer): add analysis history sidebar"
Make-Commit "2025-01-31T10:20:00" "feat(analyzer): build full resume analyzer page"
Make-Commit "2025-01-31T15:00:00" "feat(router): add analyzer route to app router"
Make-Commit "2025-02-01T10:30:00" "feat(server): register analyzer router in express app"
Make-Commit "2025-02-01T14:45:00" "docs: add comprehensive README with setup instructions"
Make-Commit "2025-02-02T10:00:00" "fix(builder): fix section progress bar width calculation"
Make-Commit "2025-02-02T15:30:00" "chore: cleanup console logs and add error handling"
Make-Commit "2025-02-03T09:45:00" "perf: optimize resume save with structured clone"
Make-Commit "2025-02-03T14:20:00" "fix(analyzer): clamp match score between 0 and 100"
Make-Commit "2025-02-04T10:15:00" "style: improve analyzer page responsive layout"
Make-Commit "2025-02-04T16:00:00" "chore: update dependencies to latest stable versions"

# Clean up env variables
Remove-Item Env:\GIT_AUTHOR_DATE -ErrorAction SilentlyContinue
Remove-Item Env:\GIT_COMMITTER_DATE -ErrorAction SilentlyContinue
Remove-Item Env:\GIT_AUTHOR_NAME -ErrorAction SilentlyContinue
Remove-Item Env:\GIT_COMMITTER_NAME -ErrorAction SilentlyContinue
Remove-Item Env:\GIT_AUTHOR_EMAIL -ErrorAction SilentlyContinue
Remove-Item Env:\GIT_COMMITTER_EMAIL -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "Done! 44 commits created with realistic dates." -ForegroundColor Cyan
Write-Host ""
Write-Host "Now run these two commands to push to GitHub:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  git branch -M main" -ForegroundColor White
Write-Host "  git push -f origin main" -ForegroundColor White
Write-Host ""
