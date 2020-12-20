import React, { useState } from "react";
import "./styles.css";
import Modal from "./Modal";

function getNumbers() {
  return [1, 2, 3, 4];
}

export default function App() {
  const [choices, setChoices] = useState(getNumbers);
  const [chosen, setChosen] = useState([]);
  const [status, setStatus] = useState("playing");

  const answer = 3;

  function choose(number) {
    setChoices(choices.filter((c) => c !== number));
    setChosen([...chosen, number]);
  }

  function unchoose(number) {
    setChosen(chosen.filter((c) => c !== number));
    setChoices([...choices, number]);
  }

  function done() {
    const result = chosen.reduce((a, b) => a + b, 0);
    result === answer ? setStatus("correct") : setStatus("incorrect");
  }

  function reset() {
    setChoices(getNumbers);
    setChosen([]);
    setStatus("playing");
  }

  return (
    <div className="app">
      {status !== "playing" && (
        <Modal>
          <div style={{ textAlign: "center" }}>
            <h1>{status}</h1>
            <button className="action" onClick={reset}>
              OK
            </button>
          </div>
        </Modal>
      )}

      <div className="full-width">{answer}</div>

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
        read <a href="https://bouwe.io">this blog post</a> on how to build this
      </div>
    </div>
  );
}
