import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Generator() {
  const navigate = useNavigate()
  const location = useLocation()

  const [loading, setLoading] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showReplaceModal, setShowReplaceModal] = useState(false)
  const [pendingSession, setPendingSession] = useState(null)
  const [form, setForm] = useState({
    niche: location.state?.params?.niche || '',
    tone: location.state?.params?.tone || '',
    duration: location.state?.params?.duration || '60',
    quantity: location.state?.params?.quantity || 3
  })

  const editId = location.state?.editId || null

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

      const session = {
        id: Date.now(),
        date: new Date().toISOString(),
        params: { ...form },
        ideas: data.ideas,
        sessionName: data.sessionName || form.niche
      }

      if (editId) {
        setPendingSession(session)
        setShowReplaceModal(true)
      } else {
        saveAsNew(session)
        navigate('/results', { state: { ideas: data.ideas } })
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  function saveAsNew(session) {
    const history = JSON.parse(localStorage.getItem('history') || '[]')
    localStorage.setItem('history', JSON.stringify([session, ...history]))
  }

  function handleReplace() {
    const history = JSON.parse(localStorage.getItem('history') || '[]')
    const index = history.findIndex(s => s.id === editId)
    if (index !== -1) {
      history[index] = pendingSession
    } else {
      history.unshift(pendingSession)
    }
    localStorage.setItem('history', JSON.stringify(history))
    setShowReplaceModal(false)
    navigate('/results', { state: { ideas: pendingSession.ideas } })
  }

  function handleSaveAsNew() {
    saveAsNew(pendingSession)
    setShowReplaceModal(false)
    navigate('/results', { state: { ideas: pendingSession.ideas } })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6 pt-20">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-center">TikTok Idea Generator</h1>

        <div className="space-y-4">
          <input
            name="niche"
            value={form.niche}
            onChange={handleChange}
            placeholder="Niche (e.g. fitness, finance, cooking)"
            className="w-full bg-gray-800 rounded-lg px-4 py-4 text-lg outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="tone"
            value={form.tone}
            onChange={handleChange}
            placeholder="Tone (e.g. motivational, funny, educational)"
            className="w-full bg-gray-800 rounded-lg px-4 py-4 text-lg outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full bg-gray-800 rounded-lg px-4 py-4 text-lg outline-none focus:ring-2 focus:ring-purple-500"
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
            className="w-full bg-gray-800 rounded-lg px-4 py-4 text-lg outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value={3}>3 ideas</option>
            <option value={5}>5 ideas</option>
            <option value={10}>10 ideas</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !form.niche || !form.tone}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg px-4 py-4 text-base font-semibold transition-colors"
        >
          {loading ? 'Generating...' : 'Generate Ideas'}
        </button>
      </div>

      {/* Botón de ayuda flotante */}
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white rounded-xl w-12 h-12 text-xl font-bold shadow-lg transition-colors z-40"
      >
        ?
      </button>

      {/* Modal reemplazar o nueva sesión */}
      {showReplaceModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6 animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowReplaceModal(false) }}
        >
          <div className="bg-gray-900 rounded-2xl p-6 space-y-4 max-w-sm w-full animate-slide-up">
            <h2 className="text-lg font-bold">What do you want to do?</h2>
            <p className="text-gray-400 text-sm">You edited an existing session. Do you want to replace it or save as a new one?</p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSaveAsNew}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
              >
                Save as new
              </button>
              <button
                onClick={handleReplace}
                className="flex-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
              >
                Replace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de ayuda */}
      {showHelp && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6 animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowHelp(false) }}
        >
          <div className="bg-gray-900 rounded-2xl max-w-lg w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">How it works</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-white text-2xl transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-purple-400">Niche</p>
                <p className="text-gray-300 text-sm mt-1">The topic of your content. Be specific — "personal finance for millennials" works better than just "finance".</p>
              </div>
              <div>
                <p className="font-semibold text-purple-400">Tone</p>
                <p className="text-gray-300 text-sm mt-1">How you want to sound. This shapes the hook and structure of each idea. Try "motivational", "funny", "educational" or "controversial".</p>
              </div>
              <div>
                <p className="font-semibold text-purple-400">Duration</p>
                <p className="text-gray-300 text-sm mt-1">The length of your video. Shorter videos get tighter hooks and simpler structures. Longer ones allow more depth.</p>
              </div>
              <div>
                <p className="font-semibold text-purple-400">Quantity</p>
                <p className="text-gray-300 text-sm mt-1">How many ideas to generate. Start with 3 to test the output, then scale up once you find a niche and tone that works.</p>
              </div>
            </div>

            <div className="border-t border-gray-700" />

            <div>
              <p className="font-semibold text-gray-300 mb-3">Example output</p>
              <div className="bg-gray-800 rounded-xl p-5 space-y-4">
                <h3 className="text-lg font-bold text-purple-400">The 1% Rule for Saving Money</h3>
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Hook</span>
                  <p className="mt-1 text-gray-300 text-sm">You don't need to save 20% of your income. Start with 1% and here's why it works.</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Structure</span>
                  <p className="mt-1 text-gray-300 text-sm">Open with the counterintuitive claim, explain the psychology behind small habits, show a real example with numbers, close with a challenge.</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">Call to action</span>
                  <p className="mt-1 text-gray-300 text-sm">Save this video and try the 1% rule this week. Comment your starting number below.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Generator