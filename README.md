# 🧑‍🎓 My-Ed-Tech — Accessible Education Platform

> A dual-pathway EdTech platform designed for Deaf and Blind learners with AI-powered personalization, speech recognition, gesture detection, and accessibility-first design.

---

## 🌟 Features

### 🔊 **For Deaf Learners**
- **Sign Language Learning** — Video tutorials, dictionary search, and fingerspelling games
- **Real-time Translation** — Hand gesture detection & sign language translator
- **Gamification** — Fingerspell challenges, sentence games, quizzes with leaderboards
- **Kanban Planning** — Drag-and-drop task management for daily planning
- **Community Forum** — Connect with other learners, share progress, earn badges
- **Visual Lessons** — Video-based content with captions and transcripts

### 🧑‍🦯 **For Blind Learners**
- **Voice Control** — Command-based navigation using speech recognition
- **AI Tutor (Esmo)** — Ask questions, get instant AI-powered answers (via Gemini API)
- **PDF Reader** — Upload PDFs, read aloud with adjustable speech speed
- **YouTube Search** — Voice search for educational videos
- **Code Viewer** — Read code aloud with syntax highlighting
- **Subtitle Generator** — Convert text to SRT subtitle files
- **Geography Quiz** — Audio-focused quiz game with TTS feedback

### 🌐 **Universal**
- **Dark Mode** — Eye-friendly interface for all users
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Offline Fallbacks** — Demo content when API keys are unavailable
- **Accessibility** — ARIA labels, keyboard navigation, screen reader support

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + Vite + TailwindCSS |
| **Animations** | Framer Motion |
| **Routing** | React Router v7 |
| **State** | React Context API |
| **Charts** | Recharts + Chart.js |
| **Video** | ReactPlayer |
| **PDF** | pdfjs-dist |
| **Speech** | react-speech-recognition + Web Speech API |
| **Code Highlight** | react-syntax-highlighter |
| **Drag & Drop** | @hello-pangea/dnd |
| **Notifications** | react-toastify |
| **Backend** | Node.js + Express |
| **Database** | MongoDB (optional) |

---

## 📁 Project Structure

```
my-ed-tech/
├── backend/
│   ├── server.js              # Express server entry
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── communityRoutes.js
│   │   └── ...
│   ├── controllers/           # Business logic
│   ├── models/               # MongoDB schemas
│   └── config/               # Database config
│
├── frontend/
│   ├── src/
│   │   ├── pages/            # Full-screen components
│   │   │   ├── Home.jsx
│   │   │   ├── Deaf/
│   │   │   │   ├── Deaf.jsx
│   │   │   │   ├── components/
│   │   │   │   │   ├── Auth.jsx
│   │   │   │   │   ├── Dashboard.jsx
│   │   │   │   │   ├── SignLangDictionary.jsx
│   │   │   │   │   ├── Kanban.jsx
│   │   │   │   │   ├── Community.jsx
│   │   │   │   │   └── ...
│   │   │   │   └── pages/
│   │   │   │
│   │   │   ├── Blind/
│   │   │   │   ├── Blind.jsx
│   │   │   │   ├── components/
│   │   │   │   │   ├── AuthBlind.jsx
│   │   │   │   │   ├── PDFReader.jsx
│   │   │   │   │   ├── Aitutor.jsx
│   │   │   │   │   ├── Videos.jsx
│   │   │   │   │   └── ...
│   │   │   │   └── pages/
│   │   │   │
│   │   │   └── Alluser/
│   │   │       └── Home1.jsx
│   │   │
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── Animations.jsx
│   │   │   ├── AnimatedElements.jsx
│   │   │   ├── EmptyStates.jsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/           # Layout wrappers
│   │   │   ├── MainLayout.jsx
│   │   │   ├── DeafLayout.jsx
│   │   │   └── BlindLayout.jsx
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx  # Route definitions
│   │   │
│   │   ├── context/          # Global state
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── utils/            # Helper functions
│   │   │   ├── api.js
│   │   │   ├── toast.js
│   │   │   ├── browserFeatures.js
│   │   │   └── constants.js
│   │   │
│   │   ├── hooks/            # Custom React hooks
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
│
├── artitechture.md           # System design
├── detailed_task_list.md     # Development roadmap
└── README.md                 # This file
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)
- **Chrome/Chromium** (for speech recognition support)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-ed-tech
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Project

**Terminal 1 — Start Backend**
```bash
cd backend
npm start
```
Server runs on `http://localhost:5050`

**Terminal 2 — Start Frontend**
```bash
cd frontend
npm run dev
```
App runs on `http://localhost:5173`

---

## 📋 Environment Variables

### Frontend (`.env.local`)
```env
VITE_API_URL=http://localhost:5050/api
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Backend (`.env`)
```env
PORT=5050
MONGODB_URI=mongodb://localhost:27017/myedtech
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

### Getting API Keys

1. **YouTube API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a project → Enable YouTube Data API v3
   - Create an API key in Credentials section

2. **Gemini API Key**
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Click "Get API Key" → Create new API key

> **Note:** App works offline with demo data if keys are not provided

---

## 📦 Available Scripts

### Frontend
```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint checks
```

### Backend
```bash
npm start        # Start development server
npm run dev      # Start with auto-reload (if nodemon installed)
```

