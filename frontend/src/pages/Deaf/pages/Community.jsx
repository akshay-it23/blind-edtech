import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import communityBg from "../../Alluser/assest/community.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [leaders, setLeaders] = useState([]);
  const [badges, setBadges] = useState([]);
  const [users, setUsers] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState("");

  const formatPostDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Just now";
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const resolveAuthor = (userId) => {
    const author = users.find((user) => user.id === userId);
    return author?.name || "Community Member";
  };

  const normalizePost = (post) => ({
    ...post,
    body: post.body?.trim() ? post.body : "No description provided yet.",
    authorName: post.authorName || resolveAuthor(post.userId),
    dateLabel: formatPostDate(post.createdAt),
    replyCount: Number.isFinite(post.replyCount) ? post.replyCount : 0,
  });

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch(() => setUsers([]));
  }, []);

  useEffect(() => {
    fetch("/api/community/posts")
      .then((res) => res.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]));
  }, []);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setLeaders(Array.isArray(data) ? data : []))
      .catch(() => setLeaders([]));
  }, []);

  useEffect(() => {
    fetch("/api/badges")
      .then((res) => res.json())
      .then((data) => setBadges(Array.isArray(data) ? data : []))
      .catch(() => setBadges([]));
  }, []);

  const handlePost = async () => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle || !trimmedBody || isPosting) return;

    setIsPosting(true);
    setError("");

    try {
      const payload = {
        userId: users[0]?.id || "u1",
        title: trimmedTitle,
        body: trimmedBody,
      };

      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create post");

      setPosts((prevPosts) => [normalizePost(data), ...prevPosts]);
      setTitle("");
      setBody("");
    } catch (postError) {
      setError(postError.message || "Unable to create post right now.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-slate-100"
      style={{
        backgroundImage: `url(${communityBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-white/85" />
      <Sidebar />

      <div className="relative z-10 ml-20 min-h-screen p-4 md:ml-64 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-8 h-44 overflow-hidden rounded-2xl border border-slate-200"
          style={{
            backgroundImage: `url(${communityBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white/75" />
          <div className="relative flex h-full items-center px-6 md:px-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">Community</h1>
              <p className="mt-2 text-sm text-slate-700 md:text-base">
                Share ideas, support each other, and learn together.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mb-10 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">Forum</h2>

          <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="mb-2 w-full rounded-md border border-slate-300 bg-white p-2.5 text-slate-800 outline-none focus:border-blue-400"
            />

            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write something..."
              rows={4}
              className="mb-2 w-full rounded-md border border-slate-300 bg-white p-2.5 text-slate-800 outline-none focus:border-blue-400"
            />

            {error && <p className="mb-2 text-sm text-rose-600">{error}</p>}

            <button
              onClick={handlePost}
              disabled={isPosting || !title.trim() || !body.trim()}
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isPosting ? "Posting..." : "Create Post"}
            </button>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {posts.map((post) => {
              const normalized = normalizePost(post);
              return (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  className="mb-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-slate-900">{normalized.title}</h3>
                  <p className="mt-1 text-slate-700">{normalized.body}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    {normalized.authorName} • {normalized.dateLabel} • {normalized.replyCount} replies
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="mb-4 text-xl font-semibold text-slate-800">Leaderboard</h2>

          {leaders.map((user, index) => {
            let color = "bg-slate-300";
            if (index === 0) color = "bg-yellow-400";
            else if (index === 1) color = "bg-slate-400";
            else if (index === 2) color = "bg-orange-400";

            return (
              <motion.div 
                key={user.id} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="mb-2 flex items-center gap-3 rounded-md bg-slate-50 px-3 py-2"
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${color}`}>
                  {index + 1}
                </div>
                <span className="text-slate-800">{user.name}</span>
                <span className="ml-auto font-medium text-slate-700">{user.points} pts</span>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="mb-4 text-xl font-semibold text-slate-800">Badges</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {badges.map((badge, idx) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center cursor-default"
              >
                <div className="text-2xl text-slate-700">{badge.icon}</div>
                <h3 className="mt-2 font-semibold text-slate-900">{badge.name}</h3>
                <p className="text-sm text-slate-500">
                  {badge.description || "Milestone unlocked in your learning journey."}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Community;

