import React from "react";

function KeywordQuestions({ input }) {
  // Split the input string by "Keyword :" to get an array of keyword-question pairs
  const keywordQuestionPairs = input
    .split("Keyword :")
    .filter((item) => item.trim() !== "");

  return (
    <ol>
      {keywordQuestionPairs.map((pair, index) => {
        // Split each pair into keyword and questions
        const [keyword, ...questions] = pair
          .split("Question")
          .filter((item) => item.trim() !== "");

        return (
          <li key={index}>
            <strong>{keyword.trim()}</strong>
            <ol type="a">
              {questions.map((question, qIndex) => (
                <li key={qIndex}>{question.trim()}</li>
              ))}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}

export default KeywordQuestions;
