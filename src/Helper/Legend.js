import { Box } from '@mui/material';
import '../App.css';
import React from 'react'
import CircleIcon from '@mui/icons-material/Circle';

const Legend = (props) => {

    return (
        <div className='Legend'>
            {props.legendData.map((x) => {
                return (
                    <Box className='Legend-Label' key={x} display='flex' justifyContent='left' width='100%' padding='1vmin'>
                        <CircleIcon style={{color: x[2], fontSize: '2vw', padding: '2vmin'}}/>
                        <label style={{width: '80%', display: 'flex', alignItems: 'center', textAlign: 'left', position: 'relative'}}>{x[0]}</label>
                        <label style={{width: (80 * (x[1] / props.maxValue) + '%'), justifyContent: 'left', marginLeft: '-82%', backgroundColor: '#FFFFFF60', position: 'relative', borderRadius: 5}}/>
                        <label style={{width: '80%', justifyContent: 'left', marginLeft: (-80 * (x[1] / props.maxValue) + '%'), backgroundColor: '#FFFFFF10', position: 'relative', borderRadius: 5}}/>
                    </Box>
                )
            })}
        </div>
    )
}

export default Legend