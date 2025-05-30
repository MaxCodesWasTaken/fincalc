import { useState } from 'react';

export default function ImpliedVolatilityCalculator() {
  const [inputs, setInputs] = useState({
    type: 'call', underlying: '', strike: '', days: '', rate: '', dividend: '', price: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = e => setInputs({ ...inputs, [e.target.name]: e.target.value });

  const calculateImpliedVolatility = () => {
    // This is a placeholder — true IV requires numerical root solving (e.g., Newton-Raphson)
    setResult("Implied Volatility estimation requires Black-Scholes inversion. Coming soon.");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-800 text-white rounded-lg shadow space-y-4">
      <h1 className="text-xl font-bold">Implied Volatility Calculator</h1>
      <select name="type" value={inputs.type} onChange={handleChange} className="w-full p-2 bg-slate-700 rounded">
        <option value="call">Call Option</option>
        <option value="put">Put Option</option>
      </select>
      {['underlying', 'strike', 'days', 'rate', 'dividend', 'price'].map(field => (
        <input key={field} name={field} type="number" value={inputs[field]} onChange={handleChange}
               className="w-full p-2 bg-slate-700 rounded" placeholder={field} />
      ))}
      <button onClick={calculateImpliedVolatility} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Estimate IV</button>
      {result && <p className="mt-4 text-lg">{result}</p>}
    </div>
  );
}
