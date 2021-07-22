import React, { useState, useEffect, useRef } from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Axios from "axios";
import BIRDS from 'vanta/dist/vanta.birds.min'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header'
import UserContext from './components/context/UserContext'
import SignupSuccessful from './components/SignupSuccessful'
import LoginSuccessful from './components/LoginSuccessful'
import "./App.css"

const App = (props) => {

  const [vantaEffect, setVantaEffect] = useState(0)
  const myRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(BIRDS({
        el: myRef.current
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  const[userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(()=> {
    const checkLoggedIn = async () =>{
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token", "");
        token="";
      }
      const TokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        {headers: {"x-auth-token": token } }
        );
        if(TokenRes.data){
          const userResponse = await Axios.get("http://localhost:5000/users/", {
            headers: {"x-auth-token": token},

        });
    
        setUserData({
          token,
          user: userResponse.data,
        });
      }
        
    };
    checkLoggedIn();
  }, []);  

  return <div ref={myRef} id="vanta">
    
  
    <BrowserRouter>
    <UserContext.Provider value={{userData,setUserData}}>
    <Header></Header>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route path="/Register" component={Register}></Route>
        <Route path="/SignupSuccessful" component={SignupSuccessful}></Route>
        <Route path="/LoginSuccessful" component={LoginSuccessful}></Route>
      </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  </div>
}

export default App;

