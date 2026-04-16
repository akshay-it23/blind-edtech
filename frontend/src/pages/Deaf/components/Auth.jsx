import { useRef, useState, useEffect } from "react";
// import * as mpHands from "@mediapipe/hands";
// import { Camera } from "@mediapipe/camera_utils";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Auth() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const lastCaptureRef = useRef({ letter: "", time: 0 });

  const [detectedSequence, setDetectedSequence] = useState([]);
  const [handDetected, setHandDetected] = useState(false);
  const [letterRecognized, setLetterRecognized] = useState("");
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const PASSWORD = "AB";
  const navigate = useNavigate();

  // useEffect(() => {
  //   const hands = new mpHands.Hands({
  //     locateFile: (file) =>
  //       `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
  //   });

  //   hands.setOptions({
  //     maxNumHands: 1,
  //     modelComplexity: 1,
  //     minDetectionConfidence: 0.5,
  //     minTrackingConfidence: 0.5,
  //   });

  //   hands.onResults((results) => {
  //     const canvas = canvasRef.current;
  //     if (!canvas) return;

  //     const ctx = canvas.getContext("2d");
  //     if (!ctx) return;

  //     ctx.clearRect(0, 0, canvas.width, canvas.height);

  //     if (results.multiHandLandmarks?.length > 0) {
  //       setHandDetected(true);

  //       const lm = results.multiHandLandmarks[0];
  //       drawLandmarks(ctx, lm);

  //       const letter = detectSignLanguageLetter(lm);
  //       if (letter) {
  //         setLetterRecognized(letter);

  //         const now = Date.now();
  //         const canCapture =
  //           letter !== lastCaptureRef.current.letter ||
  //           now - lastCaptureRef.current.time > 800;

  //         if (canCapture) {
  //           lastCaptureRef.current = { letter, time: now };

  //           setDetectedSequence((prev) => {
  //             const updated = [...prev, letter].slice(-PASSWORD.length);
  //             setProgressPercentage((updated.length / PASSWORD.length) * 100);
  //             return updated;
  //           });
  //         }
  //       }
  //     } else {
  //       setHandDetected(false);
  //       setLetterRecognized("");
  //     }
  //   });

  //   if (!videoRef.current) return;

  //   const camera = new Camera(videoRef.current, {
  //     onFrame: async () => {
  //       if (videoRef.current) {
  //         await hands.send({ image: videoRef.current });
  //       }
  //     },
  //     width: 640,
  //     height: 480,
  //   });

  //   camera.start();

  //   return () => {
  //     camera.stop();
  //     hands.close();
  //   };
  // }, []);

  useEffect(() => {
    const current = detectedSequence.join("");
    if (current.length !== PASSWORD.length || isAuthenticating) return;

    setIsAuthenticating(true);

    if (current === PASSWORD) {
      toast.success("Authenticated successfully");
      setTimeout(() => navigate("/deaf"), 800);
    } else {
      toast.error("Wrong sign password");
      setDetectedSequence([]);
      setProgressPercentage(0);
      lastCaptureRef.current = { letter: "", time: 0 };
    }

    const timer = setTimeout(() => setIsAuthenticating(false), 800);
    return () => clearTimeout(timer);
  }, [detectedSequence, isAuthenticating, navigate]);

  const drawLandmarks = (ctx, lm) => {
    lm.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x * 640, p.y * 480, 4, 0, 2 * Math.PI);
      ctx.fillStyle = "blue";
      ctx.fill();
    });

    // mpHands.HAND_CONNECTIONS.forEach(([s, e]) => {
    //   const sp = lm[s];
    //   const ep = lm[e];
    //   ctx.beginPath();
    //   ctx.moveTo(sp.x * 640, sp.y * 480);
    //   ctx.lineTo(ep.x * 640, ep.y * 480);
    //   ctx.strokeStyle = "cyan";
    //   ctx.stroke();
    // });
  };

  const detectSignLanguageLetter = (lm) => {
    const thumb = lm[4];
    const index = lm[8];
    const middle = lm[12];

    if (thumb.y < index.y && thumb.y < middle.y) return "A";
    if (thumb.y > index.y && index.y < middle.y) return "B";

    return "";
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Sign Authentication</h2>

      <div style={{ position: "relative", width: 640, height: 480 }}>
        <video
          ref={videoRef}
          style={{ position: "absolute", width: 640, height: 480 }}
          autoPlay
          muted
          playsInline
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          style={{ position: "absolute", width: 640, height: 480 }}
        />
      </div>

      <p>Hand: {handDetected ? "Detected" : "Not detected"}</p>
      <p>Letter: {letterRecognized || "-"}</p>
      <p>Sequence: {detectedSequence.join("") || "-"}</p>
      <p>Progress: {Math.round(progressPercentage)}%</p>

      <ToastContainer />
    </div>
  );
}