---

## 🔌 Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/community/posts` | Create forum post |
| GET | `/api/community/posts` | Get all forum posts |
| POST | `/api/community/posts/:id/replies` | Reply to post |
| GET | `/api/leaderboard` | Get top users |
| GET | `/api/leaderboard/:type` | Get leaderboard by type |
| POST | `/api/lessons/complete` | Mark lesson as complete |
| GET | `/api/progress` | Get user progress |
| POST | `/api/games/score` | Save game score |
| GET | `/api/games/scores` | Get all game scores |

---

## 🗺 Routing Map

### Public Routes
- `/` — Landing page
- `/alluser` — Universal access hub

### Deaf Learner Routes
- `/deaf` — Deaf dashboard
- `/deaf/auth` — Hand gesture authentication
- `/deaf/sign-language` — Dictionary & translator
- `/deaf/fingerspell` — Fingerspelling game
- `/deaf/kanban` — Daily planner
- `/deaf/community` — Forum & badges
- `/deaf/visual-learning` — Video lessons
- `/deaf/canvas` — Drawing app
- `/deaf/calendar` — Event calendar
- `/deaf/gamification` — Game hub

### Blind Learner Routes
- `/blind` — Voice-controlled hub
- `/blind/auth` — Voice authentication
- `/blind/pdf-reader` — PDF upload & read-aloud
- `/blind/ai-tutor` — Esmo AI assistant
- `/blind/videos` — YouTube search & play
- `/blind/youtube-summary` — Video info reader
- `/blind/geography-quiz` — Audio quiz game
- `/blind/code-viewer` — Code syntax reader
- `/blind/subtitle-generator` — SRT file generator

---

## 🎮 Demo Walkthrough (10 minutes)

1. **Landing Page** (1 min)
   - See the accessibility mission statement
   - Click "For Deaf Learners" or "For Blind Learners"

2. **Deaf Path** (4 min)
   - **Auth:** Click to start hand gesture demo
   - **Dashboard:** View charts and badges
   - **Sign Dictionary:** Search for signs, see videos
   - **Kanban:** Drag tasks between columns
   - **Community:** Create/view forum posts

3. **Blind Path** (4 min)
   - **Auth:** Click mic icon, say "allow" (or use text fallback)
   - **AI Tutor:** Type or speak a question
   - **PDF Reader:** Upload a sample PDF, click "Read Aloud"
   - **YouTube Search:** Say or type a search term
   - **Quiz:** Answer geography questions

4. **Settings** (1 min)
   - Toggle dark mode
   - Adjust text size
   - View accessibility shortcuts

---

## 🐛 Troubleshooting

### Speech Recognition Not Working
- **Issue:** Voice commands not being recognized
- **Fix:** 
  - Use Chrome, Edge, or Safari (Firefox not supported)
  - Check microphone permissions in browser settings
  - Ensure stable internet connection
  - Fallback: Use text input instead

### PDF Reader Not Loading
- **Issue:** "Failed to load PDF"
- **Fix:**
  - Ensure PDF file is < 50MB
  - Try a different PDF file
  - Clear browser cache

### YouTube Search Returning Nothing
- **Issue:** No video results found
- **Fix:**
  - Check `VITE_YOUTUBE_API_KEY` is set in `.env.local`
  - Verify API key has YouTube Data API v3 enabled
  - Try more specific search terms
  - App uses demo data if key is invalid

### Camera/Hand Detection Not Working
- **Issue:** Hand gesture auth not starting
- **Fix:**
  - Allow camera permissions
  - Ensure adequate lighting
  - Try moving closer to camera
  - Hand should fill ~30% of video frame

### Backend Connection Error
- **Issue:** "Failed to connect to server"
- **Fix:**
  - Ensure backend is running on port 5050
  - Check `VITE_API_URL` points to correct backend
  - Check no firewall is blocking localhost:5050
  - Try restarting both servers

### Animations Not Smooth
- **Issue:** Laggy or janky animations
- **Fix:**
  - Close other browser tabs
  - Disable browser extensions
  - Try in Chrome (better performance)
  - Lower graphics settings on system

---

## 📚 Learning Resources

### React Concepts Used
- [React Hooks](https://react.dev/reference/react)
- [Context API](https://react.dev/reference/react/useContext)
- [useRef](https://react.dev/reference/react/useRef)

### Libraries Documentation
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

### APIs Used
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [Google Generative AI (Gemini)](https://ai.google.dev/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

## 🤝 Contributing

1. Create a new branch: `git checkout -b feature/feature-name`
2. Make changes and commit: `git commit -m "Add feature"`
3. Push to branch: `git push origin feature/feature-name`
4. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License — see the LICENSE file for details.

---

## 🙏 Credits

- **Accessibility First Design:** Inspired by WCAG 2.1 guidelines
- **UI Components:** Built with TailwindCSS
- **Animations:** Powered by Framer Motion
- **Backend:** Express.js + Node.js
- **APIs:** Google YouTube & Generative AI APIs

---

## 📧 Support

For issues, feature requests, or questions:
1. Check [Troubleshooting](#-troubleshooting) section
2. Open an issue on GitHub
3. Contact: support@myedtech.com

---

**Made with ❤️ for accessible education** 🌍

Last Updated: May 2, 2026
