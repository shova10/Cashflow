import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { useEffect } from "react";
// import { useThemeStore } from "./store/themeStore";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Home from "./pages/Home";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors">
        

        <nav className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between max-w-4xl mx-auto rounded-b-xl">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">CashFlow</h1>
          <div className="space-x-4">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-emerald-500">Home</Link>
            <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-emerald-500">Dashboard</Link>
            <Link to="/transactions" className="text-gray-700 dark:text-gray-300 hover:text-emerald-500">Transactions</Link>
            <Link to="/analytics" className="text-gray-700 dark:text-gray-300 hover:text-emerald-500">Analytics</Link>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
