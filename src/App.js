import './App.css';
import React, { useEffect, useState } from 'react';
import {RadioGroup, FormControlLabel, Radio, Box} from '@mui/material';
import BarChart from './Charts/BarChart';
import axios from 'axios';
import PieChart from './Charts/PieChart';

let some = ''

function App(props) {
  const [isLoading, setLoading] = useState(true); // Loading state
  const [response, setResponse] = useState(false)
  const [choice, setChoice] = useState({name:'Levels'})

  useEffect(() => {
    axios.get("https://3pcdm3ekm2.us-east-2.awsapprunner.com/getData").then((response) => {
      setResponse(response.data.data);
      setLoading(false)
    });
  },[])

  const updateChoice = (event) => {
    setChoice({name: event.target.value});
  };

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
  console.log('response', response)

  return (
    <div className="App">
      <header className="App-header">
        <BarChart
          seriesData={response}
          seriesChoice={choice.name}
        />
        <PieChart
          seriesData={response}
          seriesChoice={choice.name}
        />
        <div style={{margin: 50}}>
          <RadioGroup row onChange={updateChoice} value={choice.name}>
            {
              Object.keys(response).map(newChoice =>
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
