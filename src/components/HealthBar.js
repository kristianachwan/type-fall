import { Box } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import './HealthBar.css'
const barColorArray = [['#4caf50', '#66bb6a'], ['#ff9800', '#f57c00'], ['#bf360c', '#d84315'], [null, null]]

export default function HealthBar({barLength}) { 
  let barColor;
  if (barLength > 70)
    barColor = barColorArray[0]
  else if (barLength > 40) 
    barColor = barColorArray[1] 
  else 
    barColor = barColorArray[2]

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



