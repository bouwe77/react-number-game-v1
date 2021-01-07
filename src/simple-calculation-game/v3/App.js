import React, { useEffect, useReducer } from "react";
import styles from "../App.module.css";
import Modal from "../Modal";
import { getQuestion } from "./functions";

const initialState = {
  question: { choices: [] },
  selected: [],
  result: null,
  score: 0
};

function appReducer(state, action) {
  switch (action.type) {
    case "RESET":
      return { ...state, selected: [], result: null };
    case "NEW_QUESTION":
      return { ...state, question: action.payload.question };
    case "ANSWER_QUESTION": {
      const selectedTotal = state.selected.reduce((a, b) => a + b, 0);
      if (selectedTotal === state.question.answer) {
        return { ...state, result: "correct!", score: state.score + 1 };
      } else {
        return { ...state, result: "incorrect..." };
      }
    }
    case "SELECT":
      const newSelected = [...state.selected, action.payload.number];
      return { ...state, selected: newSelected };
    case "DESELECT": {
      const index = state.selected.indexOf(action.payload.number);
      if (index === -1) return state;
      const newSelected = [...state.selected];
      newSelected.splice(index, 1);
      return { ...state, selected: newSelected };
    }
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const {
    question: { answer, choices },
    selected,
    result,
    score
  } = state;

  useEffect(() => {
    if (!result) {
      const question = getQuestion();
      dispatch({ type: "NEW_QUESTION", payload: { question } });
    }
  }, [result]);

  return (
    <div className={styles.container}>
      {result && (
        <Modal>
          <div style={{ textAlign: "center" }}>
            <h1>{result}</h1>
            <button
              className={styles.action}
              onClick={() => dispatch({ type: "RESET" })}
            >
              Try again
            </button>
          </div>
        </Modal>
      )}

      <div className={styles["full-width"]}>Score: {score}</div>

      <div className={styles["full-width"]}>
        Select numbers that add up to:
        <br />
        <span className={styles.answer}>{answer}</span>
      </div>

      <div className={styles["side-by-side"]}>
        <div className={styles.numbers}>
          {choices.map((number) => (
            <button
              key={number}
              className={styles.number}
              onClick={() => dispatch({ type: "SELECT", payload: { number } })}
            >
              {number}
            </button>
          ))}
        </div>

        <div className={styles.numbers}>
          {selected.map((number, index) => (
            <button
              key={index}
              className={styles.number}
              onClick={() =>
                dispatch({ type: "DESELECT", payload: { number } })
              }
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      <div className={styles["full-width"]}>
        <button
          className={styles.action}
          onClick={() => dispatch({ type: "RESET" })}
        >
          Reset
        </button>
        <button
          className={styles.action}
          onClick={() => dispatch({ type: "ANSWER_QUESTION" })}
        >
          Done
        </button>
      </div>

      <div className={`${styles["full-width"]} ${styles.footer}`}>
        <b>simple-calculation-game-v3</b>
        <br />
        read{" "}
        <a href="https://bouwe.io/learn-react-basics-by-creating-a-simple-calculation-game-part-3">
          this blog post
        </a>{" "}
        on how to build this
      </div>
    </div>
  );
}
