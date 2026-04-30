import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage'

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  )
}
