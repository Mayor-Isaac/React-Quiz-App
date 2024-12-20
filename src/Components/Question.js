import React from "react";
import Options from "./Options";
import { useQuiz } from "../Context/QuizContext";
export default function Question() {
  const { dispatch, questions, index, answer } = useQuiz();

  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  );
}
