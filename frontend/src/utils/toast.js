import { toast } from 'react-toastify';

// Success notifications
export const notifySuccess = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};

export const notifyLoginSuccess = () => {
  notifySuccess('Logged in successfully!');
};

export const notifyPostCreated = () => {
  notifySuccess('Post created successfully!');
};

export const notifyLessonCompleted = () => {
  notifySuccess('Lesson completed! 🎉');
};

export const notifyQuizCorrect = () => {
  notifySuccess('Correct! ✓');
};

// Error notifications
export const notifyError = (message = 'Something went wrong') => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};

export const notifyApiError = () => {
  notifyError('Failed to fetch data. Please try again.');
};

// Info notifications
export const notifyInfo = (message) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};

export const notifyGameOver = (score) => {
  notifyInfo(`Game Over! Score: ${score}`);
};

export const notifyCopied = () => {
  notifySuccess('Copied to clipboard!');
};

export const notifyDownloaded = () => {
  notifySuccess('File downloaded!');
};

// Warning notifications
export const notifyWarning = (message) => {
  toast.warning(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};

// Promise-based notifications for async operations
export const notifyPromise = async (promise, messages) => {
  return toast.promise(promise, messages, {
    position: 'top-right',
  });
};
