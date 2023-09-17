import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import {CssBaseline, Typography, Grid, Box, Container,
    Switch, FormGroup, FormControl, FormControlLabel, FormLabel
 } from '@material-ui/core';


 const sets = ['AI recommend','Reset the plan','Auto-save','Night mode'];
 const setsDes = ['Use AI recommendation','All the plan will be removed',
     'Your plan will be saved automatically','Change UI'];

export default function Setting (){
    const navigate = useNavigate();
    let [setsValue,changeSetsValue] = useState([0,0,0,0]);

    return(
        
        <>     
        <CssBaseline/>
        {
            sets.map(function(data,i){
                return(
                    <div className="Set">
                    <h2>{data}</h2>
                    <p>{setsDes[i]}</p>
                    </div>
                )
            })
        }

        <h5>Any problem?</h5>
        <p onClick={()=>{navigate('/home/complain')}}>click</p>
        <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label="Start"
          labelPlacement="start"
        />
        </>
    )

}
// https://mui.com/material-ui/react-switch/