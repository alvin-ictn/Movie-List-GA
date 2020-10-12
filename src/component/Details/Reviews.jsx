import React, { useState, useEffect } from "react";
import {
  Image,
  Badge,
  Container,
  Card,
  Col,
  Row
} from "react-bootstrap";

import { user, movie, review } from '../../database/db'
import img from '../../images/thumbnail.jpg'
import ReactStars from "react-rating-stars-component";
import styles from './Reviews.module.css'
import Circle from '../../component/reusable/CircleGenerator'


export default function Reviews(){
  const [query] = useState(window.location.href.split('/'));

  const [chara,setChara] = useState(0);

  const [userData, setUser] = useState();

  const [dataMovie,setMovie] = useState();

  const [reviw, setReviews] = useState();

  const [filterReview, setReview] = useState();

  const [pReview,setPost] = useState()

  const url = "https://warm-bastion-18573.herokuapp.com";
 
  useEffect(() => {
    user("detail",null,localStorage.getItem('token')).then(res => setUser({...res.data}))
    movie("search",query[query.length - 2]).then(res => setMovie(res.data[0]))
    review("all",localStorage.getItem('token')).then(res => setReviews([...res.data]))
  },[query])

  useEffect(() => {
    if(reviw && dataMovie) {
      let dataReview = reviw.filter(item => item.MovieId === dataMovie.id)
      setReview(dataReview)
      console.log(dataReview)
      console.log(userData && userData.users)
    }
  },[dataMovie, reviw])

  useEffect(() => {
    console.log(pReview)
  },[pReview])

  const ratingChanged = (e) => {
    setPost({...pReview,"rating" : e})
  }

  const handleInput = (e) => {
    setChara(e.target.value.length)
    setPost({...pReview, "content" : e.target.value.slice(0,280)})
  }

  const pressIt = (e) => {
    if(e.ctrlKey && e.which === 13){
      if(pReview && dataMovie) review("post",pReview,localStorage.getItem('token'),dataMovie.id).then(res => {
        if(res.status === 200 || res.status === 201){
          setPost({})
        }else {
          console.error(res.data.msg)
        }
      })
    }
  }

  return (
    <section className={styles["movie--details--review"]}>
      <Container>
        <div className={styles["movie--details--review--post"]}>
          <div className={styles["movie--details--review--post--profile"]}></div>
          <div className={styles["movie--details--review--post--action"]}>
            <Row>
              <Col>
                <label
                  htmlFor="name"
                  className={styles["movie--details--review--post--action--name"]}
                >
                  Alvin Mantovani
                </label>
                <ReactStars
                  count={5}
                  onChange={(e) => ratingChanged(e)}
                  size={24}
                  activeColor="#ffd700"
                  isHalf={true}
                />
              </Col>
              <Col> </Col>
            </Row>
              
            </div>
            <Row>
              <Col sm={10} className={styles.textBox}>
                <textarea onKeyPress={(e) => pressIt(e)} onChange={(e) => handleInput(e)}className="form-control" rows="3"></textarea></Col>
              <Col sm={2} className={`${styles.circleE} align-self-center text-right`}><Circle length={chara} size={30} text/></Col>
            </Row>
          
        </div>
        <div className={styles["movie--details--review--list"]}>
          {filterReview && filterReview.map( item => (
            <Card key={item.id}
              border="primary"
              className="mb-2">
              <Card.Body className={styles["movie--details--review--list--item"]}>
                <Image roundedCircle src={`
                ${(item.user.image.match(/^(http|https):/) && item.user.image.match(/(jpg|png)$/)) 
                  ? item.user.image 
                  : item.user.image.match(/^(http|https):/) 
                  ? `${item.user.image}.png`
                  : `${url}/${item.user.image}`}`
                } alt="" className={styles["movie--details--review--list--item--thumbnail"]} />
                <div className={styles["movie--details--review--list--item--reviewer"]}>
                  <div className={styles["movie--details--review--list--item--reviewer--head"]}>
                    <div className="movie--details--review--list--item--reviewer--head--content">
                      <label className="movie--details--review--list--item--reviewer--head--contentusername">{item.user.name}</label>
                    </div>
                    <div className={styles["movie--details--review--list--item--reviewer--head--rate"]}>
                      <ReactStars
                        count={5}
                        value={item.rating/2}
                        size={24}
                        activeColor="#ffd700"
                        isHalf={true}
                      />
                    </div>
                  </div>
                  <Card.Text className={styles["movie--details--review--list--item--reviewer--body"]}>
                  {item.content}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          )           
          )}
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
