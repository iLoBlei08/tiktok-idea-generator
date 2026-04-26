import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 px-8 h-16 flex items-center justify-between z-50">
      <NavLink to="/" className="text-white font-bold text-xl tracking-tight">
        🎬 TikTok Ideas
      </NavLink>
      <div className="flex items-center gap-8">
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `text-base font-semibold transition-colors ${
              isActive
                ? 'text-yellow-400'
                : 'text-gray-300 hover:text-yellow-400'
            }`
          }
        >
          ★ Saved
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `text-base font-semibold transition-colors ${
              isActive
                ? 'text-purple-400'
                : 'text-gray-300 hover:text-purple-400'
            }`
          }
        >
          History
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar