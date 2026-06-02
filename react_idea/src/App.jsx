import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Welcome to our first application</h1>
      <p>This is class SE1905</p>
        <form action="">
            {/* Vanilla HTML */}
            {/*<input name="" class="form-control"/>*/}

            {/* React approach -> Component -> props */}
            {/*<Input></Input>*/}
        </form>
    </>
  );
}

export default App
