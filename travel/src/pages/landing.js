import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () =>{
    const navigate = useNavigate();
    return(
        <div>
            <p>Design your travel</p>
            <h1>Traveling</h1>
            <p>To where?</p>
            <input></input>
            <button onClick={()=>{navigate('/toStart')}}>Next</button>
        </div>
    )
}

// 나라 애니메이션

export default Landing