import { useEffect, useRef, useState } from 'react';
import './App.css';
import HealthBar from './components/HealthBar';
import LetterComponent from './components/LetterComponent';
import { randomLetter } from './functions/randomLetter';
import { Input, Button, Modal, Box, Typography, Link } from '@mui/material';
import GitHubIcon  from '@mui/icons-material/GitHub'; 

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
    // custom speed 
    let speed = 3
    
    // for timer
    const [counter, setCounter] = useState(30)
    const [currentLetter, setCurrentLetter] = useState(0);
    const [result, setResult] = useState('Welcome')
    const [input, setInput] = useState('') 
    const [open, setOpen] = useState(true) 
    const [gameStart, setGameStart] = useState(false)
    const [showButton, setShowButton] = useState(false) 

    const handleRetry = () => { 
        
        setBarLength(100)
        setCurrentLetter(0)  
        
        // default value: the user wins the game 
        setResult('Congrats, you win!') 
        clearInterval(window.intervalId)
        
        startTimer() 
        setGameStart(true)  
        setLetters(InitializeLetters()) 
        
    } 

    const handleStart = () => {  
        startTimer() 
        setOpen(false)
        setGameStart(true) 
        // default value: the user wins the game 
        setResult('Congrats, you win!') 
        setLetters(InitializeLetters())
    } 

    var intervalId; 


    const startTimer = () => {   
        // basically cleanup function for the previous one?  
        setCounter(30)
        let i = 29  
        // for cleanup 
        intervalId = setInterval(() => {
            if(i > -1){
                setCounter(i)
                i--; 
            } else{
                clearInterval(clearInterval(intervalId))
            }
            
        } , 1000) 
        window.intervalId = intervalId

        setTimeout(() => !gameStart ? setShowButton(true) : '', 31000)
    }
    const handleStop = () => {
        setGameStart(false)
        setShowButton(true)   
        setLetters(letters.map(e => ({...e, status : "NOT_DISPLAYED"})))  
        console.log(letters) 
        setCounter(0)  
    } 

    const handleInput = (e) => {
        setInput(e.target.value)
        // delay to e.target.value afterwards to be empty \
        e.target.value=''
    }


    // start to rain when letters are initialized 
    useEffect(() => {
        if (gameStart && currentLetter < 52) {
            setTimeout(() => {
                let newLetters = letters.slice()
                newLetters[currentLetter].status = 'DISPLAYED'
                setLetters(newLetters)

                setTimeout((i = currentLetter) => {
                    if(checkStatus(i) == true) {
                        setBarLength(barLength - 20);
                    }
                }, speed * 1000);
                
                setCurrentLetter(currentLetter + 1)
            }, 500)
        }
    }, [letters])

    const checkStatus = (i) => {
        if(letters[i].status === 'DISPLAYED')
            return true;
        return false;
    }

    // event listener to 'kill' 
    useEffect(() => {
        if (gameStart) {
            let newLetters = letters.slice();
            for(let i = 0; i < newLetters.length; i++) {
                if(newLetters[i].letter === input && newLetters[i].status === 'DISPLAYED') {
                    newLetters[i].status = 'NOT_DISPLAYED'
                    break;
                }
            }
            setLetters(newLetters.slice()) 
            setInput('')
            
            console.log(input.toUpperCase()) 
        }
    }, [input, gameStart]) 
    
    useEffect(() => {
        if (barLength <= 0 || counter <=0){
            if(barLength <= 0) 
                setResult('You Lose')
            handleStop()  
        }
    }, [barLength, counter])
    // console.log(gameStart, counter); 
    
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
                <Link href="https://github.com/kristianachwan/type-fall" target="_blank">
                    <GitHubIcon />
                </Link>
                
                {/* <h3>Can you survive in 30s?</h3> */}
                {gameStart && counter > 0 ? <h1>{counter} s</h1> : 
                    (<div>
                        <h1>{result}</h1>
                        {showButton && <Button onClick={handleRetry}>Retry</Button>}
                    </div>)}
            </div>
            
            {gameStart && letters && letters.map((e, id) => (
                    <LetterComponent speed={speed} key={id} id={id} letter={e.letter} xPosition={e.pos} status={e.status} setBarLength={setBarLength} />
                ))}

            <Input 
                autoFocus
                className="input-letter"
                onChange={(e) => handleInput(e)}  
                onBlur={e => {  
                    if(gameStart)
                        e.target.focus()
                }}  
            />

            <HealthBar barColor={barColor} barLength={barLength} />
        </div>
    );
}

export default App;



// first we want to generate letter every 1s
// then we want to track the letter using array
// when we are able to 'kill' the letter OR the letter damages us, remove that element 


