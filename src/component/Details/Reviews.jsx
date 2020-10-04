import React, { Component } from "react";
import {
  Image,
  Badge,
  Container,
  Card,
} from "react-bootstrap";

import img from '../../images/thumbnail.jpg'
import ReactStars from "react-rating-stars-component";
import styles from './Reviews.module.css'

export default class Reviews extends Component {
  state = {
    condition: [false, false, false, false]
  }
  componentDidMount() {

  }
  ratingChanged = (e) => {
    console.log(e)
  }

  handleReview = (e) => {
    let data = this.state.condition.map(() => true)
    console.log(data)
    // this.setState({condition : !this.state.condition})
    // e.preventDefault()
    // let vae = e.target.parentNode;
    // console.log(e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[2].firstChild.firstChild)
  }

  render() {
    return (
      <section className={styles["movie--details--review"]}>
        <Container>
          <div className={styles["movie--details--review--post"]}>
            <div className={styles["movie--details--review--post--profile"]}></div>
            <div className={styles["movie--details--review--post--action"]}>
              <label
                htmlFor="name"
                className={styles["movie--details--review--post--action--name"]}
              >
                Alvin Mantovani
              </label>
              <label onClick={(e) => this.handleReview(e)}>Read</label>
              <ReactStars
                count={5}
                onChange={(e) => this.ratingChanged(e)}
                size={24}
                activeColor="#ffd700"
                isHalf={true}
              />
              <textarea className="form-control" rows="3"></textarea>
            </div>
          </div>
          <div className={styles["movie--details--review--list"]}>
            <Card
              border="primary"
              className="mb-2">
              <Card.Body className={styles["movie--details--review--list--item"]}>
                <Image roundedCircle src={img} alt="" className={styles["movie--details--review--list--item--thumbnail"]} />
                <div className={styles["movie--details--review--list--item--reviewer"]}>
                  <div className={styles["movie--details--review--list--item--reviewer--head"]}>
                    <div className="movie--details--review--list--item--reviewer--head--content">
                      <label className="movie--details--review--list--item--reviewer--head--contentusername">Brother</label>
                      <Badge>Author</Badge>
                    </div>

                    <div className={styles["movie--details--review--list--item--reviewer--head--rate"]}>
                      <ReactStars
                        count={5}
                        value={4.5}
                        size={24}
                        activeColor="#ffd700"
                        isHalf={true}
                      />
                    </div>
                  </div>
                  <Card.Text className={styles["movie--details--review--list--item--reviewer--body"]}>
                    Some quick example text to build on the card title and make up the bulk
                    of the card's content. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem doloribus omnis alias eligendi ipsam, temporibus, voluptatibus aperiam est deleniti commodi error fuga vel itaque beatae cum quaerat iusto, perferendis tempore ex iure aspernatur corporis consectetur suscipit! Consequuntur dicta accusantium dolor minima nostrum, reprehenderit in dolores, dignissimos libero minus, explicabo fugit.
                  </Card.Text>
                </div>
                {/* <Card.Title>Prem Card Tdditle </Card.Title>
                     */}

              </Card.Body>
            </Card>

          </div>
        </Container>
      </section>
    );
  }
}
