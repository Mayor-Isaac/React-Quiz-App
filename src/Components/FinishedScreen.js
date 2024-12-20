import { useQuiz } from "../Context/QuizContext";

export default function FinishedScreen() {
  const { points, maxPossiblePoint, highScore, dispatch } = useQuiz();
  const percentage = (points / maxPossiblePoint) * 100;
  let emoji;
  if (percentage === 100) emoji = "🏆";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "💪";
  if (percentage > 0 && percentage < 50) emoji = "😑";
  if (percentage === 0) emoji = "🤦🏽‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji} </span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoint} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore"> Highscore : {highScore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Reset Quiz
      </button>
    </>
  );
}
