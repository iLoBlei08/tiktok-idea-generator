import { useState, useEffect } from 'react'
import IdeaCard from '../components/IdeaCard'
import { useNavigate } from 'react-router-dom'

function History() {
  const [sessions, setSessions] = useState([])
  const [expanded, setExpanded] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [search, setSearch] = useState('')
  const [filterNiche, setFilterNiche] = useState('')
  const [sortOrder, setSortOrder] = useState('newest')
  const [selectedSessions, setSelectedSessions] = useState({})
  const [selectMode, setSelectMode] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const navigate = useNavigate()

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

  const filtered = sessions
    .filter(s =>
      (s.sessionName || s.params.niche).toLowerCase().includes(search.toLowerCase())
    )
    .filter(s =>
      filterNiche ? s.params.niche.toLowerCase() === filterNiche.toLowerCase() : true
    )
    .sort((a, b) =>
      sortOrder === 'newest' ? b.id - a.id : a.id - b.id
    )

  function getSessionCheckboxState(session) {
    const selected = selectedSessions[session.id]
    if (!selected || selected.size === 0) return 'none'
    if (selected.size === session.ideas.length) return 'all'
    return 'some'
  }

  function toggleSessionCheckbox(session) {
    const state = getSessionCheckboxState(session)
    setSelectedSessions(prev => ({
      ...prev,
      [session.id]: state === 'all'
        ? new Set()
        : new Set(session.ideas.map((_, i) => i))
    }))
  }

  function toggleIdeaCheckbox(sessionId, ideaIndex) {
    setSelectedSessions(prev => {
      const current = new Set(prev[sessionId] || [])
      if (current.has(ideaIndex)) {
        current.delete(ideaIndex)
      } else {
        current.add(ideaIndex)
      }
      return { ...prev, [sessionId]: current }
    })
  }

  function cancelSelect() {
    setSelectMode(false)
    setSelectedSessions({})
  }

  function deleteSelected() {
    let updatedSessions = [...sessions]
    for (const [sessionId, selectedIdeas] of Object.entries(selectedSessions)) {
      if (selectedIdeas.size === 0) continue
      const idx = updatedSessions.findIndex(s => s.id === Number(sessionId))
      if (idx === -1) continue
      const session = updatedSessions[idx]
      const remainingIdeas = session.ideas.filter((_, i) => !selectedIdeas.has(i))
      if (remainingIdeas.length === 0) {
        updatedSessions.splice(idx, 1)
      } else {
        updatedSessions[idx] = { ...session, ideas: remainingIdeas }
      }
    }
    localStorage.setItem('history', JSON.stringify(updatedSessions))
    setSessions(updatedSessions)
    setSelectedSessions({})
  }

  const hasAnySelected = Object.values(selectedSessions).some(s => s.size > 0)

  function Checkbox({ state, onClick }) {
    return (
      <div
        onClick={onClick}
        className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer border-2 transition-colors flex-shrink-0 ${state === 'none'
          ? 'border-gray-600 bg-transparent hover:border-purple-500'
          : 'border-purple-500 bg-purple-600'
          }`}
      >
        {state === 'all' && <span className="text-white text-xs font-bold">✓</span>}
        {state === 'some' && <span className="text-white text-xs font-bold">−</span>}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 pt-20">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">History</h1>
          <div className="flex gap-3">
            {selectMode ? (
              <>
                {hasAnySelected && (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/30 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
                  >
                    Delete selected
                  </button>
                )}
                <button
                  onClick={cancelSelect}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {sessions.length > 0 && (
                  <button
                    onClick={() => setSelectMode(true)}
                    className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
                  >
                    Select
                  </button>
                )}
                {sessions.length > 0 && (
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/30 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </>
            )}
            {showDeleteConfirm && (
              <div
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6 animate-fade-in"
                onClick={(e) => { if (e.target === e.currentTarget) setShowDeleteConfirm(false) }}
              >
                <div className="bg-gray-900 rounded-2xl p-6 space-y-4 max-w-sm w-full animate-slide-up">
                  <h2 className="text-lg font-bold">Delete selected?</h2>
                  <p className="text-gray-400 text-sm">This will permanently delete the selected ideas. This action cannot be undone.</p>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => { deleteSelected(); setShowDeleteConfirm(false) }}
                      className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {sessions.length > 0 && (
          <div className="space-y-3">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search sessions..."
              className="w-full bg-gray-800 rounded-lg px-4 py-3 text-base outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex gap-3">
              <select
                value={filterNiche}
                onChange={e => setFilterNiche(e.target.value)}
                className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All niches</option>
                {[...new Set(sessions.map(s => s.params.niche))].map(niche => (
                  <option key={niche} value={niche}>{niche}</option>
                ))}
              </select>
              <select
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
                className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>
        )}

        {filtered.length === 0 && sessions.length > 0 ? (
          <p className="text-gray-400 text-center py-12">No sessions match your search.</p>
        ) : sessions.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No history yet. Generate some ideas first!</p>
        ) : (
          filtered.map(session => (
            <div key={session.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
              <div className="w-full px-6 py-4 flex items-center gap-4">
                {selectMode && (
                  <Checkbox
                    state={getSessionCheckboxState(session)}
                    onClick={e => { e.stopPropagation(); toggleSessionCheckbox(session) }}
                  />
                )}
                <button
                  onClick={() => toggleExpand(session.id)}
                  className="flex-1 flex items-center justify-between text-left"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-white">
                      {session.sessionName || session.params.niche}
                    </p>
                    <p className="text-sm text-gray-400">
                      {session.params.tone} · {session.params.duration}s
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(session.date)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap">
                      {session.ideas.length} ideas
                    </span>
                    <span className="text-gray-400">
                      {expanded === session.id ? '▲' : '▼'}
                    </span>
                  </div>
                </button>
              </div>

              {expanded === session.id && (
                <div className="px-6 pb-6 space-y-4 border-t border-gray-700 pt-4">
                  <button
                    onClick={() => navigate('/', { state: { params: session.params, editId: session.id } })}
                    className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
                  >
                    ✎ Edit & regenerate
                  </button>
                  {session.ideas.map((idea, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {selectMode && (
                        <Checkbox
                          state={selectedSessions[session.id]?.has(index) ? 'all' : 'none'}
                          onClick={() => toggleIdeaCheckbox(session.id, index)}
                        />
                      )}
                      <div className="flex-1">
                        <IdeaCard idea={idea} />
                      </div>
                    </div>
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