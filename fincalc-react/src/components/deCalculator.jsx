import { useState } from 'react';
import BackButton from '../components/common/BackButton';
export default function DeCalculator() {
  const [inputs, setInputs] = useState({
    totalLiabilities: '',
    shareholdersEquity: '',
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const calculateDERatio = () => {
    const { totalLiabilities, shareholdersEquity } = Object.fromEntries(
      Object.entries(inputs).map(([k, v]) => [k, parseFloat(v)])
    );

    if (isNaN(totalLiabilities) || isNaN(shareholdersEquity) || shareholdersEquity === 0) {
      setResult('Please fill out all fields with valid numbers (Equity cannot be 0).');
      return;
    }

    const ratio = totalLiabilities / shareholdersEquity;
    setResult(`Debt-to-Equity Ratio: ${ratio.toFixed(2)}`);
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-slate-900 text-white rounded-xl shadow space-y-8">
      <BackButton />
      <h1 className="text-2xl font-bold text-center">💸 Debt-to-Equity Ratio Calculator</h1>

      <div className="space-y-4">
        <Input
          label="Total Liabilities"
          name="totalLiabilities"
          value={inputs.totalLiabilities}
          onChange={handleChange}
        />
        <Input
          label="Shareholders' Equity"
          name="shareholdersEquity"
          value={inputs.shareholdersEquity}
          onChange={handleChange}
        />
      </div>

      <div className="text-center">
        <button
          onClick={calculateDERatio}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded font-semibold"
        >
          Calculate
        </button>
      </div>

      {result && (
        <div className="text-center text-xl font-semibold mt-6 bg-slate-800 p-4 rounded">
          {result}
        </div>
      )}
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-slate-300 mb-1">{label}</label>
      <input
        type="number"
        step="any"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 bg-slate-800 text-white rounded border border-slate-700"
        placeholder="Enter a value"
      />
    </div>
  );
}