import { useState } from "react";
import { evaluate } from "mathjs";

// Styles
import "./App.css";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const operators = ["/", "*", "+", "-", "."];

  const updateCalc = (value) => {
    if (
      (operators.includes(value) && calc === "") ||
      (operators.includes(value) && operators.includes(calc.slice(-1)))
    )
      return;

    setCalc(calc + value);

    if (!operators.includes(value))
      setResult(evaluate(calc + value).toString());
  };

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => updateCalc(`${i}`)}>
          {i}
        </button>
      );
    }

    return digits;
  };

  const calculate = () => setCalc(evaluate(calc).toString());

  const deleteLast = () => {
    if (!calc) return;

    const value = calc.slice(0, -1);
    setCalc(value);

    if (calc.length === 1) setResult("");
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="calculator__display">
          {calc || "0"}
          <div>
            <span>{result ? result : ""}</span>
          </div>
        </div>

        <div className="calculator__operators">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => updateCalc("-")}>-</button>

          <button onClick={deleteLast}>DEL</button>
        </div>

        <div className="calculator__digits">
          {createDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>

          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
