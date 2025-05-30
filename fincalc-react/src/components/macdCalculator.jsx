import { useState } from 'react';
import BackButton from '../components/common/BackButton';
export default function MacdCalculator() {
  const [symbol, setSymbol] = useState('');
  const [result, setResult] = useState(null);

  const calculateMACD = () => {
    // For demonstration, this mock uses synthetic price data
    const prices = [150, 152, 149, 151, 153, 154, 156, 158, 160, 162, 161, 159, 158, 157, 156];
    const ema = (period, data) => {
      const k = 2 / (period + 1);
      return data.reduce((acc, val, i) => {
        if (i === 0) acc.push(val);
        else acc.push(val * k + acc[i - 1] * (1 - k));
        return acc;
      }, []);
    };

    const ema12 = ema(12, prices);
    const ema26 = ema(26, prices);
    const macdLine = ema12.map((val, i) => val - (ema26[i] || val));
    const signalLine = ema(9, macdLine);
    const histogram = macdLine.map((val, i) => val - (signalLine[i] || 0));

    setResult(`Latest MACD: ${macdLine.at(-1).toFixed(2)}, Signal: ${signalLine.at(-1).toFixed(2)}, Histogram: ${histogram.at(-1).toFixed(2)}`);
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-slate-900 text-white rounded-xl shadow space-y-8">
      <BackButton />
      <h1 className="text-2xl font-bold text-center">📉 MACD Calculator</h1>

      <div>
        <label className="block text-sm text-slate-300 mb-1">Stock Symbol (for reference only)</label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="e.g., AAPL"
          className="w-full p-2 bg-slate-800 text-white rounded border border-slate-700"
        />
      </div>

      <div className="text-center">
        <button
          onClick={calculateMACD}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold"
        >
          Calculate MACD
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