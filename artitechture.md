my-project/
│
├── 📦 backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── config/
│
├── 🎨 frontend/
│   ├── src/
│   │
│   │   ├── App.jsx          🔥 (Routing Entry)
│   │   ├── main.jsx         (React Root)
│   │
│   │   ├── pages/           📄 (Full Screens)
│   │   │
│   │   │   ├── Home.jsx
│   │   │   ├── Alluser/
│   │   │   │   └── Home1.jsx
│   │   │
│   │   │   ├── Deaf/        🔊 MODULE
│   │   │   │   ├── Deaf.jsx
│   │   │   │
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Dashboard.jsx
│   │   │   │   │   ├── SignLanguage.jsx
│   │   │   │   │   ├── Gamification.jsx
│   │   │   │   │   └── ...
│   │   │   │
│   │   │   │   └── components/
│   │   │   │       ├── Auth.jsx
│   │   │   │       ├── Navbar.jsx
│   │   │   │       ├── Sidebar.jsx
│   │   │   │       ├── Games/
│   │   │   │       ├── Learning/
│   │   │   │       └── UI/
│   │   │
│   │   │   ├── Blind/       🧑‍🦯 MODULE
│   │   │   │   ├── Blind.jsx
│   │   │   │
│   │   │   │   ├── pages/
│   │   │   │   │   ├── VoiceHub.jsx
│   │   │   │   │   ├── SubtitleGenerator.jsx
│   │   │   │   │   └── ...
│   │   │   │
│   │   │   │   └── components/
│   │   │   │       ├── AuthBlind.jsx
│   │   │   │       ├── AITutor.jsx
│   │   │   │       ├── PDFReader.jsx
│   │   │   │       └── Tools/
│   │   │
│   │   ├── components/      🔁 (Global Reusable)
│   │   │   ├── Navbar.jsx
│   │   │   └── UI/
│   │   │
│   │   ├── hooks/           ⚙️ (Custom Hooks)
│   │   │   ├── useVoice.js
│   │   │   ├── useCamera.js
│   │   │
│   │   ├── services/        🌐 (API Calls)
│   │   │   ├── authService.js
│   │   │   ├── aiService.js
│   │   │
│   │   ├── context/         🌍 (Global State)
│   │   │   ├── AuthContext.jsx
│   │   │
│   │   ├── utils/           🛠️ Helpers
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │
│   ├── public/
│   └── index.html
│
└── README.md