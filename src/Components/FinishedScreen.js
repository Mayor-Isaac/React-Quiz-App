export default function FinishedScreen({ points, maxPossiblePoints }) {
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <p>
      You scored <strong>{points}</strong> out of {maxPossiblePoints}
    </p>
  );
}
