import { Box } from '@mui/material';
import '../App.css';
import React from 'react'
import CircleIcon from '@mui/icons-material/Circle';

const Legend = (props) => {
    console.log(props.seriesData)
    let index = 0
    return (
        <div className='Legend'>
            {props.seriesData.map((x) => {
                return (
                    <Box className='Legend-Label' key={x} width='100%'>
                        <label>{x}</label>
                        <CircleIcon style={{color: props.colors[index++], fontSize: '2vw', alignItems: 'right'}}/>
                    </Box>
                )
            })}
        </div>
    )
}

export default Legend