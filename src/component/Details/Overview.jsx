import React from "react";
import {
  Navbar,
  Form,
  FormControl,
  Image,
  Table,
  Badge,
  Container,
  Col,
  Row,
} from "react-bootstrap";

import { GiStarsStack } from 'react-icons/gi';
import { FaRegEye,FaStar } from 'react-icons/fa'
import { IoIosStarOutline } from 'react-icons/io'
import Img from "../../images/poster.jpg";
import styles from './overview.module.css'

export default function Overview() {
  return (
    <section className="movie--details--overview">
      <Container>
        <Row>
          <Col md={4}>
            <div className="position-relative">
              <Image style={{position:"relative"}} src={Img} fluid thumbnail className="mb-3 mt-3" />
              <div className={`${styles.movieheadline} text-light`}>
                <a style={{paddingRight:"10px"}}>Rating :</a> <GiStarsStack color={"#ffc107"}/><a  style={{padding:"0 30px 0 10px"}}>8/10</a><FaRegEye color={"#ffc107"}/><a style={{paddingLeft: "5px"}}>99999 Views</a>
              </div>
              <div className={`${styles.movieStar} text-light`}>
               <FaStar size={"80"}  color={"#ffc107"}/>
               <a href="#" className={styles.score}>6.2</a>
              </div>
            </div>
            <Row className="position-relative">
              <Col lg={4}>
                <p className="font-weight-bold">Ti</p>
              </Col>
              <Col lg={1}>
                <p className="font-weight-bold">:</p>
              </Col>
              <Col lg={7}>55</Col>
            </Row>

          </Col>
          <Col md={8}>
          <h4>||original-title||</h4>
            <h3>
            Spider-Man 3 <Badge variant="danger">18+</Badge>
            </h3>
            <h4>||overview||</h4> 
            <p>
            The seemingly invincible Spider-Man goes up against an all-new crop of villains—including the shape-shifting Sandman. While Spider-Man’s superpowers are altered by an alien organism, his alter ego, Peter Parker, deals with nemesis Eddie Brock and also gets caught up in a love triangle.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
