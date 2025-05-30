import { useState } from 'react';

export default function MacdCalculator() {
  const [symbol, setSymbol] = useState('');
  const [result, setResult] = useState(null);

  const calculateMACD = () => {
    // Placeholder — actual MACD requires time series data + EMA calculation
    setResult("MACD calculation not implemented yet (requires historical price data).");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-800 text-white rounded-lg shadow space-y-4">
      <h1 className="text-xl font-bold">MACD Calculator</h1>
      <input type="text" value={symbol} onChange={e => setSymbol(e.target.value)} className="w-full p-2 bg-slate-700 rounded" placeholder="Stock Symbol" />
      <button onClick={calculateMACD} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Calculate MACD</button>
      {result && <p className="mt-4 text-lg">{result}</p>}
    </div>
  );
}
