import {useEffect} from 'react';
import './globals.css';

function App() {
  useEffect(()=>{
    document.title = "Be with: Us!"
  }, [])

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

export default App 