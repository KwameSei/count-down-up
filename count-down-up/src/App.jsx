import { useState } from 'react'
import Display from './components/home/Display.jsx';
import { Routes, Route } from 'react-router-dom';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Display />} />
      </Routes>
    </div>
  )
}

export default App
