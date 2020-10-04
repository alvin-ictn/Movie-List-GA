import React from 'react'
import {
  Image,
} from "react-bootstrap";
import img from '../../images/jumbotron.jpg'

export default function HeroImage(props) {
  return (
        <Image src={props.src || img} style={{width:"100vw",maxWidth:"100%",margin:0,padding:0}} />
  )
}
