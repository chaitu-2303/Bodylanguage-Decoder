import React from 'react'

export default function Card({ title, subtitle, cta, onClick }){
  return (
    <div className="glass rounded-2xl p-8 max-w-sm text-white shadow-lg">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="mb-4 text-white/80">{subtitle}</p>
      <button onClick={onClick} className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 font-semibold">{cta}</button>
    </div>
  )
}
