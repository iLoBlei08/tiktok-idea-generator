function IdeaCard({ idea }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-purple-400">{idea.title}</h2>

      <div>
        <span className="text-xs text-gray-400 uppercase tracking-wide">Hook</span>
        <p className="mt-1 text-gray-100">"{idea.hook}"</p>
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