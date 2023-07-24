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

  // API Call
  useEffect(() => {
    axios.get("https://3pcdm3ekm2.us-east-2.awsapprunner.com/getData").then((response) => {
      setResponse(response.data.data);
      setLoading(false)
    });
  },[])

  // Button, Radio Handlers
  const updateChoice = (event) => { setChoice({name: event.target.value})};
  const increaseIndex = (event) => { setIndex((index + 1) % 3)}
  const decreaseIndex = (event) => { setIndex(((index - 1) + 3) % 3)}

  if (isLoading) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}>Loading the data {console.log("loading state")}</div>
    );
  }

  const [sumMembers, sumProducts] = sumData(response)

  return (
    <div className="App">
      <header className="App-header" display='flex'>
        <RadioGroup row onChange={updateChoice} value={choice.name} className='Radio-Group' >
          {
            Object.keys(response).map(newChoice =>
              <FormControlLabel className='Radio-Control-Label'
                key={newChoice}
                labelPlacement='top'
                value={newChoice}
                control={<Radio style={{color: 'rgba(255, 99, 132, 0.8)'}} />}
                label={
                  <Box component="div" className='Radio-Label'>
                      {newChoice}
                    </Box>
                }
              />
            )
          }
        </RadioGroup>
        <FormLabel className='Sum-Label' style={{color: 'rgba(255, 99, 132, 0.8)', fontSize: '5vmin'}}>
          {choice.name + " series"}
        </FormLabel>
        <Box display='flex' flexWrap={'wrap'} alignItems='center' justifyContent='center' >
          <IconButton value={-1} name='previous' style={{color: 'rgba(255, 99, 132, 0.8)', fontSize: '4vw'}} onClick={decreaseIndex} ><ArrowCircleLeftIcon fontSize='5vw' /></IconButton>
          <BarChart display={false}
            seriesData={response}
            seriesChoice={choice.name}
            index={index}
            chartIndex={0}
          />
          <PieChart
            seriesData={response}
            seriesChoice={choice.name}
            index={index}
            chartIndex={1}
          />
          <DoughnutChart
            seriesData={response}
            seriesChoice={choice.name}
            index={index}
            chartIndex={2}
          />
          <IconButton style={{color: 'rgba(255, 99, 132, 0.8)', fontSize: '4vw'}} onClick={increaseIndex}><ArrowCircleRightIcon fontSize='5vw' /></IconButton>
        </Box>
        <Box row className='Chart-Count' >
          <div hidden={index !== 0}><CircleIcon /></div>
          <div hidden={index === 0}><CircleOutlinedIcon /></div>
          <div hidden={index !== 1}><CircleIcon /></div>
          <div hidden={index === 1}><CircleOutlinedIcon /></div>
          <div hidden={index !== 2}><CircleIcon /></div>
          <div hidden={index === 2}><CircleOutlinedIcon /></div>
        </Box>
        <Box className='Sum-Group'>
          <FormLabel className='Sum-Label' style={{color: 'rgba(255, 99, 132, 0.8)', fontSize: '3vmin'}}>Member Count: {sumMembers}</FormLabel>
          <FormLabel className='Sum-Label' style={{color: 'rgba(255, 99, 132, 0.8)', fontSize: '3vmin'}}>Product Count: {sumProducts}</FormLabel>
        </Box>
        
      </header>
    </div>
  );
}

export default App;
