// src/utils/progress.js

const STORAGE_KEY = "bbbProgress";

export const initProgress = () => {
  if (!sessionStorage.getItem(STORAGE_KEY)) {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        completed: {
          q1: false,
          q2: false,
          q3: false,
        },
      })
    );
  }
};

export const getProgress = () => {
  const data = sessionStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const completeQuestion = (qNo) => {
  const progress = getProgress();
  if (!progress) return;

  const key = `q${qNo}`;

  // 🔐 prevent re-marking / farming
  if (progress.completed[key]) return;

  progress.completed[key] = true;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const resetProgress = () => {
  sessionStorage.removeItem(STORAGE_KEY);
};
