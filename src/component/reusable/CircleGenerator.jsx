import React, { useState, useEffect } from 'react';

export default function CircleGenerator(props) {
  const [pathDimension, setpathDimension] = useState(0);
  const [circleSize, setcircleSize] = useState(0);
 
  useEffect(() => {
    setpathDimension(Math.PI * props.size * 2);
    setcircleSize(props.size * 2 + props.stroke)
  })

  return (
    <svg width={circleSize} height={circleSize} xmlns="http://www.w3.org/2000/svg" style={{transform: "rotate(-90deg)"}}>
    <g>
      <title>Layer 1</title>
      <circle  stroke-dashoffset={pathDimension - (props.percentage / 100 * pathDimension)} stroke-dasharray={pathDimension} id="circle" class="circle_animation" r={props.size} cy={circleSize/2} cx={circleSize/2} stroke-width={props.stroke} stroke="#69aff4" fill="none" />
    </g>
  </svg>
  )
}
