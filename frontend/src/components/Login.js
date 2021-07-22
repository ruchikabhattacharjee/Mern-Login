import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from "./context/UserContext";
import Axios from 'axios';
import ErrorNotice from './misc/ErrorNotice';

function Login(){

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { setUserData } = useContext(UserContext);

    const history = useHistory();
    const [error,setError] = useState();

    const submit = async (e) => {
        e.preventDefault();
        try{
        const loginUser = {email, password};
        const loginRes = await Axios.post("http://localhost:5000/users/login",
            loginUser
        );
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/LoginSuccessful");
        }
        catch(err){
            err.response.data.message && setError(err.response.data.message);
        }
    };



    return (
        <div className="container mt-5">
            <div className="row mt-md-5">
                <div className="col-12 col-md-6 align-content-center mx-auto">
                    <div className="card shad border-0 mt-md-2">
                        <div className="card-title text-center mt-5">
                            <h1>LOG IN</h1>
                        </div>
                        <div className="card-body text-center">
                            <form onSubmit={submit}>
                                {error && <ErrorNotice message={error} clearMessage></ErrorNotice>}
                            <i className="fa fa-user icon"></i><input className="input100 col-11 justfy-content-center" 
                            type="text" 
                            name="username" 
                            placeholder="Email ID"
                            onChange={(e) => setEmail(e.target.value)}/>
                            <div className="wrap-input100 validate-input" data-validate="Enter password">
                                <i className="fa fa-lock"></i><input className="input100 col-11 justfy-content-center mt-4"
                                 type="password" 
                                 name="pass" 
                                 placeholder="Password"
                                 onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <button className="btn btn-dark badge-pill loginbtn px-4 py-2 mt-5 mb-5" type="submit" data-toggle="modal" data-target="#exampleModal">Login</button>
                            
                            <p className="mt-5"><Link to="/">Forgot password?</Link></p>
                            <p>Don't have an account? <Link to="/register">Click here to Sign up!</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }

export default Login;

