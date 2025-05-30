import { useState } from 'react';
import BackButton from '../components/common/BackButton';
export default function IntrinsicValueCalculator() {
  const [inputs, setInputs] = useState({
    fcf: '',
    baseGrowthRate: '',
    growthIncrease: '',
    discountRate: '',
    years: '',
    eps: '',
    peRatio: '',
    fcfMultiple: '',
    sharesOutstanding: '',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const calculateIntrinsicValue = () => {
    const {
      fcf,
      baseGrowthRate,
      growthIncrease,
      discountRate,
      years,
      eps,
      peRatio,
      fcfMultiple,
      sharesOutstanding,
    } = Object.fromEntries(
      Object.entries(inputs).map(([k, v]) => [k, parseFloat(v)])
    );

    if (Object.values(inputs).some((v) => isNaN(parseFloat(v)))) {
      setResult('Please fill out all fields with valid numbers.');
      return;
    }

    let totalFCF = 0;
    for (let i = 0; i < years; i++) {
      const growth = baseGrowthRate + growthIncrease * i;
      const projectedFCF = fcf * Math.pow(1 + growth, i + 1);
      totalFCF += projectedFCF / Math.pow(1 + discountRate, i + 1);
    }

    const terminalValue = (fcf * fcfMultiple) / Math.pow(1 + discountRate, years);
    const dcfValue = (totalFCF + terminalValue) / sharesOutstanding;
    const earningsValue = (eps * peRatio);

    setResult(
      `DCF Value per Share: $${dcfValue.toFixed(2)} | EPS × P/E Value: $${earningsValue.toFixed(2)}`
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-slate-900 text-white rounded-xl shadow space-y-8">
      <BackButton />
      <h1 className="text-2xl font-bold text-center">📈 Intrinsic Value Calculator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">📊 Discounted Cash Flow Inputs</h2>
          <div className="space-y-2">
            <Input label="Free Cash Flow (FCF)" name="fcf" value={inputs.fcf} onChange={handleChange} />
            <Input label="Base Growth Rate (%)" name="baseGrowthRate" value={inputs.baseGrowthRate} onChange={handleChange} />
            <Input label="Growth Rate Increase per Year (%)" name="growthIncrease" value={inputs.growthIncrease} onChange={handleChange} />
            <Input label="Discount Rate (%)" name="discountRate" value={inputs.discountRate} onChange={handleChange} />
            <Input label="Projection Period (Years)" name="years" value={inputs.years} onChange={handleChange} />
            <Input label="FCF Terminal Multiple" name="fcfMultiple" value={inputs.fcfMultiple} onChange={handleChange} />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">📈 Valuation Multiples</h2>
          <div className="space-y-2">
            <Input label="Earnings per Share (EPS)" name="eps" value={inputs.eps} onChange={handleChange} />
            <Input label="P/E Ratio" name="peRatio" value={inputs.peRatio} onChange={handleChange} />
            <Input label="Shares Outstanding" name="sharesOutstanding" value={inputs.sharesOutstanding} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={calculateIntrinsicValue}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded font-semibold"
        >
          Calculate
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
