import { useEffect, useRef, useState } from 'react';
import './App.css';
import HealthBar from './components/HealthBar';
import LetterComponent from './components/LetterComponent';
import { randomLetter } from './functions/randomLetter';

import { Input, Button, Modal, Box, Typography } from '@mui/material';

const barColorArray = [['#4caf50', '#66bb6a'], ['#ff9800', '#f57c00'], ['#bf360c', '#d84315'], [null, null]]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }; 


// creating array of letters that are randomized 
const InitializeLetters = () => {
    let initLetters = [] 
    // by default we initialize 52 letters 
    for (let i = 0; i < 52; i++) {
        let letter = randomLetter()
        let horizontalPos = Math.random() * 90
        initLetters.push({ letter, pos: horizontalPos, status: 'NOT_DISPLAYED' })
    }
    return initLetters
}

function App() {
    const [letters, setLetters] = useState([])

    // speed variable. Bigger = faster
    let speed = 1;     

  
    const [barColor, setBarColor] = useState(barColorArray[0]) 
    const [barLength, setBarLength] = useState(100) 
    // for timer
    const [counter, setCounter] = useState(30)
    const [currentLetter, setCurrentLetter] = useState(0);
    const [result, setResult] = useState('Welcome')
    const [input, setInput] = useState('') 
    const [open, setOpen] = useState(true) 
    const [gameStart, setGameStart] = useState(false)

    const handleStart = () => {  
        setCounter(30)
        startTimer() 
        setOpen(false)
        setGameStart(true) 
        // default value: the user wins the game 
        setResult('Congrats, you win!')

    } 

    const handleStop = () => {
        setGameStart(false)
        setResult('You lose') 
            
    } 

    const startTimer = () => { 
        for(let i = 30; i--; i>=0){
            setTimeout(() => 
                setCounter(i)
            , (30-i)*1000)
        }   
    }


    const handleInput = (e) => {
        setInput(e.target.value)
        console.log(e.target.value)
        // delay to e.target.value afterwards to be empty 
        setTimeout(() => e.target.value='', 10)
    }

    useEffect(() => {
        if (!letters.length) {
            setLetters(InitializeLetters())
        }
    }, [gameStart])


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
            <Modal
            open={open} // open state 
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    
                    </Typography>
                    <Button onClick={handleStart}>Start the game</Button>
                </Box>
            </Modal>
            <div className="title-layer">
                <h1 className="title">TYPING FALL</h1>
                {/* <h3>Can you survive in 30s?</h3> */}
                {gameStart ? <h1>{counter} s</h1> : 
                    (<div>
                        <h1>{result}</h1>
                        {/* <Button onClick={handleStart}>Retry</Button> */}
                        {/* HandleStart should be generalized for retry  */} 
                        
                    </div>)}
            </div>
        
            {letters && letters.map((e, id) => {
                return (
                    <LetterComponent 
                        id={id} 
                        letter={e.letter} 
                        xPosition={e.pos} 
                        status={e.status} 
                        setBarLength={setBarLength} 
                        speed={speed}
                    />
                )
            })}

            <Input
                autoFocus
                className="input-letter"
                onChange={(e) => handleInput(e)}
            />

            <HealthBar barLength={barLength} />

        </div>
    );
}

export default App;



// first we want to generate letter every 1s
// then we want to track the letter using array
// when we are able to 'kill' the letter OR the letter damages us, remove that element 


// note: 
// laggy timer in the first counter 