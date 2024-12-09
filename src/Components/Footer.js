import Timer from "./Timer";
import NextButton from "./NextButton";

export default function Footer({
  dispatch,
  answer,
  index,
  numQuestions,
  secondsRemaining,
}) {
  return (
    <>
      <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
      <NextButton
        dispatch={dispatch}
        answer={answer}
        index={index}
        numQuestions={numQuestions}
      />
    </>
  );
}
