import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Box, Button,CssBaseline, Container,Grid,Typography, makeStyles, Input} from '@material-ui/core';

const ToStart = ({answer,setAnswer})=>{

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
    ];

    const handleInput = (e,i) =>{
        let copy = [...answer];
        copy[i] = e;
        setAnswer(copy);
    };

    return(
        <>
        <Box style={{display:'flex', alignItems:'center', justifyContent:'center', height: '100%'}}>
        {q.map((data, i)=>{
            return(
                <>
                <Grid container spacing={1}>
                    <Grid item xs={8}>
                        <Box>
                            <Typography variant="h3">{data}</Typography>
                            <Typography variant="h4">{qDes[i]}</Typography>
                            <Typography subtitle="h1">{qExplain[i]}</Typography>
                            <Input onChange={(e)=>{handleInput(e.target.value,i)}}></Input>
                        </Box>
                    </Grid>
                </Grid>
                </>
            )
        })}
        <Button variant="contained"
         style={{position:'absolute', right:'0'}}
         onClick={()=>{navigate('/home/plan')}}>Next</Button>
        </Box>
        </>
    )
}

export default ToStart