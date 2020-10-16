import React, { useState,useEffect } from "react";
import {
  Navbar,
  Form,
  FormControl,
  Image,
  Container,
  Col,
  Dropdown,
} from "react-bootstrap";
import Modal from './Modals'

import UserModal from './UserModals';

import Logo from "../../images/Logo.svg";

import {AiOutlinePoweroff, AiOutlineDropbox, AiOutlineEdit} from 'react-icons/ai'

export default function Bar(props) {
  const [isLogin,setLogin] = useState(false);

  const [userData,setData] = useState(JSON.parse(localStorage.getItem('userdata')) || {name:"",image:""})
  

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <p
      style={{marginBottom: 0}}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children} 
    </p>
  ));
  
  const [show, setShow] = useState(false)

  const [showUserModal, setUserModal] = useState(false)

  const closeModal = () => {
    setShow(false)
    setLogin(true)
    setData(JSON.parse(localStorage.getItem('userdata')));
  } 

  const handleModal = () => {
    setShow(!show)
  }

  const handleUserModal = () => {
    setUserModal(!showUserModal)
  }

  const userModal = () => {
    setUserModal(!showUserModal)
  }

  const handleLogOut = () => {
    localStorage.clear();
    setLogin(false);
  }
  
  useEffect(()=>{
    localStorage.getItem('token') && setLogin(true)
  },[isLogin])

  return (
    <Navbar  bg="white" expand="lg">
      <Modal show={show} handleModal={handleModal} closeModal={closeModal}/>
      <UserModal show={showUserModal} handle={handleUserModal}/>
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
        <Col xs lg="2" className="justify-content-end text-right">
          {!isLogin ? (
            <p style={{"marginBottom":0}} onClick={handleModal}>Sign Up</p>
          ) : (
          <>
          
            <Dropdown style={{"cursor":"pointer"}}>
              <Dropdown.Toggle drop={"left"} as={CustomToggle} id="dropdown-custom-components">
              <Navbar.Text className={"mr-3"}>
                {userData.name}
              </Navbar.Text>
              <Image
                style={{ width: "50px", height: "50px" }}
                src={`https://warm-bastion-18573.herokuapp.com/${userData.image}`}
                roundedCircle
              />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={userModal} href="#/edit"><AiOutlineEdit/>Edit</Dropdown.Item>
                <Dropdown.Item onClick={userModal} href="#/delete"><AiOutlineDropbox/>Delete</Dropdown.Item>
                <Dropdown.Item onClick={handleLogOut} href="#/delete"><AiOutlinePoweroff/>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
              
          </>
          )}
        </Col>
      </Container>
    </Navbar>
  );
}
