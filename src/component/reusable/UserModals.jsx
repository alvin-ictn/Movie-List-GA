import React,{ useEffect, useState} from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { user } from '../../database/db'

export default function UserModals(props,location) {
  const [modal,setModal] = useState("")

  const [token,setToken] = useState(localStorage.getItem('token') || "")

  const [userData,setUser] = useState({})

  useEffect(()=> {
    let link = window.location.href.split('/')
    return () => setModal(window.location.href.split('/')[link.length-1])
  })

  useEffect(()=>{
    setToken(localStorage.getItem('token'))
  },[modal])

  useEffect(()=>{
    user("getuser",null,token).then(res => {
      console.log(res)
      if(res.status === 201 || res.status === 200) {
        setUser(res.data.users)
      }
    })
  },[token])

  useEffect(()=>{
    console.log(userData)
  },[userData])

  return (
    <Modal
      animation={false}
      className="Modal"
      show={props.show}
      onHide={props.handle}
    >
      <Modal.Header className="Modal Modal-Header" closeButton>
        {modal.toUpperCase()}
      </Modal.Header>
      <Modal.Body className="Modal Modal-Body">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
           
              name="email"
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-danger">ff</Form.Text>
          </Form.Group>
          
            <Form.Group controlId="formBasicFullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
               
                name="name"
                type="full Name"
                placeholder="Full Name"
              />
            </Form.Group>
   
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
   
              name="password"
              type="password"
              placeholder="Password"
            />
            <Form.Text type="invalid" className="text-danger">
            
            </Form.Text>
          </Form.Group>
       
            <Form.Group controlId="formBasicPasswordConfirmation">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
            
                name="password2"
                type="password"
                placeholder="PasswordConfirmation"

              />
              <Form.Text className="text-danger">

              </Form.Text>
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="Modal Modal-Footer">
      <Button
         
         className="Button-Submit"
         variant="primary"
         type="submit"
       >
         Sign Up
       </Button>
        {/* <span onClick={logIn}>{isSignup ? "Log in" : "Sign Up"}</span> */}
      </Modal.Footer>
    </Modal>
  )
}
