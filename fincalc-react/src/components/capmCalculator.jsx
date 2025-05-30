import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-xl mx-auto space-y-8">

        {/* Back button */}
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-center">📊 CAPM Calculator</h1>

        <div className="space-y-4">
          <Input label="Risk-Free Rate (%)" name="riskFreeRate" value={inputs.riskFreeRate} onChange={handleChange} />
          <Input label="Beta (β)" name="beta" value={inputs.beta} onChange={handleChange} />
          <Input label="Market Return (%)" name="marketReturn" value={inputs.marketReturn} onChange={handleChange} />
        </div>

        <div className="text-center">
          <button
            onClick={calculateCAPM}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition"
          >
            Calculate Expected Return
          </button>
        </div>

        {/* Animated result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center text-xl font-semibold mt-6 bg-slate-800 p-4 rounded"
          >
            {result}
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Max Wang — Built with React & Tailwind</p>
        <p>
          <a href="https://github.com/MaxCodesWasTaken/fincalc" className="text-blue-400 hover:underline">
            View Source on GitHub
          </a>
        </p>
      </footer>
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
        className="w-full p-2 bg-slate-800 text-white rounded border border-slate-700 transition focus:ring-2 focus:ring-blue-500"
        placeholder="Enter a value"
      />
    </div>
  );
}
