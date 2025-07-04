import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import "./Calculator.css";

function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const scientificButtons = [
    "sin(", "cos(", "tan(", "log(", "ln(", "sqrt(", "^", "(", ")", "pi", "e"
  ];

  const basicButtons = [
    "7", "8", "9", "/", 
    "4", "5", "6", "*", 
    "1", "2", "3", "-", 
    "0", ".", "=", "+"
  ];

  const handleClick = (value) => {
    if (value === "=") {
      calculate();
    } else if (value === "C") {
      clearAll();
    } else if (value === "⌫") {
      backspace();
    } else {
      setExpression(expression + value);
    }
  };

  const calculate = () => {
    try {
      const evalResult = evaluate(expression);
      setResult(evalResult.toString());
    } catch {
      setResult("Error");
    }
  };

  const clearAll = () => {
    setExpression("");
    setResult("");
  };

  const backspace = () => {
    setExpression(expression.slice(0, -1));
    setResult("");
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") calculate();
      else if (e.key === "Backspace") backspace();
      else if (e.key === "Escape") clearAll();
      else if ("0123456789+-*/().^".includes(e.key)) handleClick(e.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expression]);

  return (
    <div className={`calculator-container ${darkMode ? "dark" : ""}`}>
      <header className="calculator-header">
        <h1>🧮 SciCalc</h1>
       <button
  className="mode-toggle"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "🌞" : "🌙"}
</button>

      </header>

      <div className="calculator-display glass">
        <div className="expression">{expression || "0"}</div>
        <div className="result">{result ? "= " + result : ""}</div>
      </div>

      <div className="button-section scientific glass">
        {scientificButtons.map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
      </div>

      <div className="button-section basic glass">
        {basicButtons.map((btn) => (
          <button
            key={btn}
            className={btn === "=" ? "equals" : ""}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>

      <div className="button-section utility glass">
        <button className="clear" onClick={clearAll}>C</button>
        <button className="backspace" onClick={backspace}>⌫</button>
      </div>
    </div>
  );
}

export default Calculator;
