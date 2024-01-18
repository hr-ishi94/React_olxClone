import React, { useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Signup.css';
import {auth,firestore} from '../../firebase/config'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { addDoc ,collection} from 'firebase/firestore';
import OlxLogo from '../../assets/OlxLogo';

export default function Signup() {

  const navigate=useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  
  const handleClick=(e)=>{
    e.preventDefault()
      if (username===null ||username==="" ){
        alert("Username is required!")
      
      } else if(password===null ||password===""){
        alert("Password is required!")
      
      } else if(email===null ||email===""){
        alert("Email is required!")
      
      } else if(phone===null ||phone===""){
        alert("Mobile number is required!")
      }else{
        createUserWithEmailAndPassword(auth,email.trim(),password.trim()).then((result)=>{
          const user =result.user
          updateProfile(user,{displayName:username}).then(()=>{
            const userCollection=collection(firestore,'users')
            addDoc(userCollection,{
              id:user.uid,
              username:username,
              mobilenumber:phone
            }).then(()=>{
              navigate("/login")
            })
          })
        }).catch((error)=>{
          alert(error.message)
        })

      }
  }

  return (
    <div>
      <div className="signupParentDiv">
        
        <OlxLogo></OlxLogo>
        <form onSubmit={handleClick}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to={'/login'}>
        <a>Login</a>
        </Link>
      </div>
    </div>
  );
}
