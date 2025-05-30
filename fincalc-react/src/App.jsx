import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import CapmCalculator from './components/capmCalculator';
import DeCalculator from './components/deCalculator';
import IntrinsicValueCalculator from './components/intrinsicValueCalculator';
import ImpliedVolatilityCalculator from './components/impliedVolatilityCalculator';
import MacdCalculator from './components/macdCalculator';

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-slate-900 text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/capm" element={<CapmCalculator />} />
        <Route path="/de" element={<DeCalculator />} />
        <Route path="/ival" element={<IntrinsicValueCalculator />} />
        <Route path="/ivol" element={<ImpliedVolatilityCalculator />} />
        <Route path="/macd" element={<MacdCalculator />} />
      </Routes>
    </div>
  );
}
