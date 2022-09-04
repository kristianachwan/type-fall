export function randomLetter () {
    // note that capital letters in ASCII range from 65-90 

    const charDec = parseInt(Math.random() * 27 + 65) 
    return String.fromCharCode(charDec)
     



} 