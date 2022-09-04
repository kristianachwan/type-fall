import { useEffect, useMemo, useState } from 'react';
import './App.css';
import HealthBar from './components/HealthBar';
import { randomLetter } from './functions/randomLetter';
import { Container } from '@mui/system';
const barColorArray = [['#4caf50', '#66bb6a'], ['#ff9800', '#f57c00'], ['#bf360c', '#d84315'], [null, null]] 
const barLengthArray = [100, 60, 20, 0]  

// creating array of letters that are randomized in order (A-Z)

const arr = [] 
for(let i = 0; i<26;){
  let letter = randomLetter()
  let horizontalPos = Math.random() * 101
  if (!arr.includes(letter)){
    arr.push([letter, horizontalPos])
    i++ 
  }
}
function App() {  
 

  const [barColor, setBarColor] = useState(barColorArray[0])
  const [barLength, setBarLength] = useState(barLengthArray[1]) 
  const [counter, setCounter] = useState(30) 
  // set initially as a winning condition
  const [result, setResult] = useState('Congrats, you survive!')
  useEffect(() => {
    // for timer 
    if (counter > 0){
      setTimeout(() => setCounter(counter-1), 1000)
    }
  }, [counter])



  return (
    <div className="App">
      <div className="title-layer">
        <h1 className="title">TYPING FALL</h1> 
        {/* <h3>Can you survive in 30s?</h3> */}
        {counter > 0 ? <h1>{counter} s</h1> : <h1>{result}</h1>}

      </div>
      {/* <h1 variant="" className="letter">A</h1> */} 

      {arr && arr.map(letter => {
        return (
          <h1 variant="" style={{ left: `${letter[1]}vw`, transformX: "translate(-50%)"}} className="letter" key={letter[1]}>{letter[0]}</h1>
        ) 
      })}
      <HealthBar barColor={barColor} barLength={barLength}/>
    </div>
  );
}

export default App;



// first we want to generate letter every 1s 
// then we want to track the letter using array 
// when we are able to 'kill' the letter OR the letter damages us, remove that element 
