import React from "react";
import { useNavigate } from "react-router-dom";
import {Box, Button, Container,Grid,Typography, makeStyles} from '@material-ui/core';
import Search from '../components/search/search.js';

const useStyles = makeStyles({
    landing: {
        display: 'block',
        margin:'auto',
        textAlign: 'center',
        backgroundColor:'lightGrey',
    },

})

const Landing = () =>{
    const navigate = useNavigate();
    const classes = useStyles();

    return(
        <Box className={classes.landing}>
                    <Typography variant="h3">Design your travel</Typography>
                    <Typography variant="h1">Traveling</Typography>
                    <Typography variant="h6">To where?</Typography>
                    {/* <input></input> */}
                    <Button variant="contained" color="primary"
                    onClick={()=>{navigate('/toStart')}}>
                        NEXT
                    </Button>
                    {/* <Search/> */}
        </Box>
    )
}

// hook;픽사베이 api로 매번 다른 이미지 주소를 받아온다 > 해당 이미지를 내 페이지에 적용한다
// https://www.youtube.com/watch?v=dzOrUmK4Qyw&list=PLillGF-RfqbY3c2r0htQyVbDJJoBFE6Rb&index=4

export default Landing