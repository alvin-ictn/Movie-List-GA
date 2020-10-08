import React, { useState, useEffect } from "react";

export default function CircleGenerator(props) {
  const [pathDimension, setpathDimension] = useState(0);
  const [circleSize, setcircleSize] = useState(0);
  // const props = {
  //   percentage: 30,
  //   size: 30,
  //   text: true,
  // };

  useEffect(() => {
    setpathDimension(Math.PI * props.size * 2);
    setcircleSize(props.size * 2 + props.size * 0.15);
  });

  return (
    <div style={{position:"relative"}}>
      <svg
        width={circleSize}
        height={circleSize}
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)",position:"absolute" }}
      >
        <g>
          <title>Layer 1</title>
          <circle
            strokeDashoffset={
              1
            }
            strokeDasharray={pathDimension}
            id="circle"
            className="circle_animation"
            r={props.size}
            cy={circleSize / 2}
            cx={circleSize / 2}
            strokeWidth={props.size * 0.1}
            stroke="grey"
            fill="none"
          />
          {props.text && (
            <text
              fontSize={props.size * 0.8}
              x="50%"
              y="50%"
              dominant-baseline="middle"
              text-anchor="middle"
              fill="red"
              transform={`rotate(90 ${props.size * 1.025} ${
                props.size * 1.025
              })`}
            >
              -500
            </text>
          )}
        </g>
      </svg>
      <svg
        width={circleSize}
        height={circleSize}
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
      >
        <g>
          <title>Layer 1</title>
          <circle
            strokeDashoffset={
              pathDimension - (props.percentage / 100) * pathDimension
            }
            strokeDasharray={pathDimension}
            id="circle"
            className="circle_animation"
            r={props.size}
            cy={circleSize / 2}
            cx={circleSize / 2}
            strokeWidth={props.size * 0.15}
            stroke="#69aff4"
            fill="none"
          />
          {props.text && (
            <text
              fontSize={props.size * 0.8}
              x="50%"
              y="50%"
              dominant-baseline="middle"
              text-anchor="middle"
              fill="red"
              transform={`rotate(90 ${props.size * 1.025} ${
                props.size * 1.025
              })`}
            >
              -500
            </text>
          )}
        </g>
      </svg>
    </div>
  );
}
