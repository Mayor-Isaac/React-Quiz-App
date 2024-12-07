export default function FinishedScreen({ points, maxPossiblePoint }) {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "";
  return (
    <p className="result">
      You scored <strong>{points}</strong> out of {maxPossiblePoint}{" "}
      {Math.cell(percentage)}
    </p>
  );
}
