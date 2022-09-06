import { Box } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import './LetterComponent.css'

function LetterComponent ({id, letter, xPosition, status}) {
    if(status != "DISPLAYED") {
        return null;
    }
    return (
        <h1 style={{ left: `${xPosition}vw`, transformX: "translate(-50%)"}} className="letter" key={id}>{letter}</h1>
    );
}

export default LetterComponent;