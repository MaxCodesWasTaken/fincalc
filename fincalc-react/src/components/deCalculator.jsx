import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function DeCalculator() {
  const [inputs, setInputs] = useState({ totalLiabilities: '', shareholdersEquity: '' });
  const [result, setResult] = useState(null);

  const handleChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

  const calculateDERatio = () => {
    const { totalLiabilities, shareholdersEquity } = Object.fromEntries(
      Object.entries(inputs).map(([k, v]) => [k, parseFloat(v)])
    );
    if (isNaN(totalLiabilities) || isNaN(shareholdersEquity) || shareholdersEquity === 0) {
      setResult('Please enter valid numbers. Equity must be > 0.');
      return;
    }
    setResult(`D/E Ratio: ${(totalLiabilities / shareholdersEquity).toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-xl mx-auto space-y-8">
        <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </Link>
        <h1 className="text-2xl font-bold text-center">📘 Debt-to-Equity Ratio</h1>

        <div className="space-y-4">
          <Input label="Total Liabilities" name="totalLiabilities" value={inputs.totalLiabilities} onChange={handleChange} />
          <Input label="Shareholders' Equity" name="shareholdersEquity" value={inputs.shareholdersEquity} onChange={handleChange} />
        </div>

        <div className="text-center">
          <button onClick={calculateDERatio} className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded font-semibold transition">
            Calculate
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

function Footer() {
  return (
    <footer className="mt-16 text-center text-sm text-slate-500">
      <p>© {new Date().getFullYear()} Max Wang — Built with React & Tailwind</p>
      <p>
        <a href="https://github.com/MaxCodesWasTaken/fincalc" className="text-blue-400 hover:underline">
          View Source on GitHub
        </a>
      </p>
    </footer>
  );
}
