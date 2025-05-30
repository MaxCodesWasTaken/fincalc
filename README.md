## FinCalc – Financial Calculator Suite

Live Site → ocodify.com/fincalc

FinCalc is a modern, responsive suite of financial calculators built with React, Tailwind CSS v4, and Vite. Designed for analysts, students, and investors, it features intuitive tools for pricing, valuation, and risk analysis.

## Features
- Intrinsic Value (DCF) Calculator
- Implied Volatility Estimator (Black-Scholes + Newton-Raphson)
- CAPM Calculator for expected return
- Debt-to-Equity Ratio Analyzer
- MACD Calculator with EMA-based trend insight
- Responsive design with dark mode
- Easy navigation with Back buttons and a polished home dashboard

## Tech Stack
- React 18 + React Router DOM
- Tailwind CSS v4
- Lucide-react icons
- Vite build tool

## Getting Started
Clone & Run Locally
```bash
git clone https://github.com/yourname/fincalc.git
cd fincalc
npm install
npm run dev
```
Build for Production
```bash
npm run build
```
For deployment, ensure vite.config.js contains:

```js
base: '/fincalc/' // if hosted under a subdirectory like /fincalc
```

## Project Structure
```css
src/
├── components/
│   └── calculators/
│       ├── capmCalculator.jsx
│       ├── deCalculator.jsx
│       ├── impliedVolatilityCalculator.jsx
│       ├── intrinsicValueCalculator.jsx
│       └── macdCalculator.jsx
├── pages/
│   └── home.jsx
├── App.jsx
├── main.jsx
├── index.css
```

## Coming Soon
- Data persistence via Supabase or Firebase
- Historical data charts via stock APIs
- AI assistant for financial concept explanations
- PDF export of calculator results

## Contact
Made by Max Wang