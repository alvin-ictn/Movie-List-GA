import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Badge,
  Container,
  Card,
  Col,
  Row
} from "react-bootstrap";

import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'

import { user, movie, review } from '../../database/db'

import img from '../../images/thumbnail.jpg'

import ReactStars from "react-rating-stars-component";

import styles from './Reviews.module.css'

import Circle from '../../component/reusable/CircleGenerator'

import Skeleton from 'react-loading-skeleton';

export default function Reviews(){
  const [query] = useState(window.location.href.split('/'));

  const [chara,setChara] = useState(0);

  const [userData,setUser] = useState(JSON.parse(localStorage.getItem('userdata')) || []);

  const [dataMovie,setMovie] = useState();

  const [reviw, setReviews] = useState();

  const [filterReview, setReview] = useState();

  const [myReview, setMine] = useState({id:0})

  const [pReview,setPost] = useState()

  const myRef = useRef(null)

  const textbox = useRef()

  const [isEdit,setEdit] = useState(false)

  const [isLoading,setLoading] = useState(false)

  const url = "https://warm-bastion-18573.herokuapp.com";
 
  useEffect(() => {
    if(!userData.length >= 3)  user("detail",null,localStorage.getItem('token')).then(res => setUser({...res.data}))
    movie("search",query[query.length - 2]).then(res => setMovie(res.data[0]))
    review("all",localStorage.getItem('token')).then(res => setReviews([...res.data]))
  },[query, isLoading, userData.length])

  useEffect(() => {
    if(reviw && dataMovie) {

      let dataReview = reviw.filter(item => item.MovieId === dataMovie.id)
      let myReview = dataReview.filter(item => item.user.id === userData.id)
      myReview.length ? setMine(myReview[0]) : setMine({id:0})
      setReview(dataReview) 
    }
    
  },[dataMovie, reviw, userData])


  useEffect(() => {
    setLoading(false)
  },[filterReview])

  const ratingChanged = (e) => {
    setPost({...pReview,"rating" : e})
  }

  const handleInput = (e) => {
    setChara(e.target.value.length)
    setPost({...pReview, "content" : e.target.value.slice(0,280)})
  }

  const handleEdit = (e) => {
    console.log(myRef)
    console.log(myReview)
    textbox.current.value = myRef.current.innerText;
    textbox.current.focus();
    setEdit(true)
  }

  const handleDelete = (e) => {
    //method, content = null, token = null, query = null
    myReview && 
    review("delete",null,localStorage.getItem('token'),myReview.id).then(res => {
      if(res.status === 200 || res.status === 201) {
        setLoading(true)
      }
    })
    textbox.current.value = ""
  }

  const pressIt = (e) => {
    if(e.ctrlKey && e.which === 13){
      if(pReview && dataMovie) 
        if(!isEdit){
          review("post",pReview,localStorage.getItem('token'),dataMovie.id).then(res => {
            if(res.status === 200 || res.status === 201){
              setPost({})
            }else {
              console.error(res.data.msg)
            }
          })
        }else {
          review("edit",pReview,localStorage.getItem('token'),dataMovie.id).then(res => {
            if(res.status === 200 || res.status === 201){
              setPost({})
              setEdit(false)
            }else {
              console.error(res.data.msg)
            }
          })
        }
        textbox.current.value = ""
        setLoading(true)
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
                <textarea ref={textbox} onKeyPress={(e) => pressIt(e)} onChange={(e) => handleInput(e)}className="form-control" rows="3"></textarea></Col>
              <Col sm={2} className={`${styles.circleE} align-self-center text-right`}><Circle length={chara} size={30} text/></Col>
            </Row>
        </div>
        {!isLoading ? 
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
                } alt="Missing" className={styles["movie--details--review--list--item--thumbnail"]} />
                <div className={styles["movie--details--review--list--item--reviewer"]}>
                  <div className={styles["movie--details--review--list--item--reviewer--head"]}>
                    <div className="movie--details--review--list--item--reviewer--head--content">
                      <label className="movie--details--review--list--item--reviewer--head--contentusername">{item.user.name}</label>{" "}
                      <Badge variant="primary">{userData && userData.id === item.user.id && "You"}</Badge>
                      {userData && userData.id === item.user.id && <>
                        {" "}<FaPencilAlt style={{cursor:"pointer"}} onClick={(e)=>handleEdit(e)}/>{" "}
                        <FaTrashAlt style={{cursor:"pointer"}} onClick={(e)=>handleDelete(e)}/>
                      </>}
                    </div>
                    <div className={styles["movie--details--review--list--item--reviewer--head--rate"]}>
                      <ReactStars
                        count={5}
                        value={item.rating}
                        size={24}
                        activeColor="#ffd700"
                        isHalf={true}
                        edit={false}
                      />
                    </div>
                  </div>
                  <Card.Text ref={item.id === myReview.id ? myRef : null} className={styles["movie--details--review--list--item--reviewer--body"]}>
                  {!isLoading // false -> true
                    ? item.content 
                    : item.id === myReview.id 
                    ? <Skeleton/> : item.content}
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
                  Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ Nom ~ 
                </Card.Text>
              </div>
              {/* <Card.Title>Prem Card Tdditle </Card.Title>
                    */}

            </Card.Body>
          </Card>

        </div> : <Skeleton count={4} height={5}/>}
      </Container>
    </section>
  );
}
