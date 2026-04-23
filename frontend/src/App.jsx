import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Generator from './pages/Generator'
import Results from './pages/Results'
import Saved from './pages/Saved'
import History from './pages/History'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Generator />} />
        <Route path="/results" element={<Results />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App