import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/Landing'
import Train from './pages/Train'
import Detect from './pages/Detect'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col text-white">
      <nav className="p-4 flex justify-between items-center">
        <div className="text-xl font-semibold">AI Body Language Decoder</div>
        <div className="space-x-4">
          <Link to="/" className="text-white/90">Home</Link>
          <Link to="/train" className="text-white/90">Train</Link>
          <Link to="/detect" className="text-white/90">Detect</Link>
        </div>
      </nav>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/train" element={<Train/>} />
          <Route path="/detect" element={<Detect/>} />
        </Routes>
      </main>
      <footer className="p-4 text-center text-white/70">© {new Date().getFullYear()} AI Body Language Decoder</footer>
    </div>
  )
}
