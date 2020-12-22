import React, { useState } from "react";
import "./styles.css";
import Modal from "./Modal";

export default function App() {
  const initialChoices = [1, 2, 3, 4];
  const [choices, setChoices] = useState(initialChoices);
  const [chosen, setChosen] = useState([]);
  const [result, setResult] = useState();

  const answer = 3;

  function choose(number) {
    setChoices(choices.filter((c) => c !== number));
    setChosen([...chosen, number]);
  }

  function unchoose(number) {
    setChoices([...choices, number]);
    setChosen(chosen.filter((c) => c !== number));
  }

  function done() {
    const chosenTotal = chosen.reduce((a, b) => a + b, 0);
    chosenTotal === answer ? setResult("correct") : setResult("incorrect");
  }

  function reset() {
    setChoices(initialChoices);
    setChosen([]);
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
        Choose numbers that add up to:
        <br />
        <span className="answer">{answer}</span>
      </div>

      <div className="side-by-side">
        <div className="numbers">
          {choices.map((number) => (
            <button
              key={number}
              className="number"
              onClick={() => choose(number)}
            >
              {number}
            </button>
          ))}
        </div>

        <div className="numbers">
          {chosen.map((number) => (
            <button
              key={number}
              className="number"
              onClick={() => unchoose(number)}
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
