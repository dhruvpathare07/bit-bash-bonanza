"use client";
import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle
} from "react";
import "./Timer.css";

const Timer = forwardRef(({ onTimeUp, getTimeLeft }, ref) => {
  const [time, setTime] = useState(600);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);
  const hasFiredRef = useRef(false);

  // 🔥 START TIMER
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // 🔥 WARNING + TIME UP HANDLING (Single Effect Only)
  useEffect(() => {
    if (!timerRef.current) return;

    if (time <= 10 && time > 0) {
      timerRef.current.classList.add("warning");
    } else {
      timerRef.current.classList.remove("warning");
    }

    if (time === 0 && !hasFiredRef.current) {
      hasFiredRef.current = true;
      timerRef.current.classList.add("time-up");
      onTimeUp?.();
    }

    getTimeLeft?.(time);
  }, [time, onTimeUp, getTimeLeft]);

  // 🔥 EXPOSE STOP FUNCTION
  useImperativeHandle(ref, () => ({
    stop: () => {
      clearInterval(intervalRef.current);
    },
    getCurrentTime: () => time
  }));

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="flip-timer" ref={timerRef}>
      <div className="flip-timer-label">TIME LEFT</div>

      <div className="flip-timer-container">
        <div className="time-group">
          <FlipCard digit={Math.floor(minutes / 10)} />
          <FlipCard digit={minutes % 10} />
        </div>

        <div className="colon">:</div>

        <div className="time-group">
          <FlipCard digit={Math.floor(seconds / 10)} />
          <FlipCard digit={seconds % 10} />
        </div>
      </div>
    </div>
  );
});

function FlipCard({ digit }) {
  const displayRef = useRef();
  const overlayRef = useRef();
  const prevDigit = useRef(digit);

  useEffect(() => {
    if (digit === prevDigit.current) return;

    const overlay = overlayRef.current;
    overlay.classList.add("flip");
    overlay.textContent = digit;

    function finishAnimation() {
      overlay.classList.remove("flip");
      displayRef.current.textContent = digit;
      prevDigit.current = digit;
      overlay.removeEventListener("animationend", finishAnimation);
    }

    overlay.addEventListener("animationend", finishAnimation);
  }, [digit]);

  return (
    <div className="time-segment">
      <div className="segment-display" ref={displayRef}>{digit}</div>
      <div className="segment-overlay" ref={overlayRef}>{digit}</div>
    </div>
  );
}

export default Timer;
