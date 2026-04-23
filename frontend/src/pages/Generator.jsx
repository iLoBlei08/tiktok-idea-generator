import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Generator() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    niche: '',
    tone: '',
    duration: '60',
    quantity: 3
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await response.json()
      navigate('/results', { state: { ideas: data.ideas } })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">TikTok Idea Generator</h1>

        <div className="space-y-4">
          <input
            name="niche"
            value={form.niche}
            onChange={handleChange}
            placeholder="Niche (e.g. fitness, finance, cooking)"
            className="w-full bg-gray-800 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="tone"
            value={form.tone}
            onChange={handleChange}
            placeholder="Tone (e.g. motivational, funny, educational)"
            className="w-full bg-gray-800 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full bg-gray-800 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="15">15 seconds</option>
            <option value="30">30 seconds</option>
            <option value="60">60 seconds</option>
            <option value="90">90 seconds</option>
          </select>
          <select
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full bg-gray-800 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value={3}>3 ideas</option>
            <option value={5}>5 ideas</option>
            <option value={10}>10 ideas</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !form.niche || !form.tone}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg px-4 py-3 font-semibold transition-colors"
        >
          {loading ? 'Generating...' : 'Generate Ideas'}
        </button>
      </div>
    </div>
  )
}

export default Generator