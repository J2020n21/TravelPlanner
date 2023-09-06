import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Search from '../components/search/search.js';


const Landing = () =>{
    const navigate = useNavigate();
    return(
        <div>
            <p>Design your travel</p>
            <h1>Traveling</h1>
            <p>To where?</p>
            <input></input>
            <button onClick={()=>{navigate('/toStart')}}>Next</button>
            <Button variant="contained" color="primary"> // 사용한다. 
            Hello World
            </Button>
            <Search/>
        </div>
    )
}

// hook;픽사베이 api로 매번 다른 이미지 주소를 받아온다 > 해당 이미지를 내 페이지에 적용한다
// https://www.youtube.com/watch?v=dzOrUmK4Qyw&list=PLillGF-RfqbY3c2r0htQyVbDJJoBFE6Rb&index=4

export default Landing