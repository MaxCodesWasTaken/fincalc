import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function MacdCalculator() {
  const [symbol, setSymbol] = useState('');
  const [result, setResult] = useState(null);

  const calculateMACD = () => {
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

    setResult(`MACD: ${macdLine.at(-1).toFixed(2)}, Signal: ${signalLine.at(-1).toFixed(2)}, Histogram: ${histogram.at(-1).toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-xl mx-auto space-y-8">
        <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </Link>
        <h1 className="text-2xl font-bold text-center">📉 MACD Calculator</h1>

        <div>
          <label className="block text-sm text-slate-300 mb-1">Stock Symbol (mock only)</label>
          <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)}
            className="w-full p-2 bg-slate-800 text-white rounded border border-slate-700" placeholder="e.g., AAPL" />
        </div>

        <div className="text-center">
          <button onClick={calculateMACD} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition">
            Calculate MACD
          </button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="text-center text-xl font-semibold mt-6 bg-slate-800 p-4 rounded">
            {result}
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 text-center text-sm text-slate-500">
      <p>© {new Date().getFullYear()} Max Wang — Built with React & Tailwind</p>
      <p><a href="https://github.com/MaxCodesWasTaken/fincalc" className="text-blue-400 hover:underline">View Source on GitHub</a></p>
    </footer>
  );
}
