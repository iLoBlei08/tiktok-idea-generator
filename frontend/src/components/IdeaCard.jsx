import { useState } from 'react'

function IdeaCard({ idea, onUnsave }) {
  const [saved, setSaved] = useState(() => {
    const savedIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]')
    return savedIdeas.some(i => i.title === idea.title)
  })
  const [toast, setToast] = useState({ visible: false, fading: false, message: '' })

  function showToast(message) {
    setToast({ visible: true, fading: false, message })
    setTimeout(() => {
      setToast(prev => ({ ...prev, fading: true }))
      setTimeout(() => {
        setToast({ visible: false, fading: false, message: '' })
      }, 500)
    }, 2000)
  }

  function toggleSave() {
    const savedIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]')

    if (saved) {
      const updated = savedIdeas.filter(i => i.title !== idea.title)
      localStorage.setItem('savedIdeas', JSON.stringify(updated))
      setSaved(false)
      showToast('Removed from saved')
      if (onUnsave) onUnsave(idea)
    } else {
      localStorage.setItem('savedIdeas', JSON.stringify([...savedIdeas, idea]))
      setSaved(true)
      showToast('Saved!')
    }
  }

  return (
    <div className="relative bg-gray-800 rounded-xl p-6 space-y-4">

      <div className="relative flex items-start justify-between">
        <h2 className="text-xl font-bold text-purple-400">{idea.title}</h2>
        <div className="relative flex justify-center">
          {toast.visible && (
            <div className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap transition-opacity duration-500 ${toast.fading ? 'opacity-0' : 'opacity-100'}`}>
              {toast.message}
            </div>
          )}
          <button
            onClick={toggleSave}
            className={`text-2xl transition-colors ${saved ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'}`}
          >
            {saved ? '★' : '☆'}
          </button>
        </div>
      </div>

      <div>
        <span className="text-xs text-gray-400 uppercase tracking-wide">Structure</span>
        <p className="mt-1 text-gray-300">{idea.structure}</p>
      </div>

      <div>
        <span className="text-xs text-gray-400 uppercase tracking-wide">Call to action</span>
        <p className="mt-1 text-gray-300">{idea.cta}</p>
      </div>
    </div>
  )
}

export default IdeaCard