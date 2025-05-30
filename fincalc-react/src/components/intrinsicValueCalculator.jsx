import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function IntrinsicValueCalculator() {
  const [inputs, setInputs] = useState({
    fcf: '', baseGrowthRate: '', growthIncrease: '', discountRate: '',
    years: '', eps: '', peRatio: '', fcfMultiple: '', sharesOutstanding: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

  const calculateIntrinsicValue = () => {
    const parsed = Object.fromEntries(Object.entries(inputs).map(([k, v]) => [k, parseFloat(v)]));
    const { fcf, baseGrowthRate, growthIncrease, discountRate, years, eps, peRatio, fcfMultiple, sharesOutstanding } = parsed;

    if (Object.values(parsed).some((v) => isNaN(v))) {
      setResult("Please enter valid numeric inputs.");
      return;
    }

    let totalFCF = 0;
    for (let i = 0; i < years; i++) {
      const growth = baseGrowthRate + growthIncrease * i;
      const projected = fcf * Math.pow(1 + growth, i + 1);
      totalFCF += projected / Math.pow(1 + discountRate, i + 1);
    }

    const terminal = (fcf * fcfMultiple) / Math.pow(1 + discountRate, years);
    const dcfValue = (totalFCF + terminal) / sharesOutstanding;
    const earningsValue = eps * peRatio;

    setResult(`DCF: $${dcfValue.toFixed(2)} | EPS × P/E: $${earningsValue.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </Link>
        <h1 className="text-2xl font-bold text-center">💰 Intrinsic Value Calculator</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <SectionTitle title="Discounted Cash Flow Inputs" />
            <Input label="Free Cash Flow (FCF)" name="fcf" value={inputs.fcf} onChange={handleChange} />
            <Input label="Base Growth Rate (%)" name="baseGrowthRate" value={inputs.baseGrowthRate} onChange={handleChange} />
            <Input label="Growth Rate Increase per Year (%)" name="growthIncrease" value={inputs.growthIncrease} onChange={handleChange} />
            <Input label="Discount Rate (%)" name="discountRate" value={inputs.discountRate} onChange={handleChange} />
            <Input label="Projection Period (Years)" name="years" value={inputs.years} onChange={handleChange} />
            <Input label="FCF Terminal Multiple" name="fcfMultiple" value={inputs.fcfMultiple} onChange={handleChange} />
          </div>
          <div className="space-y-4">
            <SectionTitle title="Market & Multiples" />
            <Input label="EPS" name="eps" value={inputs.eps} onChange={handleChange} />
            <Input label="P/E Ratio" name="peRatio" value={inputs.peRatio} onChange={handleChange} />
            <Input label="Shares Outstanding" name="sharesOutstanding" value={inputs.sharesOutstanding} onChange={handleChange} />
          </div>
        </div>

        <div className="text-center">
          <button onClick={calculateIntrinsicValue} className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded font-semibold transition">
            Calculate Intrinsic Value
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

const SectionTitle = ({ title }) => <h2 className="text-lg font-semibold text-slate-200">{title}</h2>;

function Footer() {
  return (
    <footer className="mt-16 text-center text-sm text-slate-500">
      <p>© {new Date().getFullYear()} Max Wang — Built with React & Tailwind</p>
      <p><a href="https://github.com/MaxCodesWasTaken/fincalc" className="text-blue-400 hover:underline">View Source on GitHub</a></p>
    </footer>
  );
}
