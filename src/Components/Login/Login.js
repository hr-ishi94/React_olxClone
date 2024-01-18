import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import OlxLogo from '../../assets/OlxLogo';
import './Login.css';

function Login() {
  const navigate=useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin=(e)=>{
    e.preventDefault()
    if (email==='' || email===null){
      alert('Email required!')
    }else if(password===null || password==='') {
      alert('Password required!')  
    }else{
      signInWithEmailAndPassword(auth,email.trim(),password.trim()).then((result)=>{
        navigate('/')
      }).catch((error)=>{
        alert(error.message)
      })
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
      <OlxLogo></OlxLogo>
        <form onSubmit={handleLogin}>
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
          <button>Login</button>
        </form>
        <Link to={'/signup'}>
        <a>Signup</a>
        </Link>
      </div>
    </div>
  );
}

export default Login;
