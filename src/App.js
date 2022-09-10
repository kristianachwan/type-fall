import { useEffect, useRef, useState } from 'react';
import './App.css';
import HealthBar from './components/HealthBar';
import LetterComponent from './components/LetterComponent';
import { randomLetter } from './functions/randomLetter';
import { Container, Input } from '@mui/material';
const barColorArray = [['#4caf50', '#66bb6a'], ['#ff9800', '#f57c00'], ['#bf360c', '#d84315'], [null, null]]


// creating array of letters that are randomized in order (A-Z)

const InitializeLetters = () => {
    let initLetters = []
    for (let i = 0; i < 52; i++) {
        let letter = randomLetter()
        let horizontalPos = Math.random() * 90
        initLetters.push({ letter, pos: horizontalPos, status: 'NOT_DISPLAYED' })
    }
    return initLetters
}

function App() {
    const [letters, setLetters] = useState([])
    const [barColor, setBarColor] = useState(barColorArray[0])
    const [barLength, setBarLength] = useState(100)
    const [counter, setCounter] = useState(30)
    const [currentLetter, setCurrentLetter] = useState(0);
    const [result, setResult] = useState('Congrats, you survive!')
    const [input, setInput] = useState('')
    const handleInput = (e) => {
        setInput(e.target.value)
        e.target.value = ''
    }

    useEffect(() => {
        if (!letters.length) {
            setLetters(InitializeLetters())
        }
    })

    useEffect(() => {
        if (counter > 0) {
            setTimeout(() => {
                setCounter(counter - 1);
            }, 1000);
        }
    }, [counter])

    useEffect(() => {
        if (currentLetter < 52) {
            setTimeout(() => {
                let newLetters = letters.slice()
                newLetters[currentLetter].status = 'DISPLAYED'
                setLetters(newLetters)
                setCurrentLetter(currentLetter + 1)
            }, 500)
        }
    })

    useEffect(() => {
        if (input) {
            let newLetters = letters.slice();
            for(let i = 0; i < newLetters.length; i++) {
                if(newLetters[i].letter === input.toUpperCase() && newLetters[i].status === 'DISPLAYED') {
                    newLetters[i].status = 'NOT_DISPLAYED'
                    break;
                }
            }
            setLetters(newLetters.slice())
            setInput('')
            console.log(input.toUpperCase())
        }
    }, [input])



    return (
        <div className="App">
            <div className="title-layer">
                <h1 className="title">TYPING FALL</h1>
                {/* <h3>Can you survive in 30s?</h3> */}
                {counter > 0 ? <h1>{counter} s</h1> : <h1>{result}</h1>}
            </div>
            {/* <h1 variant="" className="letter">A</h1> */}

            {letters && letters.map((e, id) => {
                return (
                    <LetterComponent id={id} letter={e.letter} xPosition={e.pos} status={e.status} setBarLength={setBarLength} />
                )
            })}
            <Input
                autoFocus
                className="input-letter"
                onChange={(e) => handleInput(e)}
                onBlur={(e) => e.target.focus()}
            />

            <HealthBar barColor={barColor} barLength={barLength} />

        </div>
    );
}

export default App;



// first we want to generate letter every 1s
// then we want to track the letter using array
// when we are able to 'kill' the letter OR the letter damages us, remove that element 
