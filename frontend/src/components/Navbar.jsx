import { useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  function isActive(path) {
    return location.pathname === path
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-6 py-3 flex justify-around items-center z-50">
      <button
        onClick={() => navigate('/')}
        className={`flex flex-col items-center gap-1 text-xs transition-colors ${isActive('/') ? 'text-purple-400' : 'text-gray-500 hover:text-gray-300'}`}
      >
        <span className="text-xl">✦</span>
        Generate
      </button>
      <button
        onClick={() => navigate('/saved')}
        className={`flex flex-col items-center gap-1 text-xs transition-colors ${isActive('/saved') ? 'text-yellow-400' : 'text-gray-500 hover:text-gray-300'}`}
      >
        <span className="text-xl">★</span>
        Saved
      </button>
      <button
        onClick={() => navigate('/history')}
        className={`flex flex-col items-center gap-1 text-xs transition-colors ${isActive('/history') ? 'text-purple-400' : 'text-gray-500 hover:text-gray-300'}`}
      >
        <span className="text-xl">◷</span>
        History
      </button>
    </nav>
  )
}

export default Navbar