import Modal from "react-bootstrap/Modal";
import { Button, Col, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";

import React, { useEffect, useRef } from "react";
import { useState } from "react";

export default function Modals(props) {
  // state for form on line 33 ~ 65
  const [form, setForm] = useState({
    name: "Alvin",
    email: "Mantovani",
    password: "alvin.ictn",
  });

  const [isSignup, setModal] = useState(props.login || true); // state for manage condition Log In or Sign Up mostly at render()

  const [errorMsg] = useState({ email: [], password: [], passwordVerify : [], name: [] }); // state for storing error Message on line 33 ~ 65

  const [isValid,setValid] = useState(false); // state for check if the input has no error before submit

  const formData = new FormData(); // variable for store form data before post

  const [token,setToken] = useState(localStorage.getItem("token") || ""); // state for set up token and check token on localstorage 
  const passwordVerifyRef = useRef(null)
  // a life cycle that happend every token is change, and do set to localStorage with tablename "token" to store token
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // a function to handle input and do form validation over here too
  const handleInput = (e) => {
    let data = { ...form };
    let error = errorMsg;
    
    // input validation for email
    if(e.target.name === "email"){
        (!e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) || e.target.value.includes(" "))
            ? !error.email.length == 1 && error.email.push('please use correct email format eg: alvin@sleepy.me')
            : error.email = error.email.filter(item => item != 'please use correct email format eg: alvin@sleepy.me')
    }

    // input validation for password
    if(e.target.name === "password"){
        !e.target.value.match(/(?=.*[a-zA-Z])/) 
            ? !error.password.includes('alphabetical') && error.password.push('alphabetical')
            : error.password = error.password.filter(item => item != 'alphabetical')
        !e.target.value.match(/(?=.*\d)/)
            ? !error.password.includes('number') &&  error.password.push('number')
            : error.password = error.password.filter(item => item != 'number')
        e.target.value.match(/(?=.*[a-zA-Z])+(?=.*\d)/) && (error.password = []);

    }

    // input validation for verify password and condition if verify password input not add value to state
    if (e.target.name === "password2") {
        e.target.value !== form.password
            ? !error.passwordVerify.includes('password doesn\'t match with previous one') && error.passwordVerify.push('password doesn\'t match with previous one')
            : error.passwordVerify = error.passwordVerify.filter(item => item != 'password doesn\'t match with previous one')
    } else { // if the input box is not verify password add the value to state and formdata
      data = { ...data, [e.target.name]: e.target.value };
      formData.append(e.target.name, e.target.value);
    }
    
    // setform data
    setForm(data);
  };

  useEffect(() => {
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
  }, [form, formData]);

  const logIn = (e) => {
    setModal(!isSignup);
  };

  const submitButton = (e) => {
    e.preventDefault();
    if (isSignup) {
        axios({
            method: 'post',
            url: 'https://quiet-hollows-95792.herokuapp.com/register',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                //handle success
                setToken(response.data.token)
                console.log(token)
                return response.data.token
            }).then(function(response){
    
            })
            .catch(function (err) {
                //handle error
                console.errpr(err);
            });
    } else {
      console.log("E");
    }
    let errorLength = Object.values(errorMsg).flat().length

    //passwordVerifyRef.current.value.length

  };
  return (
    <div>
      {/* Sign up model */}
      {/* <Button className="buttonModal" onClick={()=>props.handleModal()} >
                    Sign Up
                </Button>  */}
      <Modal
        animation={false}
        className="Modal"
        show={props.show}
        onHide={() => props.handleModal()}
      >
        <Modal.Header className="Modal Modal-Header" closeButton>
          {!isSignup ? "Log In" : "Sign Up"}
        </Modal.Header>
        <Modal.Body className="Modal Modal-Body">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => handleInput(e)}
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-danger">
                {errorMsg.email}
              </Form.Text>
            </Form.Group>
            {isSignup && (
              <Form.Group controlId="formBasicFullname">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  onChange={(e) => handleInput(e)}
                  name="name"
                  type="full Name"
                  placeholder="Full Name"
                />
              </Form.Group>
            )}
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => handleInput(e)}
                name="password"
                type="password"
                placeholder="Password"
              />
                <Form.Text type="invalid" className="text-danger">
                  {errorMsg.password.length > 1 ? "password must contains " : errorMsg.password.length == 1 ? "password must contain " : ""} {errorMsg.password.length > 1 ? errorMsg.password.join(' and ') : errorMsg.password}
                </Form.Text>
            </Form.Group>
            {isSignup && (
              <Form.Group controlId="formBasicPasswordConfirmation">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  onChange={(e) => handleInput(e)}
                  name="password2"
                  type="password"
                  placeholder="PasswordConfirmation"
                  ref={passwordVerifyRef}
                />
                <Form.Text className="text-danger">
                    {errorMsg.passwordVerify}
                </Form.Text>
              </Form.Group>
            )}
            {/* {isSignup && (
              <Form.Group controlId="formBasicImage">
                <Form.File id="formcheck-api-regular">
                  <Form.File.Label>Regular file input</Form.File.Label>
                  <Form.File.Input
                    name="image"
                    onChange={(e) => handleInput(e)}
                  />
                </Form.File>
              </Form.Group>
            )} */}
            <Button
              onClick={submitButton}
              className="Button-Submit"
              variant="primary"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="Modal Modal-Footer">
          {isSignup && "Already have account?"}{" "}
          <span onClick={logIn}>{isSignup ? "Log in" : "Sign Up"}</span>
        </Modal.Footer>
      </Modal>

      {/* <!-- signUp End -->
                  <!-- login --> */}
      {/*push*/}
    </div>
  );
}
