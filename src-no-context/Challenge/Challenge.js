import React, { useReducer } from "react";
import "./index.css";

export default function Challenge() {
  const initialState = {
    balance: 0,
    loan: 0,
    disabled: true,
  };

  function reducer(state, action) {
    if (state.disabled && action.type !== "openAcc") return state;
    if (action.type === "deposit")
      return { ...state, balance: state.balance + action.payload };
    if (action.type === "withdraw")
      return { ...state, balance: state.balance - action.payload };
    if (action.type === "loan") {
      if (state.loan > 0) return state;
      else
        return {
          ...state,
          balance: state.balance + action.payload,
          loan: state.loan + action.payload,
        };
    }
    if (action.type === "payLoan")
      return { ...state, balance: state.balance - state.loan, loan: 0 };
    if (action.type === "openAcc")
      return { ...state, disabled: false, balance: 500 };
    if (action.type === "closeAcc") {
      if (state.balance === 0 || state.loan === 0) return { ...initialState };
      else return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const { balance, loan, disabled } = state;
  return (
    <div className="container">
      <h1>useReducer Bank Account</h1>
      <h3>Balance : {balance}</h3>
      <h3>Loan : {loan}</h3>
      <div>
        <button
          disabled={!disabled}
          onClick={() => dispatch({ type: "openAcc" })}
        >
          Open Account
        </button>
      </div>
      <div>
        <button
          disabled={disabled}
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
        >
          Deposit 150
        </button>
      </div>
      <div>
        <button
          disabled={disabled}
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
        >
          Withdraw 50
        </button>
      </div>
      <div>
        <button
          disabled={disabled}
          onClick={() => dispatch({ type: "loan", payload: 5000 })}
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
