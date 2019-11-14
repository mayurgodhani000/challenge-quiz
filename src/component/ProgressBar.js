import React from 'react'

const ProgressBar = ({totalScore, overallScore, maxScore}) => (
  <div className="footer">
    <div className="overflow-auto">
      <small className="float-left">Score: {overallScore}%</small>
      <small className="float-right">Max Score: {maxScore}%</small>
    </div>
    <div className="miniBar">
      <div className="miniBarProgress black" style={{left: 0, width: `${totalScore}%`}}/>
      <div className="miniBarProgress grey" style={{left: 0, width: `${overallScore}%`}}/>
      <div className="miniBarProgress light-grey" style={{left: 0, width: `${maxScore}%`}}/>
    </div>
  </div>
)

export default ProgressBar