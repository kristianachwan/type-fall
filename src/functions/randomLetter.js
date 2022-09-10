export function randomLetter () {
    let charDec = parseInt(Math.random() * 26 + 65) 
    return String.fromCharCode(charDec) 
} 