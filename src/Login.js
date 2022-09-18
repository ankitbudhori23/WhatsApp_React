import React from 'react'
import { Button } from '@material-ui/core'
import "./css/login.css"
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider'

function Login() {
      const[{},dispatch] = useStateValue()
      const signIn=()=>{
            auth.signInWithPopup(provider).then(result=>{
                  dispatch({
                        type:"SET_USER",
                        user:result.user
                  })
            }).catch(error=>alert(error))
      }
      return (
            <div className="login_page">
                  <div className='login'>
                        <img className="login_img" src='https://www.farmizen.com/wp-content/uploads/2020/10/79dc31280371b8ffbe56ec656418e122.png'/>
                        <h2>Sign In to WhatsApp</h2>
                        <div className='login_btn'>
                        <Button onClick={signIn} variant="contained" color="primary">Login With Google</Button>
                        </div>
                  </div>
               
            </div>
      )
}

export default Login
