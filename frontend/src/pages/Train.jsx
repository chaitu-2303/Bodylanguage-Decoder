import React, { useState } from 'react'
import axios from 'axios'

export default function Train(){
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault();
    if(!file) return setStatus('Select a file');
    const fd = new FormData();
    fd.append('file', file);
    fd.append('user', 'webUI');
    try{
      setStatus('Uploading...')
      const res = await axios.post('/api/train', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setStatus('Success: ' + JSON.stringify(res.data));
    }catch(err){
      setStatus('Error: ' + (err.response?.data?.error || err.message));
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form onSubmit={submit} className="glass p-8 rounded-2xl w-full max-w-xl text-white">
        <h2 className="text-2xl mb-4">Train Model</h2>
        <input type="file" onChange={e => setFile(e.target.files[0])} className="mb-4 text-black" />
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400">Upload & Train</button>
          <div className="text-sm text-white/80">{status}</div>
        </div>
      </form>
    </div>
  )
}
