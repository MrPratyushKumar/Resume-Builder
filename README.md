<div align="center">

# 📄 AI Resume Builder

### Build, customize, and optimize your resume with the power of AI

[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

</div>

---

## ✨ Features

- 🤖 **AI-Powered Resume Enhancement** — Enhance your professional summary and job descriptions using AI with a single click
- 📊 **Job Match Analyzer** — Paste any job description and get an instant match score, missing keywords, and actionable suggestions
- 🎨 **Multiple Templates** — Choose from Classic, Modern, Minimal, and Minimal Image resume templates
- 🎨 **Color Customization** — Pick accent colors to personalize your resume design
- 📤 **Resume Upload & Parse** — Upload an existing PDF resume and let AI extract and populate your data automatically
- 👁️ **Real-time Preview** — See changes reflected live as you type
- 🔗 **Shareable Public Links** — Make your resume public and share it with a single link
- 📥 **One-click Download** — Download your resume as a PDF instantly
- 🔐 **Secure Authentication** — JWT-based auth with bcrypt password hashing
- ☁️ **Image Storage** — Profile photos managed via ImageKit CDN

---

## 🧠 AI Job Match Analyzer

The analyzer compares your resume against any job description and returns:

| Feature | Description |
|---|---|
| **Match Score** | 0–100% score showing how well your resume fits the role |
| **Matched Keywords** | Skills and keywords from the JD already on your resume |
| **Missing Keywords** | Important keywords you should add to beat ATS filters |
| **Suggestions** | Prioritized (High / Medium / Low) actionable improvements |
| **Analysis History** | All past analyses saved and accessible anytime |

---

## 🛠️ Tech Stack

**Frontend**
- React 19 + Vite
- Redux Toolkit (global auth state)
- Tailwind CSS v4
- React Router DOM v7
- Axios
- Lucide React Icons

**Backend**
- Node.js + Express.js v5
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Bcrypt
- Multer (file uploads)
- ImageKit (image CDN)
- OpenAI-compatible API (AI features)

---

## 📁 Project Structure

```
Resume-Builder/
├── client/                     # React frontend
│   └── src/
│       ├── app/                # Redux store & slices
│       ├── assets/             # Static assets & templates
│       ├── components/         # Reusable UI components
│       │   └── analyzer/       # Job match analyzer components
│       ├── configs/            # Axios instance
│       └── pages/              # Route-level pages
│
└── server/                     # Node.js backend
    ├── configs/                # DB, AI, ImageKit, Multer configs
    ├── controllers/            # Route handlers
    ├── middlewares/            # JWT auth middleware
    ├── models/                 # Mongoose schemas
    └── routes/                 # Express routers
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- ImageKit account
- OpenAI-compatible API key

### 1. Clone the repository

```bash
git clone https://github.com/MrPratyushKumar/Resume-Builder.git
cd Resume-Builder
```

### 2. Setup the Server

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

OPENAI_API_KEY=your_api_key
OPENAI_BASE_URL=your_base_url
OPENAI_MODEL=your_model_name

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

```bash
npm run server
```

### 3. Setup the Client

```bash
cd client
npm install
```

Create a `.env` file inside the `client/` folder:

```env
VITE_BASE_URL=http://localhost:3000
```

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login and receive JWT |
| GET | `/api/users/data` | Get authenticated user data |

### Resumes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resumes/create` | Create a new resume |
| GET | `/api/resumes/get/:id` | Get a single resume |
| PUT | `/api/resumes/update` | Update resume data |
| DELETE | `/api/resumes/delete/:id` | Delete a resume |

### AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/enhance-pro-sum` | Enhance professional summary |
| POST | `/api/ai/enhance-job-desc` | Enhance job description |
| POST | `/api/ai/upload-resume` | Parse uploaded resume PDF |

### Job Match Analyzer
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analyzer/analyze` | Run AI job match analysis |
| GET | `/api/analyzer/history/:resumeId` | Get past analyses for a resume |
| GET | `/api/analyzer/result/:analysisId` | Get full analysis details |

---

## 🌐 Deployment

The application is deployed on **Vercel** with CI/CD enabled.

- Frontend auto-deploys on every push to `main`
- Backend deployed as a serverless Node.js app
- MongoDB hosted on **MongoDB Atlas**
- Images served via **ImageKit CDN**

---

## 📸 Screenshots

> Coming soon — UI screenshots and demo GIF

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📜 License

[MIT](https://choosealicense.com/licenses/mit/)

---

<div align="center">
Made with ❤️ by <a href="https://github.com/MrPratyushKumar">Pratyush Kumar</a>
</div>
