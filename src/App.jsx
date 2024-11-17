import { useEffect, useState } from "react";
import "./App.css";
import Char from "./components/Char";
import { removePunction } from "./utils/utils";


const formatedSentence = removePunction(
  "Lorem ipsum dolor sit, amet consectetur"
);

function App() {
  const [count, setCount] = useState(0);
  const [end, setEnd] = useState(false);

  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  console.log("total Time:", endTime - startTime)

  const [sentence, setSentence] = useState(formatedSentence);
  const [pressedKeys, setPressedKeys] = useState([]);

  useEffect(() => {
    


    function t(key){
      


      setPressedKeys((prev) => {
        if(prev.length===0){
          console.log("time start");
          
          setStartTime(Date.now())
        }
        if(prev.length===sentence.length-1){
          setEnd(true)
          setEndTime(Date.now())
        }

        return [...prev, key];
      });

      setCount(count+1);

      
    }
    
    document.body.addEventListener("keypress", function (e) {
      const { key } = e;
      t(key)


    });

    
  }, []);

  return (
    <>
      <div className="main-text">
        {end? <>
        <p>Time taken: {(endTime-startTime) / 1000 + " Seconds"}</p> 
        </>: sentence.map((char, index) => (
          <Char
            key={char + index}
            data={char}
            index={index}
            pressed={pressedKeys}
          />
        ))}
      </div>
    </>
  );
}

export default App;
