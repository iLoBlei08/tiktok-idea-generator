import { useLocation, useNavigate } from 'react-router-dom'
import IdeaCard from '../components/IdeaCard'

function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const ideas = location.state?.ideas || []

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Your Ideas</h1>
          <button
            onClick={() => navigate('/')}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            ← Generate more
          </button>
        </div>

        {ideas.map((idea, index) => (
          <IdeaCard key={index} idea={idea} />
        ))}
      </div>
    </div>
  )
}

export default Results