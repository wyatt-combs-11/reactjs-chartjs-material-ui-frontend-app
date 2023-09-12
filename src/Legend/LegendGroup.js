import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Legend from './Legend'

export function LegendGroup ({ legendData, maxValue }) {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div
      className='Datasets-Group'
      style={{
        backgroundColor: '#152238A0'
      }}
    >
      <Button
        style={{
          color: '#FFFFFF',
          fontSize: '4vmin',
          fontWeight: 'bold',
          width: '100%',
          height: '100%',
          textTransform: 'none',
          padding: '0px'
        }}
        onClick={handleClickOpen}
      >
        See Legend
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth='100%'
        alignItems='center'
        PaperProps={{
          style: {
            backgroundColor: '#00000080',
            boxShadow: 'none'
          }
        }}
      >
        <DialogTitle fullWidth className='Legend-Title' fontWeight='bold'>
          Legend
        </DialogTitle>
        <DialogContent>
          <Box
            className='Legend-Box'
            display='flex'
            flexWrap='wrap'
            alignItems='center'
            justifyContent='center'
            overflow='hidden'
          >
            {legendData.map(data => (
              <Legend
                className='Legend'
                key={data}
                legendData={data}
                maxValue={maxValue}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              color: '#FFFFFFC0',
              fontSize: '3vw'
            }}
            onClick={handleClose}
          >
            <CloseIcon fontSize='2.5vw' />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
