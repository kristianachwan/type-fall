import { useEffect, useState } from 'react';
import './App.css';
import HealthBar from './components/HealthBar';
import { randomLetter } from './functions/randomLetter';
import { Container } from '@mui/system';
const barColorArray = [['#4caf50', '#66bb6a'], ['#ff9800', '#f57c00'], ['#bf360c', '#d84315'], [null, null]] 
const barLengthArray = [100, 60, 20, 0] 
function App() {  
  const [barColor, setBarColor] = useState(barColorArray[0])
  const [barLength, setBarLength] = useState(barLengthArray[1]) 
  const [counter, setCounter] = useState(30) 
  // set initially as a winning condition
  const [result, setResult] = useState('Congrats, you survive!')
  useEffect(() => {
    if (counter > 0){
      setTimeout(() => setCounter(counter-1), 1000)
    }

  }, [counter])
  return (
    <div className="App">
      <h1 className="title">TYPING FALL</h1> 
      {/* <h3>Can you survive in 30s?</h3> */}
      {counter > 0 ? <h1>{counter} s</h1> : <h1>{result}</h1>}
      <h1 variant="" className="letter">A</h1>
      <HealthBar barColor={barColor} barLength={barLength}/>
    </div>
  );
}

export default App;



// first we want to generate letter every 1s 
// then we want to track the letter using array 
// when we are able to 'kill' the letter OR the letter damages us, remove that element 
