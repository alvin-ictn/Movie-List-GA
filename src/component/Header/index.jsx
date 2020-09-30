import React from 'react'
import Navbar from '../reusable/Navbar'
import HeroImage from '../reusable/HeroImage'
import ImgI from '../../images/user.jpg'

export default function index() {
  return (
    <header>
      <Navbar src={ImgI}/>
      <HeroImage/>
    </header>
  )
}
