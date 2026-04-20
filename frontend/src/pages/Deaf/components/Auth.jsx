import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// We use CDN versions because MediaPipe's NPM packages have severe ESM/Vite compatibility issues
const HANDS_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js";
const CAMERA_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js";

const drawLandmarks = (ctx, landmarks, width, height) => {
  ctx.fillStyle = "#FF0000";
  ctx.strokeStyle = "#00FF00";
  ctx.lineWidth = 2;
  
  const connections = [
    [0,1], [1,2], [2,3], [3,4],
    [0,5], [5,6], [6,7], [7,8],
    [5,9], [9,10], [10,11], [11,12],
    [9,13], [13,14], [14,15], [15,16],
    [13,17], [0,17], [17,18], [18,19], [19,20]
  ];
  

  for (const [p1, p2] of connections) {
    const pt1 = landmarks[p1];
    const pt2 = landmarks[p2];
    ctx.beginPath();
    ctx.moveTo(pt1.x * width, pt1.y * height);
    ctx.lineTo(pt2.x * width, pt2.y * height);
    ctx.stroke();
  }

  

  for (const point of landmarks) {
    ctx.beginPath();
    ctx.arc(point.x * width, point.y * height, 4, 0, 2 * Math.PI);
    ctx.fill();
  }
};

const detectSignLanguageLetter = (landmarks) => {
  const isIndexOpen = landmarks[8].y < landmarks[5].y;
  const isMiddleOpen = landmarks[12].y < landmarks[9].y;
  const isRingOpen = landmarks[16].y < landmarks[13].y;
  const isPinkyOpen = landmarks[20].y < landmarks[17].y;
  
  if (isIndexOpen && isMiddleOpen && isRingOpen && isPinkyOpen) return "B";
  if (!isIndexOpen && !isMiddleOpen && !isRingOpen && !isPinkyOpen) return "A";
  
  return "";
};


export default function Auth() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const lastCaptureRef = useRef({ letter: "", time: 0 });
  const isAuthenticatingRef = useRef(false);
  const [libLoaded, setLibLoaded] = useState(false);

  const [handDetected, setHandDetected] = useState(false);
  const [letterRecognized, setLetterRecognized] = useState("");
  const [detectedSequence, setDetectedSequence] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);

  const PASSWORD = "AB";
  const navigate = useNavigate();

  // Dynamically load MediaPipe scripts to bypass Vite import errors
  useEffect(() => {
    const loadScript = (url) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    Promise.all([loadScript(HANDS_URL), loadScript(CAMERA_URL)])
      .then(() => setLibLoaded(true))
      .catch((err) => {
        console.error("Failed to load MediaPipe scripts", err);
        toast.error("Failed to initialize camera modules.");
      });
  }, []);

  useEffect(() => {
    if (!libLoaded) return;

    // Use window.Hands and window.Camera from the CDN scripts
    const Hands = window.Hands;
    const Camera = window.Camera;

    if (!Hands || !Camera) {
      console.error("MediaPipe classes not found on window object");
      return;
    }

    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        setHandDetected(true);
        const lm = results.multiHandLandmarks[0];
        drawLandmarks(ctx, lm, canvas.width, canvas.height);

        const letter = detectSignLanguageLetter(lm);
        setLetterRecognized(letter || "");
        
        if (letter) {
          const now = Date.now();
          if (letter !== lastCaptureRef.current.letter || now - lastCaptureRef.current.time > 1500) {
            lastCaptureRef.current = { letter, time: now };
            setDetectedSequence((prev) => {
              const newSeq = [...prev, letter].slice(-PASSWORD.length);
              setProgressPercentage((newSeq.length / PASSWORD.length) * 100);
              return newSeq;
            });
          }
        }
      } else {
        setHandDetected(false);
        setLetterRecognized("");
      }
      ctx.restore();
    });

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current) {
            await hands.send({ image: videoRef.current });
          }
        },
        width: 640,
        height: 480,
      });

      camera.start();

      return () => {
        camera.stop();
        hands.close();
      };
    }
  }, [libLoaded]);

  useEffect(() => {
    const current = detectedSequence.join("");
    if (current.length === PASSWORD.length && current === PASSWORD && !isAuthenticatingRef.current) {
      isAuthenticatingRef.current = true;
      toast.success("Authenticated successfully!");
      setTimeout(() => navigate("/deaf"), 1500);
    } else if (current.length === PASSWORD.length && current !== PASSWORD) {
        // Clear if wrong sequence entered
        setDetectedSequence([]);
        setProgressPercentage(0);
    }
  }, [detectedSequence, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-indigo-300">Sign Authentication</h2>

      <div className="relative w-full max-w-2xl bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-indigo-500/30 flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
        {!libLoaded ? (
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400">Loading AI Modules...</p>
            </div>
        ) : (
            <>
                <video ref={videoRef} className="hidden" playsInline autoPlay muted />
                <canvas ref={canvasRef} width={640} height={480} className="w-full h-full object-cover" />
                {!handDetected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
                        <div className="text-center">
                            <span className="text-5xl block mb-2">👋</span>
                            <p className="text-white font-medium">Position your hand in view</p>
                        </div>
                    </div>
                )}
            </>
        )}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl text-center border border-gray-700">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Camera</p>
          <p className={`text-sm font-bold ${libLoaded ? 'text-green-400' : 'text-yellow-400'}`}>
            {libLoaded ? "ONLINE" : "OFFLINE"}
          </p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl text-center border border-gray-700">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Gesture</p>
          <p className="text-xl font-bold text-yellow-400">{letterRecognized || "---"}</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl text-center border border-gray-700">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Target</p>
          <p className="text-xl font-bold text-indigo-400">{PASSWORD}</p>
        </div>
      </div>
      
      <div className="mt-8 w-full max-w-md bg-gray-800/30 p-6 rounded-2xl border border-white/5">
        <div className="flex justify-between items-end mb-3">
          <span className="text-sm text-gray-400">Sequence Progress</span>
          <span className="text-lg font-mono text-white tracking-[0.5em]">{detectedSequence.join("") || "___"}</span>
        </div>
        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
           <div 
             className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500 ease-out" 
             style={{ width: `${progressPercentage}%` }}
           ></div>
        </div>
      </div>

      <button 
        onClick={() => navigate("/deaf")}
        className="mt-8 text-sm text-gray-500 hover:text-indigo-400 transition-colors underline"
      >
        Skip to Dashboard
      </button>

      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
}