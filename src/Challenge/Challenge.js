import React, { useReducer } from "react";
import "./index.css";

export default function Challenge() {
  const initialState = {
    balance: 0,
    loan: 0,
    disabled: true,
  };

  function reducer(state, action) {
    if (action.type === "deposit")
      return { ...state, balance: state.balance + 150 };
    if (action.type === "withdraw")
      return { ...state, balance: state.balance - 50 };
    if (action.type === "loan")
      return {
        ...state,
        balance: state.balance + 5000,
        loan: state.loan + 5000,
      };
    if (action.type === "payLoan")
      return { ...state, balance: state.balance - state.loan, loan: 0 };
    if (action.type === "openAcc")
      return { ...state, disabled: false, balance: 500 };
    if (action.type === "closeAcc") return { ...initialState };
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const { balance, loan, disabled } = state;
  return (
    <div className="container">
      <h1>useReducer Bank Account</h1>
      <h3>Balance : {balance}</h3>
      <h3>Loan : {loan}</h3>
      <div>
        <button onClick={() => dispatch({ type: "openAcc" })}>
          Open Account
        </button>
      </div>
      <div>
        <button
          disabled={disabled}
          onClick={() => dispatch({ type: "deposit" })}
        >
          Deposit 150
        </button>
      </div>
      <div>
        <button
          disabled={disabled}
          onClick={() => dispatch({ type: "withdraw" })}
        >
          Withdraw 50
        </button>
      </div>
      <div>
        <button
          disabled={disabled || loan > 0}
          onClick={() => dispatch({ type: "loan" })}
        >
          Request a loan of 5000
        </button>
      </div>
      <div>
        <button
          disabled={disabled}
          onClick={() => dispatch({ type: "payLoan" })}
        >
          Pay loan
        </button>
      </div>
      <div>
        <button
          disabled={disabled}
          onClick={() => dispatch({ type: "closeAcc" })}
        >
          Close account
        </button>
      </div>
    </div>
  );
}
