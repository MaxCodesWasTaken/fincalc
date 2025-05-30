// src/pages/Home.jsx
import { Link } from 'react-router-dom';

const calculators = [
  { name: "Intrinsic Value", path: "/ival", desc: "DCF-based valuation" },
  { name: "Implied Volatility", path: "/ivol", desc: "Option volatility model" },
  { name: "Debt-to-Equity Ratio", path: "/de", desc: "Company leverage" },
  { name: "CAPM", path: "/capm", desc: "Expected return using beta" },
  { name: "MACD", path: "/macd", desc: "EMA crossover strategy" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary-100">Financial Calculators</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {calculators.map(calc => (
          <div key={calc.name} className="bg-slate-800 rounded-xl p-5 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{calc.name}</h2>
            <p className="text-sm text-slate-300 mb-4">{calc.desc}</p>
            <Link to={calc.path} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Go
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
