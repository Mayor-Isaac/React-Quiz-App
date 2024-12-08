import "./index.css";
// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartScreen from "./Components/StartScreen";
import Question from "./Components/Question";
import Progress from "./Components/Progress";
import FinishedScreen from "./Components/FinishedScreen";
import Footer from "./Components/Footer";

const initialState = {
  questions: [],

  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        question: state.questions,
        status: "ready",
      };
    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer, points, highScore } = state;

  const endPoint = "http://localhost:8000/questions";
  const numQuestions = questions.length;
  const maxPossiblePoint = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  useEffect(() => {
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoint}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer
              dispatch={dispatch}
              index={index}
              numQuestions={numQuestions}
              answer={answer}
            />
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoint={maxPossiblePoint}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
