import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import {CssBaseline, Typography, Grid, Box, Container,
    Switch, FormGroup, FormControl, FormControlLabel, FormLabel
 } from '@material-ui/core';


 const sets = ['AI recommend','Reset the plan','Night mode'];
 const setsDes = ['Use AI recommendation','All the plan will be removed',
     'Change UI'];

export default function Setting (){
    const navigate = useNavigate();
    let [setsValue,changeSetsValue] = useState([0,0,0,0]);

    const aiRecommend = () =>{
        console.log("airecommend")
    }

    const resetPlan = ()=>{
        window.localStorage.clear()
        alert('Reset complete')
    }

    let functions = [aiRecommend,resetPlan];
    return(
        
        <>     
        <CssBaseline/>
        <div style={{
            // display:'flex', flexDirection:'row',
            // gap:'10px',alignItems:'center',
        }}>
        {
            sets.map(function(data,i){
                return(
                    <div className="Set">
                    <h2>{data}</h2>
                    <button onClick={functions[i]}>변경하기</button>
                    <p>{setsDes[i]}</p>
                    </div>
                )
            })
        }
        </div>

        <h5>Any problem?</h5>
        <p onClick={()=>{navigate('/home/complain')}}>click</p>
        </>
    )
}
