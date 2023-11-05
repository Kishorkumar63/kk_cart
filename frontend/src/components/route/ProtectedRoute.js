import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate} from "react-router-dom"

export const ProtectedRoute = ({children}) => {
    const{isAuthenticated}=useSelector(state=>state.authState)
  if(!isAuthenticated)
  {
return <Navigate to="/login"/>

  }
  return children


}
