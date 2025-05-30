import { useState } from 'react';

export default function CapmCalculator() {
  const [riskFreeRate, setRiskFreeRate] = useState('');
  const [beta, setBeta] = useState('');
  const [marketReturn, setMarketReturn] = useState('');
  const [result, setResult] = useState(null);

  const calculateCAPM = () => {
    const rfr = parseFloat(riskFreeRate) / 100;
    const b = parseFloat(beta);
    const mr = parseFloat(marketReturn) / 100;

    if (isNaN(rfr) || isNaN(b) || isNaN(mr)) {
      setResult('Please fill out all fields with valid numbers.');
      return;
    }

    const expectedReturn = rfr + b * (mr - rfr);
    setResult(`The expected return is approximately: ${(expectedReturn * 100).toFixed(2)}%`);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded space-y-4">
      <h1 className="text-xl font-bold">CAPM Calculator</h1>

      <div className="grid grid-cols-1 gap-4">
        <input type="number" value={riskFreeRate} onChange={e => setRiskFreeRate(e.target.value)}
          className="border p-2 rounded" placeholder="Risk-Free Rate (%)" />
        <input type="number" value={beta} onChange={e => setBeta(e.target.value)}
          className="border p-2 rounded" placeholder="Beta" />
        <input type="number" value={marketReturn} onChange={e => setMarketReturn(e.target.value)}
          className="border p-2 rounded" placeholder="Market Return (%)" />
      </div>

      <button onClick={calculateCAPM} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Calculate
      </button>

      {result && <div className="mt-4 text-lg font-medium text-gray-800">{result}</div>}
    </div>
  );
}
