import Modal from "react-bootstrap/Modal";
import { Button, Col, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";

import React, { useEffect } from "react";
import { useState } from "react";

export default function Modals(props) {
  const [form, setForm] = useState({
    name: "Alvin",
    email: "Mantovani",
    password: "alvin.ictn",
  });

  const [isSignup, setModal] = useState(props.login || true);

  const [errorMsg, setError] = useState({ email: [], password: [], passwordVerify : [], name: [] });

  const formData = new FormData();

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const handleInput = (e) => {
    let data = { ...form };
    let error = errorMsg;
    
    if(e.target.name === "email"){
        if((!e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) || e.target.value.includes(" "))){
            !error.email.includes('please use correct email format eg: @alvin@sleepy.me') && error.email.push('please use correct email format eg: @alvin@sleepy.me')
        } else {
            error.email = error.email.filter(item => item != 'please use correct email format eg: @alvin@sleepy.me')
        }
    }

    if(e.target.name === "password"){
        if(!e.target.value.match(/(?=.*[a-zA-Z])/)){
            !error.password.includes('doesn\'t contain alphabetical') && error.password.push('doesn\'t contain alphabetical')
        }else {
            error.password = error.password.filter(item => item != 'doesn\'t contain alphabetical')
        }

        if(!e.target.value.match(/(?=.*\d)/)){
            !error.password.includes('doesn\'t contain number') &&  error.password.push('doesn\'t contain number')
        }else {
            error.password = error.password.filter(item => item != 'doesn\'t contain number')
        }

        if(e.target.value.match(/(?=.*[a-zA-Z])+(?=.*\d)/)) error.password = [];
    }

   console.log(error)
    console.log()
    if (e.target.name === "password2") {
        if(e.target.value !== form.password){
            !error.passwordVerify.includes('password doesn\'t match with previous one') && error.passwordVerify.push('password doesn\'t match with previous one')
        }else {
            error.passwordVerify = error.passwordVerify.filter(item => item != 'password doesn\'t match with previous one')
        }
    } else if (e.target.name === "image") {
      data = { ...data, [e.target.name]: e.target.files[0] };
      formData.append(e.target.name, e.target.files[0]);
    } else {
      data = { ...data, [e.target.name]: e.target.value };
      formData.append(e.target.name, e.target.value);
    }
    let errorLength = Object.values(error).flat().length;
    setForm(data);
  };

  useEffect(() => {
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
  }, [form, formData]);

  const logIn = (e) => {
    setModal(!isSignup);
  };

  const SignUp = (e) => {
    e.preventDefault();
    if (isSignup) {
      console.log("SIGNUP");
    } else {
      console.log("E");
    }

    // axios({
    //     method: 'post',
    //     url: 'https://quiet-hollows-95792.herokuapp.com/register',
    //     data: formData,
    //     headers: {'Content-Type': 'multipart/form-data' }
    //     })
    //     .then(function (response) {
    //         //handle success
    //         setToken(response.data.token)
    //         console.log(token)
    //         return response.data.token
    //     }).then(function(response){

    //     })
    //     .catch(function (err) {
    //         //handle error
    //         console.errpr(err);
    //     });
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
                  {errorMsg.password.length ? "password " : ""} {errorMsg.password.length > 1 ? errorMsg.password.join(' and ') : errorMsg.password}
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
              onClick={SignUp}
              className="Button-SignUp"
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
