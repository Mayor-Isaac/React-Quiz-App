import React from "react";
import { useEffect } from "react";

export default function Timer() {
  useEffect(() => {
    setInterval(() => {
      return () => {};
    }, 1000);
  }, []);

  return <div className="timer">05.00</div>;
}
