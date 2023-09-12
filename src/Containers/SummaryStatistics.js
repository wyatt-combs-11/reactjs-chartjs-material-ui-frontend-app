import React from 'react'
export function SummaryStatistics ({ sumMembers, sumProducts }) {
  return (
    <React.Fragment>
      <div
        className='Datasets-Group'
        style={{
          color: '#FFFFFF',
          fontSize: '2vmin',
          fontWeight: 'bold'
        }}
      >
        <label className='Sum-Label'>Member Count</label>
        <label
          style={{
            fontSize: '5vw'
          }}
        >
          {sumMembers}
        </label>
      </div>
      <div
        className='Datasets-Group'
        style={{
          color: '#FFFFFF',
          fontSize: '2vmin',
          fontWeight: 'bold'
        }}
      >
        <label className='Sum-Label'>Product Count</label>
        <label
          style={{
            fontSize: '5vw'
          }}
        >
          {sumProducts}
        </label>
      </div>
    </React.Fragment>
  )
}
