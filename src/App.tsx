import { useState } from 'react'
import './App.css'
import { PictureZoomerSlideShow } from './components/PictureZoomerSlideShow'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <PictureZoomerSlideShow />
    </div>
  )
}

export default App
