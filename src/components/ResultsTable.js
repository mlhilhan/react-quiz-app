import React from "react";
import "../styles/ResultsTableStyles.css";

const ResultsTable = ({ answers, questions, onClose }) => {
  return (
    <div className="results-table">
      <table>
        <thead>
          <tr>
            <th>Soru</th>
            <th>Verilen Cevap</th>
            <th>Doğru Cevap</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer, index) => (
            <tr key={index}>
              <td>
                {questions.find((q) => q.id === answer.questionId)?.question ||
                  "Soru Bulunamadı"}
              </td>
              <td>{answer.answer}</td>
              <td>
                {questions.find((q) => q.id === answer.questionId)?.answer ||
                  "Doğru Cevap Bulunamadı"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onClose} className="exit-button">
        Çıkış Yap
      </button>
    </div>
  );
};

export default ResultsTable;
