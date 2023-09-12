import React, { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import BarChart from '../Charts/BarChart'
import PieChart from '../Charts/PieChart'
import DoughnutChart from '../Charts/DoughnutChart'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import CircleIcon from '@mui/icons-material/Circle'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'

export function ChartGroup ({ choice, response, colors }) {
  const [index, setIndex] = useState(0)
  const increaseIndex = () => {
    setIndex((index + 1) % 3)
  }
  const decreaseIndex = () => {
    setIndex((index - 1 + 3) % 3)
  }

  return (
    <Box className='Chart-Group'>
      <Box
        display='flex'
        flexWrap='wrap'
        alignItems='center'
        justifyContent='center'
      >
        <IconButton
          value={-1}
          name='previous'
          style={{
            color: '#FFFFFF80',
            fontSize: '4vw'
          }}
          onClick={decreaseIndex}
        >
          <ArrowCircleLeftIcon fontSize='5vw' />
        </IconButton>
        <BarChart
          display={false}
          seriesData={response}
          seriesChoice={choice}
          index={index}
          chartIndex={0}
          colors={colors}
        />
        <PieChart
          seriesData={response}
          seriesChoice={choice}
          index={index}
          chartIndex={1}
          colors={colors}
        />
        <DoughnutChart
          seriesData={response}
          seriesChoice={choice}
          index={index}
          chartIndex={2}
          colors={colors}
        />
        <IconButton
          style={{
            color: '#FFFFFF80',
            fontSize: '4vw'
          }}
          onClick={increaseIndex}
        >
          <ArrowCircleRightIcon fontSize='5vw' />
        </IconButton>
      </Box>
      <Box className='Chart-Count'>
        <div hidden={index !== 0}>
          <CircleIcon fontSize='2vw' />
        </div>
        <div hidden={index === 0}>
          <CircleOutlinedIcon fontSize='2vw' />
        </div>
        <div hidden={index !== 1}>
          <CircleIcon fontSize='2vw' />
        </div>
        <div hidden={index === 1}>
          <CircleOutlinedIcon fontSize='2vw' />
        </div>
        <div hidden={index !== 2}>
          <CircleIcon fontSize='2vw' />
        </div>
        <div hidden={index === 2}>
          <CircleOutlinedIcon fontSize='2vw' />
        </div>
      </Box>
    </Box>
  )
}
