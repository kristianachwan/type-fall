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

