import React, { useEffect, useState, useRef } from "react";

function Timer({
  currentQuestionIndex,
  totalQuestions,
  onTimesUp,
  onAllowClick,
}) {
  const duration = 30;
  const [timeLeft, setTimeLeft] = useState(duration);
  const prevQuestionIndex = useRef(currentQuestionIndex);

  useEffect(() => {
    if (prevQuestionIndex.current !== currentQuestionIndex) {
      setTimeLeft(duration);
      prevQuestionIndex.current = currentQuestionIndex;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timerId);
          onTimesUp(currentQuestionIndex === totalQuestions - 1);
          return duration;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [currentQuestionIndex, onTimesUp, totalQuestions, duration]);

  useEffect(() => {
    if (timeLeft === duration - 10) {
      onAllowClick();
    }
  }, [timeLeft, onAllowClick, duration]);

  return <div>Kalan Süre: {timeLeft} saniye</div>;
}

export default Timer;
