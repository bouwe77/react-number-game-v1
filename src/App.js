import React, { useState } from "react";
import "./styles.css";
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
    <div className="container">
      {result && (
        <Modal>
          <div style={{ textAlign: "center" }}>
            <h1>{result}</h1>
            <button className="action" onClick={reset}>
              Try again
            </button>
          </div>
        </Modal>
      )}

      <div className="full-width">
        Select numbers that add up to:
        <br />
        <span className="answer">{answer}</span>
      </div>

      <div className="side-by-side">
        <div className="numbers">
          {choices.map((number) => (
            <button
              key={number}
              className="number"
              onClick={() => select(number)}
            >
              {number}
            </button>
          ))}
        </div>

        <div className="numbers">
          {selected.map((number, index) => (
            <button
              key={index}
              className="number"
              onClick={() => deselect(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      <div className="full-width">
        <button className="action" onClick={reset}>
          Reset
        </button>
        <button className="action" onClick={done}>
          Done
        </button>
      </div>

      <div className="full-width footer">
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
