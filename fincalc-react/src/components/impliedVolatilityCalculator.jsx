import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ImpliedVolatilityCalculator() {
  const [inputs, setInputs] = useState({
    optionType: 'call',
    S: '', K: '', T: '', r: '', q: '', marketPrice: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

  const normCDF = (x) => 0.5 * (1 + Math.erf(x / Math.sqrt(2)));

  const blackScholes = (sigma) => {
    const { S, K, T, r, q, optionType } = inputs;
    const t = parseFloat(T) / 365;
    const d1 = (Math.log(S / K) + (r - q + 0.5 * sigma ** 2) * t) / (sigma * Math.sqrt(t));
    const d2 = d1 - sigma * Math.sqrt(t);
    if (optionType === 'call') {
      return S * Math.exp(-q * t) * normCDF(d1) - K * Math.exp(-r * t) * normCDF(d2);
    } else {
      return K * Math.exp(-r * t) * normCDF(-d2) - S * Math.exp(-q * t) * normCDF(-d1);
    }
  };

  const calculateImpliedVolatility = () => {
    const parsed = Object.fromEntries(
      Object.entries(inputs).map(([k, v]) =>
        ['optionType'].includes(k) ? [k, v] : [k, parseFloat(v)]
      )
    );
    const { S, K, T, r, q, marketPrice } = parsed;
    const t = T / 365;

    if ([S, K, T, r, q, marketPrice].some((v) => isNaN(v) || v <= 0)) {
      setResult("Please enter valid positive numbers.");
      return;
    }

    let sigma = 0.3;
    for (let i = 0; i < 100; i++) {
      const price = blackScholes(sigma);
      const vega = (S * Math.exp(-q * t) * Math.sqrt(t)) / Math.sqrt(2 * Math.PI) *
        Math.exp(-0.5 * ((Math.log(S / K) + (r - q + 0.5 * sigma ** 2) * t) / (sigma * Math.sqrt(t))) ** 2);
      const diff = price - marketPrice;
      if (Math.abs(diff) < 1e-4) break;
      sigma -= diff / vega;
    }

    setResult(`Implied Volatility: ${(sigma * 100).toFixed(2)}%`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-xl mx-auto space-y-8">
        <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </Link>

        <h1 className="text-2xl font-bold text-center">📈 Implied Volatility Calculator</h1>

        <div className="space-y-4">
          <Select name="optionType" value={inputs.optionType} onChange={handleChange} />
          <Input label="Underlying Price (S)" name="S" value={inputs.S} onChange={handleChange} />
          <Input label="Strike Price (K)" name="K" value={inputs.K} onChange={handleChange} />
          <Input label="Days to Expiration (T)" name="T" value={inputs.T} onChange={handleChange} />
          <Input label="Risk-Free Rate (%)" name="r" value={inputs.r} onChange={handleChange} />
          <Input label="Dividend Yield (%)" name="q" value={inputs.q} onChange={handleChange} />
          <Input label="Market Price" name="marketPrice" value={inputs.marketPrice} onChange={handleChange} />
        </div>

        <div className="text-center">
          <button onClick={calculateImpliedVolatility} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition">
            Estimate IV
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

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-slate-300 mb-1">{label}</label>
      <input type="number" step="any" name={name} value={value} onChange={onChange}
        className="w-full p-2 bg-slate-800 text-white rounded border border-slate-700" />
    </div>
  );
}

function Select({ name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-slate-300 mb-1">Option Type</label>
      <select name={name} value={value} onChange={onChange}
        className="w-full p-2 bg-slate-800 text-white rounded border border-slate-700">
        <option value="call">Call Option</option>
        <option value="put">Put Option</option>
      </select>
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

// Polyfill fo
