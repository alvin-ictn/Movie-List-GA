/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{ useState, useEffect } from "react";
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


import styles from "./overview.module.css";

import { movie } from '../../database/db'

export default function Overview(props) {
  const [query] = useState(window.location.href.split('/'));

  const [data,setData] = useState()

  useEffect(() => {
    movie("search",query[query.length - 2]).then(res => setData(res.data[0]))
  },[query])

  useEffect(()=>{
    console.log(data)
  },[data])

  return (
    <section className={styles["movie--details--overview"]}>
      <Container>
        <Row>
          <Col md={4}>
            <div className="position-relative">
              {data ? <Image
                style={{ position: "relative" }}
                src={data.poster}
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
                  <a style={{ padding: "0 0px 0 5px" }}>{data && data.rating}/10</a>
                </Col>
                <Col>
                  <FaRegEye color={"#ffc107"} />
                  <a style={{ paddingLeft: "5px" }}>595218 Views</a>
                </Col>
              </Row>
              <div className={`${styles.movieStar} text-light`}>
                <FaStar size={"80"} color={"#ffc107"} />
                <a href="#" className={styles.score}>
                  {data && data.rating}
                </a>
              </div>
            </div>
            <Table>
              <tbody>
              <tr>
                <td className="font-weight-bold">Title</td>
                <td>:</td>
                <td>{data && data.title}</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Category</td>
                <td>:</td>
                <td>
                  {data && data.category.split(" ").map((item, index) => (
                    item.toLowerCase() === "action" 
                      ? <Badge key={index} variant="primary">Action</Badge>
                    : item.toLowerCase() === "thriller" 
                      ? <Badge key={index} variant="danger">Thriller</Badge> 
                    : <Badge key={index} variant="primary">Romance</Badge> 
                  ))}
                </td>
              </tr>
              <tr>
                <td className="font-weight-bold">Created Date</td>
                <td>:</td>
                <td>{data && new Date(data.createdAt).toString()}</td>
              </tr>
              </tbody>
              
            </Table>
          </Col>
          <Col md={8}>
            <h3>
              {data && data.title} <Badge variant="danger">{data && data.rating}</Badge>
            </h3>
            <p>
              {data && data.synopsis}
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
