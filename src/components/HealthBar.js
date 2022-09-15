import { Box } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import './HealthBar.css'
export default function HealthBar({barColor, barLength}) {
  
  return (    
    <Box className="health-bar"  
        maxWidth="90vw"
        sx={{
            width: `${barLength}%`,
            height: 75,
            borderRadius: 1, 
            backgroundColor: barColor[0],
            '&:hover': {
            backgroundColor: barColor[1],
            opacity: [0.9, 0.8, 0.7],
            },
        }}
    />
    
  )
}
