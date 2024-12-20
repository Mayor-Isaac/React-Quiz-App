import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Challenge from "./Challenge/Challenge";
import { QuizContext } from "./Context/QuizContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QuizContext>
      <App />
    </QuizContext>
    {/* <Challenge /> */}
  </React.StrictMode>
);
