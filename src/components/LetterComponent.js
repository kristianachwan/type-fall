import './LetterComponent.css'

export default function LetterComponent ({id, letter, xPosition, status, setBarLength, speed}) { 
    
    
    if(status != "DISPLAYED") {
        return null;
    } else { 
        const elem = document.querySelector(`.letter-${id}`) 
        if (elem){
            elem.addEventListener('animationend', function (event) { 
                // somehow it repeates 18 times everytime this function fires, so thats why I -0.1 instead. 
                // need to be fixed 
                console.log('test')
                setBarLength((prevBarLength) => prevBarLength-0.1)
            });
        }
    
    }

    
    return (
        <h1 
            key={id} 
            style={{ 
                left: `${xPosition}vw`, 
                transformX: "translate(-50%)",
                animation: `letter-falling ${10/speed}s linear`
            }} 
            className={`letter-${id} letter`}>
            {letter}
        </h1>
    );
}

