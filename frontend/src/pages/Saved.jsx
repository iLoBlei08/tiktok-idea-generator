import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import IdeaCard from '../components/IdeaCard'

function Saved() {
  const navigate = useNavigate()
  const [savedIdeas, setSavedIdeas] = useState([])
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedIdeas') || '[]')
    setSavedIdeas(saved)
  }, [])

  function clearAll() {
    localStorage.removeItem('savedIdeas')
    setSavedIdeas([])
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 pt-20">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Saved Ideas</h1>
          <div className="flex gap-4">
            {savedIdeas.length > 0 && (
              <button
                onClick={() => setShowConfirm(true)}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/30 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {savedIdeas.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No saved ideas yet. Star an idea to save it!</p>
        ) : (
          savedIdeas.map((idea, index) => (
            <IdeaCard key={index} idea={idea} />
          ))
        )}
      </div>
      {showConfirm && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6 animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setShowConfirm(false) }}
        >
          <div className="bg-gray-900 rounded-2xl p-6 space-y-4 max-w-sm w-full animate-slide-up">
            <h2 className="text-lg font-bold">Clear saved ideas?</h2>
            <p className="text-gray-400 text-sm">This will permanently delete all your saved ideas. This action cannot be undone.</p>
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

export default Saved