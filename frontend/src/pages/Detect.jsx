import React, { useState } from 'react'
import axios from 'axios'

export default function Detect(){
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('/api/detect', { user: 'webUI', input });
      setResult(res.data);
    }catch(err){
      setResult({ error: err.message });
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form onSubmit={submit} className="glass p-8 rounded-2xl w-full max-w-xl text-white">
        <h2 className="text-2xl mb-4">Detect</h2>
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste an image URL / metadata or description (demo)" className="mb-4 w-full text-black p-3 rounded" />
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400">Run Detection</button>
          <div className="text-sm text-white/80">{result ? JSON.stringify(result) : 'No results yet'}</div>
        </div>
      </form>
    </div>
  )
}
