import React, { useEffect ,useContext} from 'react';
import './App.css';
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import { Authcontext } from './store/Context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import PostView from './store/PostContext';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'


function App() {
  const {setUser} =useContext(Authcontext)
  useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
    
  }, )
  

  return (
    <div>
      <PostView>

      <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Home />}></Route>

            <Route path='/signup' element={ <Signup />}></Route>
            <Route path='/login' element={ <Login/>}></Route>
            <Route path='/create' element={ <Create/>}></Route>
            <Route path='/view' element={ <View/>}></Route>
            
             

          </Routes>
      </BrowserRouter>

      </PostView>
    </div>
  );
}

export default App;
