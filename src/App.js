import { useState } from 'react';
import './App.css';
import HealthBar from './components/HealthBar';
import { randomLetter } from './functions/randomLetter';
import { Container } from '@mui/system';
const barColorArray = [['#4caf50', '#66bb6a'], ['#ff9800', '#f57c00'], ['#bf360c', '#d84315'], [null, null]] 
const barLengthArray = [100, 60, 20, 0] 
function App() {  
  const [barColor, setBarColor] = useState(barColorArray[0])
  const [barLength, setBarLength] = useState(barLengthArray[1]) 
  return (
    <div className="App">
      <h1 className="title">TYPING FALL</h1>
      <HealthBar barColor={barColor} barLength={barLength}/>
    </div>
  );
}

export default App;



// first we want to generate letter every 1s 
// then we want to track the letter using array 
// when we are able to 'kill' the letter OR the letter damages us, remove that element 
