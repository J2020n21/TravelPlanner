import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import {CountryDropDown,Date,Recommendation} from "../components/country";
import {Box, Button,CssBaseline, Container,Grid,Typography, makeStyles, Input} from '@material-ui/core';

const ToStart = ()=>{
    const navigate = useNavigate();
    let qInput = [<CountryDropDown/>,<Date/>,<Recommendation/>]
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
        <Box>
        {q.map((data, i)=>{
            return(
                <>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Box>
                            <Typography variant="h3">{data}</Typography>
                            <Typography variant="h4">{qDes[i]}</Typography>
                            <Typography subtitle="h1">{qExplain[i]}</Typography>
                            <Input>{qInput[i]}</Input>
                        </Box>
                    </Grid>
                </Grid>
                </>
            )
        })}
        <Button variant="contained" onClick={()=>{navigate('/home/plan')}}>Next</Button>
        </Box>
        </>
    )
}

export default ToStart