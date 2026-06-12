import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Transactions from './pages/Transactions'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f1117] text-white flex flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
