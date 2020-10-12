import React, { useState,useEffect } from "react";
import {
  Navbar,
  Form,
  FormControl,
  Image,
  Container,
  Col,
} from "react-bootstrap";
import Modal from './Modals'

import UserModal from './UserModals';

import Logo from "../../images/Logo.svg";

export default function Bar(props) {
  const [isLogin,setLogin] = useState(false);
  const [userData,setData] = useState(JSON.parse(localStorage.getItem('userdata')) || {name:"",image:""})
  // const [condition,setCondition] = useState({
  //   sign: false,
  //   login: false,
  // })
  
  const [show, setShow] = useState(false)

  const closeModal = () => {
    setShow(false)
    setLogin(true)
    setData(JSON.parse(localStorage.getItem('userdata')));
  } 

  const handleModal = () => {
    setShow(!show)
  }

  const usermodal = () => {
    
  }
  
  useEffect(()=>{
    localStorage.getItem('token') && setLogin(true)
  },[isLogin])

  return (
    <Navbar  bg="white" expand="lg">
      <Modal show={show} handleModal={handleModal} closeModal={closeModal}/>
      <Container style={{maxWidth: "100vw"}}>
        <Col xs lg="4" className="justify-content-start text-left">
          <Navbar.Brand href="#home">
            <Image style={{ width: "200px" }} src={Logo} />
          </Navbar.Brand>
        </Col>
        <Col xs lg="6">
          <Form>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
        </Col>
        <Col xs lg="2" className="justify-content-end text-right" onClick={usermodal}>
          {!isLogin ? (
            <p style={{"marginBottom":0}} onClick={handleModal}>Sign Up</p>
          ) : (
          <>
              <Navbar.Text className={"mr-3"}>
                {userData.name}
              </Navbar.Text>
              <Image
                style={{ width: "50px", height: "50px" }}
                src={userData.image}
                roundedCircle
              />
          </>
          )}
        </Col>
      </Container>
    </Navbar>
  );
}
