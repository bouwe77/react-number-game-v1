import React, { useState } from "react";
import styles from "../App.module.css";
import Modal from "./Modal";

export default function App() {
  const answer = 3;
  const choices = [1, 2, 3, 4];

  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState();

  function select(number) {
    setSelected([...selected, number]);
  }

  function deselect(number) {
    const index = selected.indexOf(number);
    if (index === -1) return;
    const newSelected = [...selected];
    newSelected.splice(index, 1);
    setSelected(newSelected);
  }

  function done() {
    const selectedTotal = selected.reduce((a, b) => a + b, 0);
    selectedTotal === answer
      ? setResult("correct!")
      : setResult("incorrect...");
  }

  function reset() {
    setSelected([]);
    setResult();
  }

  return (
    <div className={styles.container}>
      {result && (
        <Modal>
          <div style={{ textAlign: "center" }}>
            <h1>{result}</h1>
            <button className={styles.action} onClick={reset}>
              Try again
            </button>
          </div>
        </Modal>
      )}

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
              onClick={() => select(number)}
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
              onClick={() => deselect(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      <div className={styles["full-width"]}>
        <button className={styles.action} onClick={reset}>
          Reset
        </button>
        <button className={styles.action} onClick={done}>
          Done
        </button>
      </div>

      <div className={`${styles["full-width"]} ${styles.footer}`}>
        <b>react-number-game-v1</b>
        <br />
        read{" "}
        <a href="https://bouwe.io/learn-react-basics-by-creating-a-number-game">
          this blog post
        </a>{" "}
        on how to build this
      </div>
    </div>
  );
}
