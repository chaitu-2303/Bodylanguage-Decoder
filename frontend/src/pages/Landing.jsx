import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'

export default function Landing(){
  const nav = useNavigate();
  return (
    <div className="min-h-[70vh] flex items-center justify-center relative p-8">
      <div className="absolute top-8 left-8 text-white/70 max-w-md">
        <h1 className="text-4xl font-bold">AI Body Language Decoder</h1>
        <p className="mt-2">Upload datasets to train a custom model, or run detection on live input. All actions are permanently recorded to the database for audit & analysis.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <Card title="Train Model" subtitle="Upload training data, tune, and version models." cta="Go to Train" onClick={() => nav('/train')} />
        <Card title="Detect Model" subtitle="Run detection on input (images/video) and get predictions." cta="Start Detecting" onClick={() => nav('/detect')} />
      </div>
    </div>
  )
}
