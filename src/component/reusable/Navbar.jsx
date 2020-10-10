import React, { useState } from "react";
import {
  Navbar,
  Form,
  FormControl,
  Image,
  Container,
  Col,
} from "react-bootstrap";
import Modal from './Modals'

import Logo from "../../images/Logo.svg";


export default function Bar(props) {
  let [isLogin] = useState(false);
  const [condition,setCondition] = useState({
    sign: false,
    login: false,
  })

  const [show, setShow] = useState(false)


const handleModal = () =>
{
    setShow(!show)
}


  return (
    <Navbar bg="white" expand="lg">

      <Modal show={show} handleModal={handleModal}/>
      <Container>
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
            <a onClick={handleModal}>Sign Up</a>
          ) : (
            <Image
              style={{ width: "50px", height: "50px" }}
              src={props.imagess}
              roundedCircle
            />
          )}
        </Col>
      </Container>
    </Navbar>
  );
}
