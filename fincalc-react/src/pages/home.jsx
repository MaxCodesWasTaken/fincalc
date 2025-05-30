import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, Activity, DollarSign, PieChart } from 'lucide-react';

const calculators = [
  { name: "Intrinsic Value", path: "/ival", desc: "Estimate fair value using discounted cash flows.", icon: DollarSign },
  { name: "Implied Volatility", path: "/ivol", desc: "Estimate IV from option price using Black-Scholes.", icon: TrendingUp },
  { name: "Debt-to-Equity", path: "/de", desc: "Measure financial leverage using D/E ratio.", icon: PieChart },
  { name: "CAPM", path: "/capm", desc: "Calculate expected return based on beta.", icon: Activity },
  { name: "MACD", path: "/macd", desc: "Analyze trend strength using EMA crossovers.", icon: Calculator },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-primary-100">📊 Financial Calculators</h1>
        <p className="text-slate-400 text-lg">
          Analyze investments, measure risk, and estimate value using our finance tools.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {calculators.map(({ name, path, desc, icon: Icon }) => (
          <div
            key={name}
            className="bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <Icon className="w-8 h-8 text-blue-400" />
              <h2 className="text-xl font-semibold">{name}</h2>
            </div>
            <p className="text-slate-400 text-sm mb-4">{desc}</p>
            <Link
              to={path}
              className="inline-block mt-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
            >
              Launch
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
