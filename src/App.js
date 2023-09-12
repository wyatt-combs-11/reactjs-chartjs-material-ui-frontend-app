import { SummaryStatistics } from './Containers/SummaryStatistics'
import { ChartGroup } from './Containers/ChartGroup'
import { LoadingScreen } from './Containers/LoadingScreen'
import { LegendGroup } from './Legend/LegendGroup'
import './css/App.css'
import React, { useEffect, useState } from 'react'
import { Box, FormControl, Select, MenuItem } from '@mui/material'
import axios from 'axios'
import ColorGenerator from './Utils/ColorGenerator'
import LegendDataUtils from './Utils/LegendDataUtils'

function App (props) {
  // set app states
  const [isLoading, setLoading] = useState(true) // Loading state
  const [response, setResponse] = useState(false)
  const [choice, setChoice] = useState('Levels')
  const [colors] = useState(ColorGenerator.returnColors())

  // API Call
  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_ENDPOINT).then(response => {
      setResponse(response.data.data)
      setLoading(false)
    })
  }, [])

  // Button, Radio Handlers
  const updateChoice = event => {
    setChoice(event.target.value)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  // Sort current data by YValue and push in tuples
  const seriesData = response[choice]
  const [series, maxValue] = LegendDataUtils.sortLegendData(seriesData, colors)

  // Make three equal length arrays (or close to) for three column legend
  const [sumMembers, sumProducts] = LegendDataUtils.sumData(response)
  const size = Math.ceil(series.length / 3)
  const legendData = Array.from({ length: 3 }, (v, i) =>
    series.slice(i * size, i * size + size)
  )

  return (
    <div className='App'>
      <header className='App-header' display='flex'>
        <Box>
          <Box
            className='Panel'
            width='auto'
            position='fixed'
            top={0}
            left={0}
            padding='1vmin'
          >
            <SummaryStatistics
              sumMembers={sumMembers}
              sumProducts={sumProducts}
            />
            <LegendGroup legendData={legendData} maxValue={maxValue} />
          </Box>
        </Box>
        <Box
          className='Chart-Div'
          alignItems='center'
          justifyContent='center'
          height='auto'
        >
          <div width='20vw'>
            <FormControl className='Data-Select'>
              <Select
                variant='standard'
                disableUnderline={true}
                fullWidth={true}
                style={{
                  color: 'white',
                  fontSize: '3vw',
                  fontWeight: 'bold',
                  backgroundColor: '#00000020',
                  borderRadius: '5px'
                }}
                sx={{ '& .MuiSvgIcon-root': { color: 'white' } }}
                value={choice}
                label='Data Set'
                onChange={updateChoice}
              >
                {Object.keys(response).map(newChoice => (
                  <MenuItem key={newChoice} value={newChoice}>
                    {newChoice.split(/(?=[A-Z])/).join(' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <ChartGroup choice={choice} response={response} colors={colors} />
        </Box>
      </header>
    </div>
  )
}

export default App
