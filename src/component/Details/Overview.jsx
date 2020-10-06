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
              {props.poster_path ? <Image
                style={{ position: "relative" }}
                src={`https://image.tmdb.org/t/p/w500/${props.poster_path}` || Img}
                fluid
                thumbnail
              /> : <Image style={{ position: "relative" }}
              src={`data:image/svg+xml;charset=UTF-8,<svg%20width%3D"500"%20height%3D"750"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20viewBox%3D"0%200%2050%2075"%20preserveAspectRatio%3D"none"><defs><style%20type%3D"text%2Fcss">%23holder_174fcf1a1bf%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20<%2Fstyle><%2Fdefs><g%20id%3D"holder_174fcf1a1bf"><rect%20width%3D"50"%20height%3D"75"%20fill%3D"%23373940"><%2Frect><g><text%20x%3D"6"%20y%3D"45">Poster<%2Ftext><%2Fg><%2Fg><%2Fsvg>`}
              fluid
              thumbnail/>}
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
