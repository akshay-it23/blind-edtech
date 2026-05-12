// Check if browser supports speech recognition
export function isSpeechRecognitionSupported() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  return !!SpeechRecognition;
}

// Check if browser supports speech synthesis
export function isSpeechSynthesisSupported() {
  return !!window.speechSynthesis;
}

// Check if browser supports camera/getUserMedia
export async function isCameraSupported() {
  try {
    const stream = await navigator.mediaDevices.getUserUserMedia({ video: true });
    stream.getTracks().forEach((track) => track.stop());
    return true;
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      console.warn('Camera permission denied');
    }
    return false;
  }
}

// Check if browser supports vibration API
export function isVibrationSupported() {
  return !!navigator.vibrate || !!navigator.webkitVibrate || !!navigator.mozVibrate || !!navigator.msVibrate;
}

// Safe vibration call
export function vibrate(pattern = 100) {
  if (isVibrationSupported()) {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    } else if (navigator.webkitVibrate) {
      navigator.webkitVibrate(pattern);
    } else if (navigator.mozVibrate) {
      navigator.mozVibrate(pattern);
    } else if (navigator.msVibrate) {
      navigator.msVibrate(pattern);
    }
  }
}

// Handle speech recognition not supported
export function handleSpeechRecognitionNotSupported() {
  console.warn(
    'Speech Recognition not supported in this browser. Please use Chrome, Edge, or Safari.'
  );
  // Return text input fallback
  return 'text-input';
}

// Handle camera permission denied
export function handleCameraPermissionDenied() {
  console.warn('Camera permission was denied. Features requiring camera will be unavailable.');
  return false;
}

// Request notification permission
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

// Show notification
export function showNotification(title, options = {}) {
  if (Notification.permission === 'granted') {
    new Notification(title, options);
  }
}
