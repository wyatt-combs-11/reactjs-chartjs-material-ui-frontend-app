import './App.css';
import React, { useEffect, useState } from 'react';
import {RadioGroup, FormControlLabel, Radio, Box, FormLabel, IconButton} from '@mui/material';
import BarChart from './Charts/BarChart';
import axios from 'axios';
import PieChart from './Charts/PieChart';
import DoughnutChart from './Charts/DoughnutChart';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Legend from './Helper/Legend';
import ColorGenerator from './Helper/ColorGenerator';

function sumData(data) {
  let sumMembers = 0
  data.Levels.YData.map((member) => {
    sumMembers += member
    return 0
  });
  return [sumMembers, data.CurrentProducts.XData.length]
}

function App(props) {
  // set app states
  const [isLoading, setLoading] = useState(true); // Loading state
  const [response, setResponse] = useState(false)
  const [choice, setChoice] = useState({name:'Levels'})
  const [index, setIndex] = useState(0)
  const [colors] = useState(ColorGenerator.returnColors())

  // API Call
  useEffect(() => {
    axios.get("https://3pcdm3ekm2.us-east-2.awsapprunner.com/getData").then((response) => {
      setResponse(response.data.data);
      setLoading(false)
    });
  },[])

  // Button, Radio Handlers
  const updateChoice = (event) => { setChoice({name: event.target.value})};
  const increaseIndex = () => { setIndex((index + 1) % 3)}
  const decreaseIndex = () => { setIndex(((index - 1) + 3) % 3)}

  if (isLoading) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>Loading the data {console.log("loading state")}</div>
    );
  }

  // Sort current data by YValue and push in tuples
  const seriesData = response[choice.name]
  const xData = seriesData.XData
  const yData = seriesData.YData
  const series = []
  for (let i = 0; i < xData.length; i++) {
      series.push([xData[i], yData[i], colors[i]])
  }
  series.sort(function(a, b) { return b[1] - a[1]; })
  const maxValue = series[0][1]

  // Make three equal length arrays (or close to) for three column legend
  const [sumMembers, sumProducts] = sumData(response)
  const size = Math.ceil(series.length / 3);
  const legendData = Array.from({ length: 3 }, (v, i) => series.slice(i * size, i * size + size))
  // const legendData = series.slice(0, 10)

  return (
    <div className="App" >
      <header className="App-header" display='flex'>
        <Box>
          <RadioGroup row={true} onChange={updateChoice} value={choice.name} className='Datasets-Group' >
            {
              Object.keys(response).map(newChoice =>
                <FormControlLabel className='Radio-Control-Label'
                  key={newChoice}
                  labelPlacement='top'
                  value={newChoice}
                  control={<Radio style={{color: '#FFFFFF'}} />}
                  label={
                    <Box component="div" className='Dataset-Label'>
                        {newChoice}
                      </Box>
                  }
                />
              )
            }
          </RadioGroup>
        </Box>
        {/* <FormLabel className='Series-Label' style={{ fontSize: '5vmin', padding: '1vmin 4vmin 1vmin 4vmin', margin: '3vmin', color: '#FFFFFF'}}>
          {choice.name + " series"}
        </FormLabel> */}
        <Box row display='flex' flexWrap='wrap' alignItems='center' justifyContent='center' height='auto' width='100%'>
          <Box className='Chart-Group'>
            <Box display='flex' flexWrap='wrap' alignItems='center' justifyContent='center'>
              <IconButton value={-1} name='previous' style={{color: '#FFFFFF80', fontSize: '4vw'}} onClick={decreaseIndex} ><ArrowCircleLeftIcon fontSize='5vw' /></IconButton>
              <BarChart display={false}
                seriesData={response}
                seriesChoice={choice.name}
                index={index}
                chartIndex={0}
                colors={colors}
              />
              <PieChart
                seriesData={response}
                seriesChoice={choice.name}
                index={index}
                chartIndex={1}
                colors={colors}
              />
              <DoughnutChart
                seriesData={response}
                seriesChoice={choice.name}
                index={index}
                chartIndex={2}
                colors={colors}
              />
              <IconButton style={{color: '#FFFFFF80', fontSize: '4vw'}} onClick={increaseIndex}><ArrowCircleRightIcon fontSize='5vw' /></IconButton>
            </Box>
            <Box className='Chart-Count'>
              <div hidden={index !== 0}><CircleIcon fontSize='2vw'/></div>
              <div hidden={index === 0}><CircleOutlinedIcon fontSize='2vw'/></div>
              <div hidden={index !== 1}><CircleIcon fontSize='2vw'/></div>
              <div hidden={index === 1}><CircleOutlinedIcon fontSize='2vw'/></div>
              <div hidden={index !== 2}><CircleIcon fontSize='2vw'/></div>
              <div hidden={index === 2}><CircleOutlinedIcon fontSize='2vw'/></div>
            </Box>
          </Box>
        
          <Box className='Legend-Box' display='flex' flexWrap='wrap' alignItems='center' justifyContent='center'>
          {legendData.map(set =>
            <Legend className='Legend'
              key={set}
              legendData={set}
              maxValue={maxValue}
            />
          )}
          </Box>
        </Box>

        <Box className='Sum-Group'>
          <FormLabel className='Sum-Label' style={{color: '#FFFFFF', fontSize: '3vmin', fontWeight: 'bold'}}>Member Count: {sumMembers}</FormLabel>
          <FormLabel className='Sum-Label' style={{color: '#FFFFFF', fontSize: '3vmin', fontWeight: 'bold'}}>Product Count: {sumProducts}</FormLabel>
        </Box>
        
      </header>
    </div>
  );
}

export default App;
