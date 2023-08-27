import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";

const ToStart = ()=>{
    const navigate = useNavigate();
    let q = ['Where','When','Recommend'];
    let qDes = [
        'which country?',
        'choose the date',
        'Auto-recommendation'
    ];
    let qExplain = [
        'Where do you want to go?',
        'No selection will be provided as a day',
        'The basic setting is "Yes"'
    ]
    let [answer,setAnswer] = useState(['a','b','c']);

    return(
        <>
        <div>
        {q.map((data, i)=>{
            return(
                <>
                <div>
                    <h2>{data}</h2>
                    <h4>{qDes[i]}</h4>
                    <p>{qExplain[i]}</p>
                    <input type="text"></input>
                </div>
                </>
            )
        })}
        <button onClick={()=>{navigate('/plan')}}>Next</button>
        </div>
        </>
    )
}

export default ToStart