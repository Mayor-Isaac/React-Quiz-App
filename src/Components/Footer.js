import Timer from "./Timer";
import NextButton from "./NextButton";

export default function Footer({ dispatch, answer, index, numQuestions }) {
  return (
    <>
      <Timer />
      <NextButton
        dispatch={dispatch}
        answer={answer}
        index={index}
        numQuestions={numQuestions}
      />
    </>
  );
}
