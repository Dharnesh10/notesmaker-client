import React, { useState } from 'react';
import '../styles/UnitConverter.css';

const units = {
  length: [
    { name: 'Meter', value: 'm' },
    { name: 'Kilometer', value: 'km' },
    { name: 'Mile', value: 'mi' },
    { name: 'Foot', value: 'ft' },
    { name: 'Inch', value: 'in' }
  ],
  weight: [
    { name: 'Kilogram', value: 'kg' },
    { name: 'Gram', value: 'g' },
    { name: 'Pound', value: 'lb' },
    { name: 'Ounce', value: 'oz' }
  ],
  temperature: [
    { name: 'Celsius', value: 'C' },
    { name: 'Fahrenheit', value: 'F' },
    { name: 'Kelvin', value: 'K' }
  ]
};

const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => {
    let result = parseFloat(input);

    if (category === 'length') {
      switch (fromUnit) {
        case 'km': result *= 1000; break;
        case 'mi': result *= 1609.34; break;
        case 'ft': result *= 0.3048; break;
        case 'in': result *= 0.0254; break;
        default: break;
      }
      switch (toUnit) {
        case 'km': result /= 1000; break;
        case 'mi': result /= 1609.34; break;
        case 'ft': result /= 0.3048; break;
        case 'in': result /= 0.0254; break;
        default: break;
      }
    } else if (category === 'weight') {
      switch (fromUnit) {
        case 'g': result /= 1000; break;
        case 'lb': result *= 0.453592; break;
        case 'oz': result *= 0.0283495; break;
        default: break;
      }
      switch (toUnit) {
        case 'g': result *= 1000; break;
        case 'lb': result /= 0.453592; break;
        case 'oz': result /= 0.0283495; break;
        default: break;
      }
    } else if (category === 'temperature') {
      if (fromUnit === 'F') {
        result = (result - 32) * 5/9;
      } else if (fromUnit === 'K') {
        result -= 273.15;
      }

      if (toUnit === 'F') {
        result = (result * 9/5) + 32;
      } else if (toUnit === 'K') {
        result += 273.15;
      }
    }

    setOutput(result.toFixed(4));
  };

  return (
    <div className="unitconverter-container">
      <h2 className="unitconverter-title">Unit Converter</h2>

      <div className="unitconverter-row">
        <label className="unitconverter-label">Category:</label>
        <select
          className="unitconverter-select"
          value={category}
          onChange={(e) => {
            const newCategory = e.target.value;
            setCategory(newCategory);
            setFromUnit(units[newCategory][0].value);
            setToUnit(units[newCategory][1].value);
            setOutput('');
          }}
        >
          {Object.keys(units).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>

      <div className="unitconverter-row">
        <label className="unitconverter-label">From:</label>
        <select
          className="unitconverter-select"
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
        >
          {units[category].map((u) => (
            <option key={u.value} value={u.value}>{u.name}</option>
          ))}
        </select>

        <input
          className="unitconverter-input"
          type="number"
          placeholder="Enter value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="unitconverter-row">
        <label className="unitconverter-label">To:</label>
        <select
          className="unitconverter-select"
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
        >
          {units[category].map((u) => (
            <option key={u.value} value={u.value}>{u.name}</option>
          ))}
        </select>

        <input
          className="unitconverter-input"
          type="text"
          placeholder="Result"
          value={output}
          readOnly
        />
      </div>

      <button
        className="unitconverter-button"
        onClick={convert}
      >
        Convert
      </button>
    </div>
  );
};

export default UnitConverter;
