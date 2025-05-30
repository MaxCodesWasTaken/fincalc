import { useState } from 'react';
import BackButton from '../components/common/BackButton';
export default function CapmCalculator() {
  const [inputs, setInputs] = useState({
    riskFreeRate: '',
    beta: '',
    marketReturn: '',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const calculateCAPM = () => {
    const { riskFreeRate, beta, marketReturn } = Object.fromEntries(
      Object.entries(inputs).map(([k, v]) => [k, parseFloat(v)])
    );

    if ([riskFreeRate, beta, marketReturn].some((v) => isNaN(v))) {
      setResult('Please fill out all fields with valid numbers.');
      return;
    }

    const expectedReturn = riskFreeRate + beta * (marketReturn - riskFreeRate);
    setResult(`Expected Return: ${(expectedReturn * 100).toFixed(2)}%`);
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-slate-900 text-white rounded-xl shadow space-y-8">
      <BackButton />
      <h1 className="text-2xl font-bold text-center">📊 CAPM Calculator</h1>

      <div className="space-y-4">
        <Input label="Risk-Free Rate (%)" name="riskFreeRate" value={inputs.riskFreeRate} onChange={handleChange} />
        <Input label="Beta (β)" name="beta" value={inputs.beta} onChange={handleChange} />
        <Input label="Expected Market Return (%)" name="marketReturn" value={inputs.marketReturn} onChange={handleChange} />
      </div>

      <div className="text-center">
        <button
          onClick={calculateCAPM}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold"
        >
          Calculate Expected Return
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
