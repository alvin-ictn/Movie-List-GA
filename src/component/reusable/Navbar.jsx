import React, { useState } from "react";
import {
  Navbar,
  Form,
  FormControl,
  Image,
  Container,
  Col,
} from "react-bootstrap";

import Logo from "../../images/Logo.svg";

export default function Bar(props) {
  let [isLogin, setLogin] = useState(false);

  return (
    <Navbar bg="white" expand="lg">
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
            "Sign Up"
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
