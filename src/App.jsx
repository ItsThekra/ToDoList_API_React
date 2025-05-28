import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList_page from './pages/TodoList_page'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TodoList_page />
    </>
  )
}

export default App
