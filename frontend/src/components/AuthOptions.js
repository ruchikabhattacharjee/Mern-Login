import React,{useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from './context/UserContext';

export default function AuthOptions(){
    const {userData,setUserData} = useContext(UserContext);


    const history = useHistory();
    const register = () => history.push("/Register");
    const login = () => history.push("/Login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token","");
        history.push('/');
    
    }
    return(
        <nav className = "auth">
            {
                userData.user ?(
                    <button onClick={logout}>Logout</button>
                ):(
                    <>
                        <button onClick={register}>SignUp</button>
            <button onClick={login}>Login</button>
                    </>
                )

            }
            
        </nav>
    )
}