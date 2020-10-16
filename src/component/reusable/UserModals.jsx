import React,{ useEffect, useState} from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { user } from '../../database/db'

export default function UserModals(props,location) {
  const [modal,setModal] = useState("");

  const [token,setToken] = useState(localStorage.getItem('token') || "");

  const [userData,setUser] = useState({});

  const [form, setForm] = useState({});

  const [update, setUpdate] = useState(false);

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

  useEffect(() => {
    if(update) {
      user("post")
    }
  },[update])

  useEffect(()=> {
    let link = window.location.href.split('/')
    return () => setModal(window.location.href.split('/')[link.length-1])
  })

  useEffect(()=>{
    setToken(localStorage.getItem('token'))

  },[modal])

  useEffect(()=>{
    user("getuser",null,token).then(res => {
      if(res.status === 201 || res.status === 200) {
        setUser(res.data.users)
      }
    })
  },[token])

  useEffect(()=>{

  },[userData])

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

  const handleImage = e => {
    setForm({...form, 
      ["image"] : e.target.files[0]
    })
  }
  const submitButton = (e) => {
    e.preventDefault();
    if (true) {
      user("edit", form,localStorage.getItem('token')).then( res => {
        console.log(res)
        if(res.status === 200 || res.status === 201){
          setUpdate(true)
        } else {
          console.log(res.data.msg)
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
      onHide={props.handle}
    >
      
      <Modal.Header className="Modal Modal-Header" closeButton>
        {modal && modal.toUpperCase()}
      </Modal.Header>
      <Modal.Body className="Modal Modal-Body">
        <Form>
          <Form.Group controlId="formBasicImage">
            <Form.File id="formcheck-api-regular">
                <Form.File.Label>Image Upload</Form.File.Label>
                <Form.File.Input  name="image" onChange={(e) => handleImage(e)}/>
            </Form.File>
          </Form.Group>
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
          
            <Form.Group controlId="formBasicFullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                onChange={(e) => handleInput(e)}
                name="name"
                type="full Name"
                placeholder="Full Name"
              />
            </Form.Group>
          
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => handleInput(e)}
              name="password"
              type="password"
              placeholder="Password"
            />
            <Form.Text type="invalid" className="text-danger">
              { errorMsg.password.length > 1
                ? "password must contains "
                : errorMsg.password.length === 1
                ? "password must contain "
                : "" }
              { errorMsg.password.length > 1
                ? errorMsg.password.join(" and ")
                : errorMsg.password}
            </Form.Text>
          </Form.Group>
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
       
        <span onClick={() => console.log("D")}></span>
      </Modal.Footer>
    </Modal>
  );
}
