import React,{useEffect,useState} from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe, Book, Ear, Eye, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/main.png";
import back from "../assets/background.png";


export default function Home() {
  const [voiceEnabled] = useState(false);
const navigate = useNavigate();


useEffect(() => {
  if (!voiceEnabled) return;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.log("Not supported");
    return;
  }

  const recognition = new SpeechRecognition();
// webapi speech api name ki ek library in built hote h  jisa ya use kr ta h

  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-US";
// ya auto matic humar esystem k mic on krvade ga

  recognition.start();

  recognition.onresult = (event) => {
    const transcript =
      event.results[event.results.length - 1][0].transcript
        .toLowerCase()
        .trim();

    console.log("Heard:", transcript);

    if (transcript.includes("blind")) {
      navigate("/authblind");
    }

    if (transcript.includes("deaf")) {
      navigate("/authdeaf");
    }
  };

  recognition.onerror = (e) => {
    console.log("Error:", e);
  };

  return () => {
    recognition.stop();
  };
}, [voiceEnabled, navigate]);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${back})` }}
    >
      {/* 🔥 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 🔥 CONTENT */}
      <div className="relative z-10">

        {/* ================= NAVBAR ================= */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 fixed top-0 left-0 w-full z-10 shadow-md"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

            <div className="flex items-center gap-2">
              <img src={logo1} alt="logo" className="w-16 h-11" />
              <h1>
                <span className="text-yellow-400">Nav</span>
                <span className="text-white">Drishti.ai</span>
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-4 text-white">
              <Link to="/" className="flex items-center gap-1">
                <Globe size={18} /> Home
              </Link>
              <Link to="/about" className="flex items-center gap-1">
                <Book size={18} /> About Us
              </Link>
            </div>

            <button className="hidden md:block bg-yellow-400 text-indigo-800 rounded-md px-3 py-1">
              Sign In
            </button>

            <button className="md:hidden text-white text-xl">☰</button>
          </div>
        </motion.nav>

        {/* ================= HERO ================= */}
        <div className="flex pt-28 max-w-7xl mx-auto px-4">

          <div className="w-1/2 pr-8">
       



            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl font-bold text-white drop-shadow-lg mb-6"
            >
              Inclusive Learning for Everyone.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-200 mb-6"
            >
              Empowering blind learners with accessible and inclusive education tools.
            </motion.p>

            <div className="flex gap-4"
             >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-500 text-white px-6 py-2 rounded-full"
              >
                Need Help?
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 text-black px-6 py-2 rounded-full"
              >
                Search
              </motion.button>
            </div>

          </div>

        </div>

        {/* ================= CARDS ================= */}
        <div className="max-w-5xl mx-auto mt-20 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Deaf */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl group">
              <div className="bg-indigo-600 h-2 w-full mb-4"></div>

              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Ear className="text-indigo-600" />
              </div>

              <h2 className="text-indigo-800 font-bold mb-2">
                Deaf Community
              </h2>

              <ul className="mb-4 space-y-2">
                <li>Sign language video lessons</li>
                <li>Interactive signing practice</li>
                <li>Deaf community support</li>
              </ul>

              <Link to="/authdeaf">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                  Explore
                </button>
              </Link>
            </div>

            {/* Blind */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl">
              <div className="bg-purple-600 h-2 w-full mb-4"></div>

              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Eye className="text-purple-600" />
              </div>

              <h2 className="text-purple-800 font-bold mb-2">
                Blind Community
              </h2>

              <ul className="mb-4 space-y-2">
                <li>Audio textbooks</li>
                <li>Screen reader optimized</li>
                <li>Audio assessments</li>
              </ul>

              <Link to="/authblind">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
                  Explore
                </button>
              </Link>
            </div>

            {/* Universal */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl">
              <div className="bg-teal-600 h-2 w-full mb-4"></div>

              <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Users className="text-teal-600" />
              </div>

              <h2 className="text-teal-800 font-bold mb-2">
                Universal Access
              </h2>

              <ul className="mb-4 space-y-2">
                <li>Adaptive learning paths</li>
                <li>Multi-format content</li>
                <li>Collaborative activities</li>
              </ul>

              <Link to="/allusers">
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg">
                  Explore
                </button>
              </Link>
            </div>

          </div>
        </div>

{/* //card khtm */}<motion.div
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 mt-16 max-w-5xl mx-auto"
>

  <h2 className="text-3xl font-bold mb-2 text-white">
    Find Your Right Mentor
  </h2>

  {/* ✅ FIX: subtitle separate */}
  <p className="text-white mb-6">
    Stay connected with a monthly or yearly subscription.
  </p>

  {/* ✅ FIX: ONLY ONE GRID */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* LEFT */}
    <div className="md:col-span-1">
      <div className="bg-white rounded-xl shadow-lg p-4 relative">

        <div className="absolute -top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
          ⚙ Available Solutions
        </div>

        <div className="absolute top-10 left-4 bg-gray-100 px-3 py-1 rounded-full text-sm">
          Easy Methods
        </div>

        <motion.img
          src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800"
          alt="Mentor Student"
          className="w-full h-48 object-cover rounded-lg mt-12"
        />

      </div>
    </div>

    {/* RIGHT */}
  <div className="md:col-span-2 flex flex-col gap-6">

  {/* BOX 1 */}
  <motion.div
    animate={{ x: [0, 5, 0] }}
    transition={{ duration: 6, repeat: Infinity }}
    className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4"
  >
    <div className="bg-yellow-400 p-3 rounded-full">
      📞
    </div>

    <div>
      <h3 className="font-bold text-lg">
        Ring or message your mentor anytime
      </h3>
      <p className="text-gray-600">
        Stay connected and get guidance whenever you need help.
      </p>
    </div>
  </motion.div>

  {/* BOX 2 */}
  <motion.div
    animate={{ x: [0, -5, 0] }}
    transition={{ duration: 5, repeat: Infinity }}
    className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4"
  >
    <div className="bg-yellow-400 p-3 rounded-full">
      👨‍🏫
    </div>

    <div>
      <h3 className="font-bold text-lg">
        Become a mentor and help out people
      </h3>
      <p className="text-gray-600">
        Share your knowledge and guide others in their learning journey.
      </p>
    </div>
  </motion.div>

</div>

  </div>

</motion.div>












      </div>
    </div>
  );
}