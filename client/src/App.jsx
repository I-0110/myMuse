import { useState } from 'react'
import pencil from './assets/pencil.svg'
import book from './assets/book.svg' 
import construction from './assets/construction.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={book} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={pencil} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>My Muse</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Click here to start writing {count}
        </button>
        <p>
          Currently under construction. Thanks for your patience!
        </p>
      <a href="https://vite.dev" target="_blank">
        <img src={construction} className="logo" alt="Vite logo" />
      </a>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
