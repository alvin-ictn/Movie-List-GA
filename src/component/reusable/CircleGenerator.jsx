import React, { useState, useEffect } from "react";

export default function CircleGenerator(props) {
  const [pathDimension, setpathDimension] = useState(0);
  const [circleSize, setcircleSize] = useState(0);
  const [percentage,setPercentage] = useState(0);
  const [scale, setScale] = useState(1)
  const charLimit = 280;
  let size = props.size;
  const text = props.text ? props.text : false

  useEffect(() => {
    let percentageCalc = props.length / charLimit * 100;
    if((percentage >= (charLimit - 20) / charLimit * 100)) {
      setScale(1.5)
    }else {
      setScale(1)
    }
    percentageCalc <= 100 
    ? setPercentage(percentageCalc)
    : setPercentage(100)
  },[percentage, props])

  useEffect(() => {
    setpathDimension(Math.PI * size * 2);
    setcircleSize(size * 2.15);
  },[size]);

  return (
    <div style={{position:"relative"}}>
      <svg
        width={circleSize}
        height={circleSize}
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `scale(${scale}) rotate(-90deg)`,position:"absolute",transition:"transform 0.2s" }}
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
            r={size}
            cy={circleSize / 2}
            cx={circleSize / 2}
            strokeWidth={size * 0.1}
            stroke="grey"
            fill="none"
          />
        </g>
      </svg>
      <svg
        width={circleSize}
        height={circleSize}
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `scale(${scale}) rotate(-90deg)`,transition:"transform 0.2s" }}
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
            r={size}
            cy={circleSize / 2}
            cx={circleSize / 2}
            strokeWidth={size * 0.15}
            stroke="#69aff4"
            fill="none"
          />
          {(text && percentage >= (charLimit - 20) / charLimit * 100) && (
            <text
              fontSize={size * 0.8}
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="red"
              transform={`rotate(90 ${size * 1.025} ${
                size * 1.025
              })`}
            >
              {charLimit - props.length}
            </text>

            //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          )}
        </g>
      </svg>
    </div>
  );
}
