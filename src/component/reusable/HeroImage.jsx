import React from 'react'
import {
  Image,
} from "react-bootstrap";
import img from '../../images/jumbotron.jpg'

export default function HeroImage() {
  return (
        <Image src={img} style={{width:"100vw","max-width":"100%",margin:0,padding:0}} />
  )
}
