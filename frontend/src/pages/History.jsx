import { useState, useEffect } from 'react'
import IdeaCard from '../components/IdeaCard'

function History() {
  const [sessions, setSessions] = useState([])
  const [expanded, setExpanded] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('history') || '[]')
    setSessions(saved)
  }, [])

  function clearAll() {
    localStorage.removeItem('history')
    setSessions([])
  }

  function toggleExpand(id) {
    setExpanded(prev => prev === id ? null : id)
  }

  function formatDate(iso) {
    const d = new Date(iso)
    return d.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 pt-20">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">History</h1>
          {sessions.length > 0 && (
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/30 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {sessions.length === 0 ? (
          <p className="text-gray-400 text-center py-12">
            No history yet. Generate some ideas first!
          </p>
        ) : (
          sessions.map(session => (
            <div key={session.id} className="bg-gray-800 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleExpand(session.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-750 transition-colors text-left"
              >
                <div className="space-y-1">
                  <p className="font-semibold text-white">{session.params.niche}</p>
                  <p className="text-sm text-gray-400">
                    {session.params.tone} · {session.params.duration}s
                  </p>
                  <p className="text-xs text-gray-500">{formatDate(session.date)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap">
                    {session.params.quantity} ideas
                  </span>
                  <span className="text-gray-400">
                    {expanded === session.id ? '▲' : '▼'}
                  </span>
                </div>
              </button>

              {expanded === session.id && (
                <div className="px-6 pb-6 space-y-4 border-t border-gray-700 pt-4">
                  {session.ideas.map((idea, index) => (
                    <IdeaCard key={index} idea={idea} />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {showConfirm && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6 animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowConfirm(false) }}
        >
          <div className="bg-gray-900 rounded-2xl p-6 space-y-4 max-w-sm w-full animate-slide-up">
            <h2 className="text-lg font-bold">Clear history?</h2>
            <p className="text-gray-400 text-sm">This will permanently delete all your past sessions. This action cannot be undone.</p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { clearAll(); setShowConfirm(false) }}
                className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default History