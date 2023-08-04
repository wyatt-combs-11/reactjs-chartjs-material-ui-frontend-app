import './App.css';
import React, { useEffect, useState } from 'react';
import {Box, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import {FormControl, Select, MenuItem} from '@mui/material';
import BarChart from './Charts/BarChart';
import axios from 'axios';
import PieChart from './Charts/PieChart';
import DoughnutChart from './Charts/DoughnutChart';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CloseIcon from '@mui/icons-material/Close';
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
  const [open, setOpen] = useState(false)

  // API Call
  useEffect(() => {
    axios.get("https://3pcdm3ekm2.us-east-2.awsapprunner.com/getData").then((response) => {
      setResponse(response.data.data);
      setLoading(false)
    });
  },[])

  // Button, Radio Handlers
  const updateChoice = (event) => { setChoice({name: event.target.value})};
  const increaseIndex = () => { setIndex((index + 1) % 3)};
  const decreaseIndex = () => { setIndex(((index - 1) + 3) % 3)};
  const handleClickOpen = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };

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
          <Box className='Panel' width='auto' position='fixed' top={0} left={0} padding='1vmin'>
            <div className='Datasets-Group' style={{color: '#FFFFFF', fontSize: '2vmin', fontWeight: 'bold'}}>
              <label className='Sum-Label'>Member Count</label>
              <label fullWidth style={{fontSize: '5vw'}} >{sumMembers}</label>
            </div>
            <div className='Datasets-Group' style={{color: '#FFFFFF', fontSize: '2vmin', fontWeight: 'bold'}}>
              <label className='Sum-Label'>Product Count</label>
              <label fullWidth style={{fontSize: '5vw'}} >{sumProducts}</label>
            </div>
            
              {/* <label className='Datasets-Group' style={{color: '#FFFFFF', fontSize: '2vmin', fontWeight: 'bold'}}>Product Count: {sumProducts}</label> */}
              <div className='Datasets-Group' style={{backgroundColor: '#152238A0'}}>
                <Button style={{color: '#FFFFFF', fontSize: '4vmin', fontWeight: 'bold', width: '100%', height: '100%', textTransform: 'none', padding: '0px'}} onClick={handleClickOpen}>
                  See Legend
                </Button>
                <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='100%' alignItems='center'
                  PaperProps={{
                    style: {
                      backgroundColor: '#00000080',
                      boxShadow: 'none',
                    },
                }}>
                  <DialogTitle fullWidth className='Legend-Title' fontWeight='bold'>Legend</DialogTitle>
                  <DialogContent >
                    <Box className='Legend-Box' display='flex' flexWrap='wrap' alignItems='center' justifyContent='center' overflow='hidden'>
                      {legendData.map(set =>
                        <Legend className='Legend'
                          key={set}
                          legendData={set}
                          maxValue={maxValue}
                        />
                      )}
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button style={{color: '#FFFFFFC0', fontSize: '3vw'}} onClick={handleClose}><CloseIcon fontSize='2.5vw' /></Button>
                  </DialogActions>
                </Dialog>
            </div>
          </Box>
        </Box>
        <Box className='Chart-Div' alignItems='center' justifyContent='center' height='auto'>
          <div width='20vw' >
              <FormControl className='Data-Select'>
                <Select variant='standard' disableUnderline={true} fullWidth={true} style={{color: 'white', fontSize: '3vw', fontWeight: 'bold', backgroundColor: '#00000020', borderRadius: '5px'}}
                  sx={{ '& .MuiSvgIcon-root': { color: 'white' }}}
                  value={choice.name}
                  label="Data Set"
                  onChange={updateChoice}
                >
                  {
                    Object.keys(response).map(newChoice =>
                      <MenuItem value={newChoice}>{newChoice.split(/(?=[A-Z])/).join(' ')}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
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
        </Box>
      </header>
    </div>
  );
}

export default App;
