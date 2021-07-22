import React,{useEffect,useContext} from 'react';
import BIRDS from 'vanta/dist/vanta.birds.min';
import { useHistory } from "react-router-dom";
import UserContext from './context/UserContext';
import "./components.css"
function Home() {
    const userData = useContext(UserContext);
    const history = useHistory();
   // useEffect(()=>{
     //   if(!userData.user) history.push("/Login");
    //});

    return (
        <div className="container mt-5">
        <div className="row mt-5">
            <div className="col-12 align-items-center">
                <div className="card homeCard mx-auto">
                    <div class="card-body">
                        <h2 class="card-text text-center">Welcome to my MERN login authentication app</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Home;