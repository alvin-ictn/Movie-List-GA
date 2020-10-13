import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { user } from "../../database/db";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

export default function Modals(props) {
  // state for form
  const [form, setForm] = useState({});

  const [isSignup, setModal] = useState(props.login || true); // state for manage condition Log In or Sign Up mostly at render()

  const [errorMsg] = useState({
    email: [],
    password: [],
    passwordVerify: [],
    name: []
  }); // state for storing error Message

  const [resError,setError] = useState({
    email: [],
    password: [],
  })

  const [token, setToken] = useState(localStorage.getItem("token") || ""); // state for set up token and check token on localstorage

  const passwordVerifyRef = useRef(null);
  // a life cycle that happend every token is change, and do set to localStorage with tablename "token" to store token
  useEffect(() => {
    token && localStorage.setItem("token", token);
    if (token && !localStorage.getItem("userdata"))
      user("detail", null,  token ).then((res) =>{
        localStorage.setItem('userdata', JSON.stringify({ ...res.data.users }))
        props.closeModal()
        }
      );
   
  }, [props,token]);

  // a function to handle input and do form validation over here too
  const handleInput = (e) => {
    let data = { ...form };
    let error = errorMsg;

    // input validation for email
    if (e.target.name === "email") {
      !e.target.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) ||
      e.target.value.includes(" ")
        ? !error.email.length === 1 &&
          error.email.push(
            "please use correct email format eg: alvin@sleepy.me"
          )
        : (error.email = error.email.filter(
            (item) =>
              item !== "please use correct email format eg: alvin@sleepy.me"
          ));
    }

    // input validation for password
    if (e.target.name === "password") {
      !e.target.value.match(/(?=.*[a-zA-Z])/)
        ? !error.password.includes("alphabetical") &&
          error.password.push("alphabetical")
        : (error.password = error.password.filter(
            (item) => item !== "alphabetical"
          ));
      !e.target.value.match(/(?=.*\d)/)
        ? !error.password.includes("number") && error.password.push("number")
        : (error.password = error.password.filter((item) => item !== "number"));
      e.target.value.match(/(?=.*[a-zA-Z])+(?=.*\d)/) && (error.password = []);
    }

    // input validation for verify password and condition if verify password input not add value to state
    if (e.target.name === "password2") {
      e.target.value !== form.password
        ? !error.passwordVerify.includes(
            "password doesn't match with previous one"
          ) &&
          error.passwordVerify.push("password doesn't match with previous one")
        : (error.passwordVerify = error.passwordVerify.filter(
            (item) => item !== "password doesn't match with previous one"
          ));
    } else {
      // if the input box is not verify password add the value to state
      data = { ...data, [e.target.name]: e.target.value };
    }
    setForm(data);
  };

  const logIn = (e) => {
    setModal(!isSignup);
  };

  const submitButton = (e) => {
    e.preventDefault();

    if (isSignup) {
      user("register", { ...form }).then((res) => {
        if(res.status === 200 || res.status === 201){
          res.data.token && setToken(res.data.token)
        } else {
          if(res.data.msg.includes('Email')) {
            !resError.email.length && setError({...resError,email : "Email address is already in use"})
          }else {
            setError({...resError,
              email : ""})
          }
        }
      });
    } else {
      
      user("login", form).then((res) => {
        console.log(form)
        if(res.status === 200){
          res.data.token && setToken(res.data.token);
        } else {
          if(res.data.msg.includes('Email')) {
            !resError.email.length && setError({...resError,email : "There no match email found in database",
            password :""})
          }else if(res.data.msg.includes("Password") || res.data.msg.includes("password")) {
            !resError.password.length && setError({...resError,email:"",password : "Password is Invalid"})
          }else {
            setError({...resError,
              email : "",
              password : ""})
          }
        }
      });
    }
  };
  return (
    <Modal
      animation={false}
      className="Modal"
      show={props.show}
      onHide={props.handleModal}
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
            <Form.Text className="text-danger">{errorMsg.email}{resError.email}</Form.Text>
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
              {isSignup ? errorMsg.password.length > 1
                ? "password must contains "
                : errorMsg.password.length === 1
                ? "password must contain "
                : "" : ""}
              {!isSignup ? resError.password : errorMsg.password.length > 1
                ? errorMsg.password.join(" and ")
                : errorMsg.password}
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
  );
}
