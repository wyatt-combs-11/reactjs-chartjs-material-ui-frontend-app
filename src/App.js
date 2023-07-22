import './App.css';
import React, { useState } from 'react';
import {RadioGroup, FormControlLabel, Radio, Box} from '@mui/material';
import BarChart from './BarChart';

function App() {
  const jsonData = require('./intern_project_data.json')
  const [choice, setChoice] = useState({name:'Levels'})
  const data = jsonData.data

  const updateChoice = (event) => {
    setChoice({name: event.target.value});
  };

  return (
    <div className="App">
      <header className="App-header">
        <Box row>
          <BarChart
            seriesData={{data}}
            seriesChoice={{choice}}
          />
          <BarChart
            seriesData={{data}}
            seriesChoice={{choice}}
          />
        </Box>
        <div style={{margin: 50}}>
          <RadioGroup row onChange={updateChoice} value={choice.name}>
            {
              Object.keys(data).map(newChoice =>
                <FormControlLabel
                  key={newChoice}
                  labelPlacement='top'
                  value={newChoice}
                  control={<Radio />}
                  label={newChoice}
            />
              )
            }
          </RadioGroup>
        </div>
      </header>
    </div>
  );
}

export default App;
