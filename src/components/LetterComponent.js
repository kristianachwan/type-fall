import './LetterComponent.css'
import { useRef } from 'react'
function LetterComponent ({id, letter, xPosition, status, setBarLength}) { 
    
    
    if(status != "DISPLAYED") {
        return null;
    } else { 
        const elem = document.querySelector(`.letter-${id}`) 
        if (elem){
            elem.addEventListener('animationend', function (event) {
                setBarLength((prevBarLength) => prevBarLength-1)
            });
        }
    
    }

    
    return (
        <h1 key={id} style={{ left: `${xPosition}vw`, transformX: "translate(-50%)"}} className={`letter-${id} letter`} >{letter}</h1>
    );
}

export default LetterComponent;