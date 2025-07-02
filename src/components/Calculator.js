import React, { useState } from 'react';
import { FaBackspace } from 'react-icons/fa';
import '../styles/Calculator.css';
import { evaluate } from 'mathjs';

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
      // Safe replacements for eval:
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
    <div className="calculator">
      <div className="display">{expression || '0'}</div>
      <div className="buttons">
        <button onClick={handleClear} className="function-btn">C</button>
        <button onClick={handleBackspace} className="function-btn"><FaBackspace /></button>
        <button onClick={() => handleClick('(')}>(</button>
        <button onClick={() => handleClick(')')}>)</button>

        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('/')}>/</button>

        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('*')}>×</button>

        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('-')}>−</button>

        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={handleCalculate} className="equals-btn">=</button>
        <button onClick={() => handleClick('+')}>+</button>

        <button onClick={() => handleClick('sin(')}>sin</button>
        <button onClick={() => handleClick('cos(')}>cos</button>
        <button onClick={() => handleClick('tan(')}>tan</button>
        <button onClick={() => handleClick('Math.sqrt(')}>√</button>

        <button onClick={() => handleClick('log(')}>log</button>
        <button onClick={() => handleClick('ln(')}>ln</button>
        <button onClick={() => handleClick('π')}>π</button>
        <button onClick={() => handleClick('e')}>e</button>

        <button onClick={toggleAngleMode} className="function-btn">{angleMode}</button>
      </div>
    </div>
  );
};

export default Calculator;
