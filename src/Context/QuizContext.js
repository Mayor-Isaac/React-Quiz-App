import { createContext, useContext, useEffect, useReducer } from "react";

const Quiz = createContext();

function QuizContext({ children }) {
  const SEC_PER_QUE = 30;
  const initialState = {
    questions: [],

    // loading, error, ready, active, finished
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: null,
  };
  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataFailed":
        return { ...state, status: "error" };
      case "start":
        return {
          ...state,
          status: "active",
          secondsRemaining: state.questions.length * SEC_PER_QUE,
        };
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
      case "tick":
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "finished" : state.status,
        };
      default:
        throw new Error("Action Unknown");
    }
  }

  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

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
    <Quiz.Provider
      value={{
        numQuestions,
        dispatch,
        index,
        points,
        maxPossiblePoint,
        answer,
        questions,
        secondsRemaining,
        status,
        highScore,
      }}
    >
      {children}
    </Quiz.Provider>
  );
}

function useQuiz() {
  const context = useContext(Quiz);

  if (context === undefined) alert("Context used Outside");
  return context;
}

export { useQuiz, QuizContext };
