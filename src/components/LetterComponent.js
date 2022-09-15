import './LetterComponent.css'
function LetterComponent ({id, letter, xPosition, status, setBarLength, speed}) { 
function LetterComponent ({id, letter, xPosition, status, setBarLength}) { 
    
    
    if(status != "DISPLAYED") {
        return null;
    } else { 
        const elem = document.querySelector(`.letter-${id}`) 
        if (elem){
            elem.addEventListener('animationend', function (event) { 
                // somehow it repeates 18 times everytime this function fires, so thats why I -0.1 instead. 
                // need to be fixed 
                setBarLength((prevBarLength) => prevBarLength-0.1)
            });
        }
    
    }

    
    return (
        <h1 
            key={id} 
            style={{ left: `${xPosition}vw`, 
                transformX: "translate(-50%)",
                animation: `letter-falling ${10/speed}s linear`
            }} 
            className={`letter-${id} letter`}>
            {letter}
        </h1>
    );
}

export default LetterComponent;