import React, { useState } from 'react';
import { FaBackspace } from 'react-icons/fa';
import '../styles/Calculator.css';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [angleMode, setAngleMode] = useState('DEG');

  const handleClick = (value) => {
    setExpression(expression + value);
  };

  const handleClear = () => {
    setExpression('');
  };

  const handleBackspace = () => {
    setExpression(expression.slice(0, -1));
  };

  const toggleAngleMode = () => {
    setAngleMode(angleMode === 'DEG' ? 'RAD' : 'DEG');
  };

  const handleCalculate = () => {
    try {
      const safeExpression = expression
        .replace(/sin\(/g, `Math.sin(${angleMode === 'DEG' ? 'Math.PI/180*' : ''}`)
        .replace(/cos\(/g, `Math.cos(${angleMode === 'DEG' ? 'Math.PI/180*' : ''}`)
        .replace(/tan\(/g, `Math.tan(${angleMode === 'DEG' ? 'Math.PI/180*' : ''}`)
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E');

      const result = eval(safeExpression);
      setExpression(result.toString());
    } catch {
      setExpression('Error');
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator-display">{expression || '0'}</div>
      <div className="calculator-buttons">
        <button onClick={handleClear} className="calculator-btn function-btn">C</button>
        <button onClick={handleBackspace} className="calculator-btn function-btn"><FaBackspace /></button>
        <button onClick={() => handleClick('(')} className="calculator-btn">(</button>
        <button onClick={() => handleClick(')')} className="calculator-btn">)</button>

        <button onClick={() => handleClick('7')} className="calculator-btn">7</button>
        <button onClick={() => handleClick('8')} className="calculator-btn">8</button>
        <button onClick={() => handleClick('9')} className="calculator-btn">9</button>
        <button onClick={() => handleClick('/')} className="calculator-btn">/</button>

        <button onClick={() => handleClick('4')} className="calculator-btn">4</button>
        <button onClick={() => handleClick('5')} className="calculator-btn">5</button>
        <button onClick={() => handleClick('6')} className="calculator-btn">6</button>
        <button onClick={() => handleClick('*')} className="calculator-btn">×</button>

        <button onClick={() => handleClick('1')} className="calculator-btn">1</button>
        <button onClick={() => handleClick('2')} className="calculator-btn">2</button>
        <button onClick={() => handleClick('3')} className="calculator-btn">3</button>
        <button onClick={() => handleClick('-')} className="calculator-btn">−</button>

        <button onClick={() => handleClick('0')} className="calculator-btn">0</button>
        <button onClick={() => handleClick('.')} className="calculator-btn">.</button>
        <button onClick={handleCalculate} className="calculator-btn equals-btn">=</button>
        <button onClick={() => handleClick('+')} className="calculator-btn">+</button>

        <button onClick={() => handleClick('sin(')} className="calculator-btn">sin</button>
        <button onClick={() => handleClick('cos(')} className="calculator-btn">cos</button>
        <button onClick={() => handleClick('tan(')} className="calculator-btn">tan</button>
        <button onClick={() => handleClick('Math.sqrt(')} className="calculator-btn">√</button>

        <button onClick={() => handleClick('log(')} className="calculator-btn">log</button>
        <button onClick={() => handleClick('ln(')} className="calculator-btn">ln</button>
        <button onClick={() => handleClick('π')} className="calculator-btn">π</button>
        <button onClick={() => handleClick('e')} className="calculator-btn">e</button>

        <button onClick={toggleAngleMode} className="calculator-btn function-btn">{angleMode}</button>
      </div>
    </div>
  );
};

export default Calculator;
