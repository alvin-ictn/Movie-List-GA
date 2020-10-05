/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  Image,
  Table,
  Badge,
  Container,
  Col,
  Row,
} from "react-bootstrap";

import { GiStarsStack } from "react-icons/gi";
import { FaRegEye, FaStar } from "react-icons/fa";

import Img from "../../images/poster.jpg";
import styles from "./overview.module.css";

export default function Overview(props) {
  console.log(props)
  return (
    <section className={styles["movie--details--overview"]}>
      <Container>
        <Row>
          <Col md={4}>
            <div className="position-relative">
              <Image
                style={{ position: "relative" }}
                src={`https://image.tmdb.org/t/p/w1280/${props.poster_path}` || Img}
                fluid
                thumbnail
              />
              <Row className={`${styles.movieheadline} text-light`}>
                <Col>
                  <a style={{ paddingRight: "5px" }}>Rating :</a>{" "}
                  <GiStarsStack color={"#ffc107"} />
                  <a style={{ padding: "0 0px 0 5px" }}>8/10</a>
                </Col>
                <Col>
                  <FaRegEye color={"#ffc107"} />
                  <a style={{ paddingLeft: "5px" }}>99999 Views</a>
                </Col>
              </Row>
              <div className={`${styles.movieStar} text-light`}>
                <FaStar size={"80"} color={"#ffc107"} />
                <a href="#" className={styles.score}>
                  6.2
                </a>
              </div>
            </div>
            <Table>
              <tbody>
              <tr>
                <td className="font-weight-bold">Actors</td>
                <td>:</td>
                <td>BB</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Category</td>
                <td>:</td>
                <td>
                  <Badge variant="primary">Action</Badge>{" "}
                  <Badge variant="secondary">Drama</Badge>{" "}
                  <Badge variant="success">Animation</Badge>{" "}
                  <Badge variant="danger">Horror</Badge>{" "}
                </td>
              </tr>
              <tr>
                <td className="font-weight-bold">Release Date</td>
                <td>:</td>
                <td>20 September 2090</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Duration</td>
                <td>:</td>
                <td>24 mins</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Total Episode</td>
                <td>:</td>
                <td>100 episodes</td>
              </tr>
              </tbody>
              
            </Table>
          </Col>
          <Col md={8}>
            <h4>||original-title||</h4>
            <h3>
              Spider-Man 3 <Badge variant="danger">18+</Badge>
            </h3>
            <h4>||overview||</h4>
            <p>
              The seemingly invincible Spider-Man goes up against an all-new
              crop of villains—including the shape-shifting Sandman. While
              Spider-Man’s superpowers are altered by an alien organism, his
              alter ego, Peter Parker, deals with nemesis Eddie Brock and also
              gets caught up in a love triangle.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
