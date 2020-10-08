import React, { useState, useEffect } from "react";

export default function CircleGenerator(props) {
  const [pathDimension, setpathDimension] = useState(0);
  const [circleSize, setcircleSize] = useState(0);
  const [percentage,setPercentage] = useState(0)
  const charLimit = 280;
  let size = props.size;
  const text = props.text ? props.text : false


  useEffect(() => {
    let percentageCalc = props.length / 280 * 100;
    // console.log(((charLimit - 20) / charLimit * 100) <= percentageCalc)
    percentageCalc <= 100 
    ? setPercentage(percentageCalc)
    : setPercentage(100)
  })

  useEffect(() => {
    console.log(`${circleSize} dan ${pathDimension}`)
    if(percentage >= 260/280*100) {
      setcircleSize(size * 1.2 * 2.15)
      setpathDimension(Math.PI * 1.2 * size * 2);
    }else {
      setpathDimension(Math.PI * size * 2);
      setcircleSize(size * 2.15);
    }
  });

  return (
    <div style={{position:"relative",display:"flex",justifyContent:"center",alignSelf:"center",width:"200px",height:"200px"}}>
      <svg
        width={circleSize*1}
        height={circleSize*1}
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg) scale(1)",position:"absolute",transition:"transform 0.3s" }}
      >
        <g>
          <title>Layer 1</title>
          <circle
            strokeDashoffset={
              0
            }
            strokeDasharray={pathDimension}
            id="circle"
            className="circle_animation"
            r={circleSize/2.15}
            cy={circleSize / 2}
            cx={circleSize / 2}
            strokeWidth={circleSize/2.15 * 0.1}
            stroke="grey"
            fill="none"
          />
        </g>
      </svg>
      <svg
        width={circleSize*1}
        height={circleSize*1}
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg) scale(1)",transition:"transform 0.3s" }}
      >
        <g>
          <title>Layer 1</title>
          <circle
            strokeDashoffset={
              pathDimension - (percentage  / 100) * pathDimension
            }
            strokeDasharray={pathDimension}
            id="circle"
            className="circle_animation"
            r={circleSize/2.15}
            cy={circleSize / 2}
            cx={circleSize / 2}
            strokeWidth={circleSize/2.15 * 0.15}
            stroke="#69aff4"
            fill="none"
          />
          {(text && percentage >= (charLimit - 20) / charLimit * 100) && (
            <text
              fontSize={circleSize/2.15 * 0.8}
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="red"
              transform={`rotate(90 ${circleSize/2.15 * 1.025} ${
                circleSize/2.15 * 1.025
              })`}
            >
              {charLimit - props.length}
            </text>
          )}
        </g>
      </svg>
    </div>
  );
}
