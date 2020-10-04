import React, { Component } from "react";
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

import ReactStars from "react-rating-stars-component";

export default class Reviews extends Component {

  ratingChanged = (e) => {
    console.log(e)
  }
  render() {
    return (
      <section className="movie--details--review">
        <Container>
          <div className="movie--details--review--post">
            <div className="movie--details--review--post--profile"></div>
            <div className="movie--details--review--post--action">
              <label
                htmlFor="name"
                className="movie--details--review--post--action--name"
              >
                Alvin Mantovani
              </label>
              <ReactStars
                count={5}
                onChange={(e) => this.ratingChanged(e)}
                size={24}
                activeColor="#ffd700"
                isHalf={true}
              />
              <input type="textarea"/>
            </div>
          </div>
          <div className="movie--details--review--list"></div>
        </Container>
      </section>
    );
  }
}
