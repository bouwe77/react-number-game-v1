import React, { useState } from "react";
import "./styles.css";
import Modal from "./Modal";

export default function App() {
  const initialChoices = [1, 2, 3, 4];
  const [choices, setChoices] = useState(initialChoices);
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
    setChoices(initialChoices);
    setChosen([]);
    setStatus("playing");
  }

  //TODO class "app" hernoemen naar "container".
  //TODO class "full-width" en "side-by-side" combineren en "row" noemen.

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
        read <a href="https://bouwe.io">this blog post</a> on how to build this
      </div>
    </div>
  );
}
