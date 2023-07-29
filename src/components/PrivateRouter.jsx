import React from 'react'
import useAuthStatus from '../hooks/useAuthStatus'
import {Navigate,Outlet} from 'react-router-dom';
import Spinner from './Spinner';

function PrivateRouter() {
  const {loggedIn,checkingAuth} = useAuthStatus();

  if(checkingAuth){
    return <Spinner />
  }else{
    return loggedIn ? <Outlet /> : <Navigate to="/sign-in" /> 
  }
}

export default PrivateRouter