import React from 'react'
import {Route, Redirect} from 'react-router-dom';

function PrivateRoute({component: Component, ...rest}){
  let valid = false;
  let access = JSON.parse(localStorage.getItem("access"))

  if(access && access.token){
    if(rest.access){
      if(access && access.role === rest.access){
        valid = true
      }else{
        valid = false
      }
    }else{
      valid = true
    }
  }

  return(
    valid ?
    <Route render={(props) => <Component {...props} />}  {...rest} /> :
    <Redirect to="/login" />
  )
}

export default PrivateRoute;