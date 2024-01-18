import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { Authcontext } from '../../store/Context';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';



function Header() {
  const navigate=useNavigate()
  const {user}=useContext(Authcontext)

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <Link to ={'/'}>
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        </Link>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={(e)=>{if( e.target.innerText==='Login') navigate("/login")}}>{user?`Welcome  ${user.displayName}`:'Login'}</span>
          <hr />
        </div>
        {user&&
        <span onClick={()=>{
          signOut(auth).then(()=>{
            alert('Logged out successful')
            navigate('/')
          }).catch((error)=>{
            alert(error.message)
          })
        }}>Logout</span>
        }
        <Link to ={'/create'}>
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
