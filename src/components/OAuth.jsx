import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleClick =  ()=>{
    try{
        const auth=getAuth()
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth,provider).then((result)=>{
            const user = result.user;

            const docRef = doc(db,'users',user.uid);
            getDoc(docRef).then((docSnap)=>{
                if(!docSnap.exists){
                    setDoc(doc(db,'users',user.uid),{
                        name: user.displayName,
                        email: user.email,
                        timeStamp: serverTimestamp()
                    }).then(()=> navigate('/'))
                }else{
                    navigate('/')
                }
            })
        })
    }catch(error){
        toast.error("Cannot login with Google")
    }
  }
  return (
    <div className='socialLogin'>
        <p>Sign {location.pathname === "/sign-up"?'up':'in'} with </p>
        <button className='socialIconDiv' onClick={onGoogleClick}>
            <img className='socialIconImg' src={googleIcon} alt='google'></img>
        </button>
    </div>
  )
}

export default OAuth