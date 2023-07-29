import React,{useEffect,useState} from 'react'
import {getAuth,onAuthStateChanged } from 'firebase/auth'
import {app} from "../firebase.config"

export default function useAuthStatus() {
  const [loggedIn,setLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(()=>{
    const auth= getAuth(app);
    onAuthStateChanged (auth,user=>{
        if(user){
            setLoggedIn(true)
        }
        setCheckingAuth(false)
    })
  })

  return {loggedIn,checkingAuth}
}
