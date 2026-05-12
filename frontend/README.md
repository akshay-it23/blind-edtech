# Frontend — My-Ed-Tech

React + Vite + TailwindCSS frontend for the My-Ed-Tech accessible education platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Dependencies

- **React 19** — UI framework
- **Vite** — Build tool with HMR
- **TailwindCSS** — Styling
- **Framer Motion** — Animations
- **React Router v7** — Client-side routing
- **react-toastify** — Notifications
- **react-speech-recognition** — Voice input
- **react-player** — Video playback
- **pdfjs-dist** — PDF reading
- **recharts** — Data visualization
- **@hello-pangea/dnd** — Drag & drop

## 📂 Project Structure

```
src/
├── pages/          # Full-screen page components
├── components/     # Reusable UI components
├── layout/         # Layout wrappers
├── routes/         # Route definitions
├── context/        # Global state
├── utils/          # Helper functions
├── hooks/          # Custom hooks
├── assets/         # Images, fonts
├── App.jsx         # Root component
└── main.jsx        # Entry point
```

## 🔑 Environment Variables

Create `.env.local`:
```env
VITE_API_URL=http://localhost:5050/api
VITE_YOUTUBE_API_KEY=your_key
VITE_GEMINI_API_KEY=your_key
```

## 🛠 Available Commands

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run lint` — ESLint checks
- `npm run preview` — Preview production build

## 📖 Documentation

See [main README](../README.md) for full project documentation.
