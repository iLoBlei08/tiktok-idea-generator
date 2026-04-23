import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import IdeaCard from '../components/IdeaCard'

function Saved() {
  const navigate = useNavigate()
  const [savedIdeas, setSavedIdeas] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedIdeas') || '[]')
    setSavedIdeas(saved)
  }, [])

  function clearAll() {
    localStorage.removeItem('savedIdeas')
    setSavedIdeas([])
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Saved Ideas</h1>
          <div className="flex gap-4">
            {savedIdeas.length > 0 && (
              <button
                onClick={clearAll}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Clear all
              </button>
            )}
            <button
              onClick={() => navigate('/')}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              ← Generator
            </button>
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
    </div>
  )
}

export default Saved