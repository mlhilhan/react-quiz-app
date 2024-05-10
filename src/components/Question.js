import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { fetchQuestions } from "../services/api";
import Timer from "./Timer";
import ResultsTable from "./ResultsTable.js";
import "../styles/QuestionStyles.css";
import "../styles/QuestionNavigation.css";
import "../styles/ResultsTableStyles.css";

function Question() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentTimer, setCurrentTimer] = useState(30);
  const [selectedOption, setSelectedOption] = useState("");
  const [isClickable, setIsClickable] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleExitAndReload = () => {
    window.location.reload();
  };

  const handleTimesUp = () => {
    if (currentQuestionIndex === questions.length - 1) {
      console.log("Quiz tamamlandı.");
      setModalIsOpen(true);
    } else {
      console.log("Süre doldu! Sonraki soruya geç.");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = {
      questionId: questions[currentQuestionIndex].id,
      answer: event.target.value,
    };
    setUserAnswers(newAnswers);
  };

  const handleAllowClick = () => {
    setIsClickable(true);
    console.log("Şimdi şıklara tıklayabilirsiniz!");
  };

  const handleSubmitQuiz = () => {
    console.log("Quiz sonuçları gönderildi.");
    setModalIsOpen(true);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetchQuestions().then((data) => {
      const parsedQuestions = data.map((q) => {
        const sentences = q.body
          .split("\n")
          .filter((line) => line.trim() !== "");
        if (sentences.length < 4) {
          while (sentences.length < 4) {
            sentences.push("Lorem ipsum dolor sit amet");
          }
        }
        const options = shuffleArray(sentences).slice(0, 4);
        return {
          id: q.id,
          question: q.title,
          options: options,
          answer: options[0],
        };
      });
      setQuestions(parsedQuestions);
    });
  }, []);

  useEffect(() => {
    setCurrentTimer(30);
    setIsClickable(false);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = {
      questionId: questions[currentQuestionIndex]?.id,
      answer: "",
    };
    setUserAnswers(newAnswers);
  }, [currentQuestionIndex]);

  return (
    <div className="question-container">
      <div className="navigation">
        <button className="nav-button" disabled={true}>
          ❮
        </button>
        <span className="question-progress">
          {currentQuestionIndex + 1}/{questions.length}
        </span>
        <button
          className="nav-button"
          onClick={() => {
            if (currentQuestionIndex < questions.length - 1) {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
          }}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          ❯
        </button>
      </div>

      {questions.length > 0 && currentQuestionIndex < questions.length && (
        <div>
          <h2 className="question-title">
            {questions[currentQuestionIndex].question}
          </h2>
          <form>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <label key={index} className="option-label">
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                  disabled={!isClickable}
                />
                {`${"ABCD"[index]}. ${option}`}
              </label>
            ))}
          </form>
        </div>
      )}

      <button
        className="submit-button"
        onClick={handleSubmitQuiz}
        disabled={currentQuestionIndex !== questions.length - 1}
      >
        Gönder
      </button>

      <Timer
        currentQuestionIndex={currentQuestionIndex}
        onTimesUp={handleTimesUp}
        onAllowClick={handleAllowClick}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
          },
        }}
      >
        <ResultsTable
          answers={userAnswers}
          questions={questions}
          onClose={handleExitAndReload}
        />
      </Modal>
    </div>
  );
}

export default Question;
