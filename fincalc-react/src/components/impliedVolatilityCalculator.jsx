import { useState } from 'react';
import BackButton from '../components/common/BackButton';
export default function ImpliedVolatilityCalculator() {
  const [inputs, setInputs] = useState({
    optionType: 'call',
    S: '',
    K: '',
    T: '',
    r: '',
    q: '',
    marketPrice: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const calculateImpliedVolatility = () => {
    const { optionType, S, K, T, r, q, marketPrice } = {
      ...inputs,
      S: parseFloat(inputs.S),
      K: parseFloat(inputs.K),
      T: parseFloat(inputs.T) / 365,
      r: parseFloat(inputs.r) / 100,
      q: parseFloat(inputs.q) / 100,
      marketPrice: parseFloat(inputs.marketPrice)
    };

    if ([S, K, T, r, q, marketPrice].some((v) => isNaN(v) || v <= 0)) {
      setResult("Please enter valid positive numbers.");
      return;
    }

    const normCDF = (x) => 0.5 * (1 + Math.erf(x / Math.sqrt(2)));

    const blackScholes = (sigma) => {
      const d1 = (Math.log(S / K) + (r - q + 0.5 * sigma ** 2) * T) / (sigma * Math.sqrt(T));
      const d2 = d1 - sigma * Math.sqrt(T);
      if (optionType === 'call') {
        return S * Math.exp(-q * T) * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2);
      } else {
        return K * Math.exp(-r * T) * normCDF(-d2) - S * Math.exp(-q * T) * normCDF(-d1);
      }
    };

    // Newton-Raphson method
    let sigma = 0.3;
    for (let i = 0; i < 100; i++) {
      const price = blackScholes(sigma);
      const vega = (S * Math.exp(-q * T) * Math.sqrt(T)) / Math.sqrt(2 * Math.PI) * Math.exp(-0.5 * ((Math.log(S / K) + (r - q + 0.5 * sigma ** 2) * T) / (sigma * Math.sqrt(T))) ** 2);
      const diff = price - marketPrice;
      if (Math.abs(diff) < 1e-4) break;
      sigma = sigma - diff / vega;
    }

    setResult(`Implied Volatility: ${(sigma * 100).toFixed(2)}%`);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-slate-900 text-white rounded-xl shadow space-y-8">
      <BackButton />
      <h1 className="text-2xl font-bold text-center">📈 Implied Volatility Calculator</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Option Type</label>
          <select name="optionType" value={inputs.optionType} onChange={handleChange} className="w-full p-2 bg-slate-800 text-white rounded">
            <option value="call">Call Option</option>
            <option value="put">Put Option</option>
          </select>
        </div>
        <Input label="Underlying Price (S)" name="S" value={inputs.S} onChange={handleChange} />
        <Input label="Strike Price (K)" name="K" value={inputs.K} onChange={handleChange} />
        <Input label="Days to Expiration (T)" name="T" value={inputs.T} onChange={handleChange} />
        <Input label="Risk-Free Rate (%)" name="r" value={inputs.r} onChange={handleChange} />
        <Input label="Dividend Yield (%)" name="q" value={inputs.q} onChange={handleChange} />
        <Input label="Market Price of Option" name="marketPrice" value={inputs.marketPrice} onChange={handleChange} />
      </div>

      <div className="text-center">
        <button onClick={calculateImpliedVolatility} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold">
          Estimate IV
        </button>
      </div>

      {result && <div className="text-center text-xl font-semibold mt-6 bg-slate-800 p-4 rounded">{result}</div>}
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

// Needed polyfill for Math.erf (not standard in all JS engines)
if (!Math.erf) {
  Math.erf = function (x) {
    // Approximation using Abramowitz and Stegun formula 7.1.26
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    const a1 =  0.254829592,
          a2 = -0.284496736,
          a3 =  1.421413741,
          a4 = -1.453152027,
          a5 =  1.061405429,
          p  =  0.3275911;
    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  };
}
