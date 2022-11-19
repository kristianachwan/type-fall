import './LetterComponent.css'

export default function LetterComponent ({id, letter, xPosition, status, setBarLength, speed}) { 
    
    
    if(status != "DISPLAYED") {
        return null;
    } else { 
        const elem = document.querySelector(`.letter-${id}`) 
    
    }

    
    return (
        <h1 
            key={id} 
            style={{ 
                left: `${xPosition}vw`, 
                transformX: "translate(-50%)",
                animation: `letter-falling ${speed}s linear`
            }} 
            className={`letter-${id} letter`}>
            {letter}
        </h1>
    );
}

