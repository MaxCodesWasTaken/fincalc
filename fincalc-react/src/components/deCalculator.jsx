import { useState } from 'react';

export default function DeCalculator() {
  const [liabilities, setLiabilities] = useState('');
  const [equity, setEquity] = useState('');
  const [result, setResult] = useState(null);

  const calculateDERatio = () => {
    const l = parseFloat(liabilities);
    const e = parseFloat(equity);
    if (isNaN(l) || isNaN(e) || e === 0) {
      setResult("Please fill out all fields with valid numbers.");
      return;
    }
    const ratio = l / e;
    setResult(`Debt-to-Equity Ratio: ${ratio.toFixed(2)}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-800 text-white rounded-lg shadow space-y-4">
      <h1 className="text-xl font-bold">Debt-to-Equity Ratio</h1>
      <input type="number" value={liabilities} onChange={e => setLiabilities(e.target.value)} className="w-full p-2 bg-slate-700 rounded" placeholder="Total Liabilities" />
      <input type="number" value={equity} onChange={e => setEquity(e.target.value)} className="w-full p-2 bg-slate-700 rounded" placeholder="Shareholders' Equity" />
      <button onClick={calculateDERatio} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">Calculate</button>
      {result && <p className="mt-4 text-lg">{result}</p>}
    </div>
  );
}
