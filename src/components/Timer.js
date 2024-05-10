import React, { useEffect, useState } from "react";

function Timer({ currentQuestionIndex, onTimesUp, onAllowClick }) {
  const duration = 30;
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimesUp();
    } else if (timeLeft === duration - 10) {
      onAllowClick();
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, onTimesUp, onAllowClick, duration]);

  return <div>Kalan Süre: {timeLeft} saniye</div>;
}

export default Timer;
