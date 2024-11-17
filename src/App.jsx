import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { removePunction } from './utils/utils'
import Char from './components/Char'

function App() {
  const [count, setCount] = useState(0)

  const [sentence, setSentence] = useState([]);
  const [pressedKeys, setPressedKeys] = useState([]);
  console.log(pressedKeys);
  

  


  useEffect(() =>{
    const formatedSentence = removePunction("Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus nam incidunt iste minus voluptate quia distinctio nesciunt, tempore assumenda? Est, consequatur officia exercitationem ducimus maiores optio blanditiis aut ab odio delectus dolores eaque voluptatum illo, nemo voluptate culpa ullam mollitia voluptatem unde numquam iusto. Dolor eligendi perspiciatis mollitia ab pariatur.");
    setSentence(formatedSentence)
document.body.addEventListener("keypress", function({key}){
  setPressedKeys(prev => {
    return [...prev, key]
  })
})
  }, [])

  return (
    <>
      <div className='main-text'>        
        {sentence.map((char, index)=> <Char key={char+index} data={char} index={index} pressed={pressedKeys} />)}
      </div>
    </>
  )
}

export default App
