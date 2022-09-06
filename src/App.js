import { useEffect, useRef, useState } from 'react';
import './App.css';
import HealthBar from './components/HealthBar';
import LetterComponent from './components/LetterComponent';
import { randomLetter } from './functions/randomLetter';
import { Container, Input } from '@mui/material';
const barColorArray = [['#4caf50', '#66bb6a'], ['#ff9800', '#f57c00'], ['#bf360c', '#d84315'], [null, null]]


// creating array of letters that are randomized in order (A-Z)

let arr = []
for (let i = 0; i < 26;) {
    let letter = randomLetter()
    let horizontalPos = Math.random() * 90
    if (!arr.includes(letter)) {
        arr.push({ letter, pos: horizontalPos, status: 'NOT_DISPLAYED'})
        i++
    }
}
function App() {
    const [barColor, setBarColor] = useState(barColorArray[0])
    const [barLength, setBarLength] = useState(100)
    const [counter, setCounter] = useState(30)
    // set initially as a winning condition
    const [result, setResult] = useState('Congrats, you survive!')
    const [input, setInput] = useState('')
    const handleInput = (e) => {
      setInput(e.target.value) 
      e.target.value = ''
    } 


    useEffect(() => {
        // for timer 
        if (counter > 0) {
            setTimeout(() => {
                setCounter(counter - 1);
                if(30-counter > 0 && 30-counter < 26){
                  arr[30 - counter].status = 'DISPLAYED';
                }
            }, 1000)
        }

    }, [counter])

    useEffect(() => {
      arr.forEach((e, i) => {
        if (e.letter == input){
          e.status = 'NOT_DISPLAYED'
        } 

      })

    }, [input])
    


    return (
        <div className="App">
            <div className="title-layer">
                <h1 className="title">TYPING FALL</h1>
                {/* <h3>Can you survive in 30s?</h3> */}
                {counter > 0 ? <h1>{counter} s</h1> : <h1>{result}</h1>}
            </div>
            {/* <h1 variant="" className="letter">A</h1> */}

            {arr && arr.map((e, id) => {
                return (
                    <LetterComponent id={id} letter={e.letter} xPosition={e.pos} status={e.status} setBarLength={setBarLength}/>
                )
            })}
            <Input 
                autoFocus 
                className="input-letter" 
                onChange={(e) => handleInput(e)}
                onBlur={(e) => e.target.focus()}  
            />

            <HealthBar barColor={barColor} barLength={barLength}/>

        </div>
    );
}

export default App;



// first we want to generate letter every 1s
// then we want to track the letter using array
// when we are able to 'kill' the letter OR the letter damages us, remove that element 
