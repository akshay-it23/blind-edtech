// ===============================
// 🔥 IMPORTS & SETUP
// ===============================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// ===============================
// 🗄️ DB CONNECTION (OPTIONAL)
// ===============================
let dbConnected = false;

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      dbConnected = true;
      console.log("✅ MongoDB Connected");
    })
    .catch(() => {
      console.log("⚠️ MongoDB failed → using in-memory DB");
    });
} else {
  console.log("⚠️ No DB → using in-memory DB");
}

// ===============================
// 🧠 IN-MEMORY DATABASE
// ===============================
const db = {};

// USERS
db.users = [
  { id: "u1", name: "Aditya", email: "aditya@mail.com", role: "deaf", points: 3845, level: 7, streak: 32 },
  { id: "u2", name: "Priya", email: "priya@mail.com", role: "blind", points: 4210, level: 8, streak: 45 },
  { id: "u3", name: "Rahul", email: "rahul@mail.com", role: "deaf", points: 2950, level: 6, streak: 18 }
];

// LESSONS
db.lessons = [
  { id: "l1", title: "Sign Language Basics", level: "beginner", duration: 15, points: 50 },
  { id: "l2", title: "Advanced Signing Practice", level: "advanced", duration: 45, points: 120 },
  { id: "l3", title: "Audio Storytelling 101", level: "beginner", duration: 20, points: 60 },
  { id: "l4", title: "STEM Vocabulary in Sign Language", level: "intermediate", duration: 60, points: 150 },
  { id: "l5", title: "Braille Reading Fundamentals", level: "beginner", duration: 25, points: 80 }
];

// PROGRESS
db.progress = {
  u1: { completedLessons: ["l1"], currentLesson: "l2", weeklyMinutes: 275 },
  u2: { completedLessons: ["l3", "l5"], currentLesson: "l4", weeklyMinutes: 310 },
  u3: { completedLessons: ["l1"], currentLesson: "l2", weeklyMinutes: 120 }
};

// POSTS
db.posts = [
  { id: 1, userId: "u1", title: "Tips for practicing signing daily", body: "", createdAt: new Date() },
  { id: 2, userId: "u2", title: "Best audio textbooks for physics?", body: "", createdAt: new Date() },
  { id: 3, userId: "u3", title: "Weekly signing meetup?", body: "", createdAt: new Date() }
];

// BADGES
db.badges = [
  { id: 1, name: "Signing Scholar", icon: "award" },
  { id: 2, name: "Perfect Streak", icon: "star" },
  { id: 3, name: "Community Guide", icon: "users" }
];

// COUNTERS
let nextPostId = db.posts.length + 1;
let nextUserId = db.users.length + 1;

// ===============================
// 🌍 ROOT + API INDEX
// ===============================
app.get("/", (req, res) => {
  res.json({
    name: "LocalHive API",
    version: "1.0",
    docs: "/api",
    database: dbConnected ? "mongo" : "memory"
  });
});


app.get("/api", (req, res) => {
  res.json({
    endpoints: [
      "/api/health",
      "/api/users",
      "/api/lessons",
      "/api/progress/:userId",
      "/api/community/posts",
      "/api/leaderboard"
    ]
  });
});


// ===============================
// ❤️ HEALTH
// ===============================
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    database: dbConnected ? "mongo" : "memory"
  });
});

// ===============================
// 🔐 AUTH
// ===============================
app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;

  let user = db.users.find(u => u.email === email);
  if (!user) user = db.users[0];

  res.json({ token: "mock-token", user });
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role)
    return res.status(400).json({ error: "Missing fields" });

  if (db.users.find(u => u.email === email))
    return res.status(400).json({ error: "Email exists" });

  const newUser = {
    id: "u" + nextUserId++,
    name,
    email,
    role,
    points: 0,
    level: 1,
    streak: 0
  };

  db.users.push(newUser);
  db.progress[newUser.id] = { completedLessons: [], currentLesson: null, weeklyMinutes: 0 };

  res.json({ token: "mock-token", user: newUser });
});

// ===============================
// 👤 USERS
// ===============================
app.get("/api/users", (req, res) => {
  res.json(db.users);
});

app.get("/api/users/:id", (req, res) => {
  const user = db.users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// ===============================
// 📚 LESSONS
// ===============================
app.get("/api/lessons", (req, res) => {
  let lessons = db.lessons;

  if (req.query.level)
    lessons = lessons.filter(l => l.level === req.query.level);

  res.json(lessons);
});

app.get("/api/lessons/:id", (req, res) => {
  const lesson = db.lessons.find(l => l.id === req.params.id);
  if (!lesson) return res.status(404).json({ error: "Lesson not found" });
  res.json(lesson);
});

// ===============================
// 📈 PROGRESS
// ===============================
app.get("/api/progress/:userId", (req, res) => {
  const progress = db.progress[req.params.userId];
  if (!progress) return res.status(404).json({ error: "Not found" });
  res.json(progress);
});

app.post("/api/progress/:userId/complete", (req, res) => {
  const { lessonId } = req.body;

  const user = db.users.find(u => u.id === req.params.userId);
  const lesson = db.lessons.find(l => l.id === lessonId);

  if (!user || !lesson)
    return res.status(400).json({ error: "Invalid user/lesson" });

  const progress = db.progress[user.id];

  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    user.points += lesson.points;
    progress.weeklyMinutes += lesson.duration;
  }

  res.json({ user, progress });
});

// ===============================
// 🌐 COMMUNITY
// ===============================
app.get("/api/community/posts", (req, res) => {
  const posts = db.posts.sort((a, b) => b.createdAt - a.createdAt);
  res.json(posts);
});

 
app.post("/api/community/posts", (req, res) => {
  const { userId, title, body } = req.body;

  if (!userId || !title || !body)
    return res.status(400).json({ error: "Missing fields" });

  const post = {
    id: nextPostId++,
    userId,
    title,
    body,
    createdAt: new Date()
  };

  db.posts.push(post);
  res.status(201).json(post);
});

// ===============================
// 🏆 LEADERBOARD + BADGES
// ===============================
app.get("/api/leaderboard", (req, res) => {
  const top = [...db.users].sort((a, b) => b.points - a.points).slice(0, 10);
  res.json(top);
});

app.get("/api/badges", (req, res) => {
  res.json(db.badges);
});

 
// ===============================
// ❌ 404 HANDLER
// ===============================
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    method: req.method,
    path: req.originalUrl
  });
});

// ===============================
// 🚀 START SERVER
// ===============================
app.listen(PORT, () => {
  console.log(`🔥 Server running on ${PORT}`);
});