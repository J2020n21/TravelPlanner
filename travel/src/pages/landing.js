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
    textWrap: {
        position: 'absolute', 
        left: '0', right: '0', margin: 'auto',
        color:'white',
        width: '500px',
        height: '500px',
        border:'3px solid white',
        marginTop:'10%', 
        paddingTop:'5vw'
    },
    border: {
        width: '500px',
        height: '500px',
        border:'3px solid white',
        paddingTop: '50px'
    },

})

const Landing = () =>{
    const navigate = useNavigate();
    const classes = useStyles();

    return(
        <>
        
        <Box className={classes.landing}>
            
            <Box className={classes.textWrap}>

                <Typography variant="h3">Design your travel</Typography>
                <Typography variant="h1">Traveling</Typography>
                <Typography variant="h6">To where?</Typography>
                {/* <input></input> */}
                <Button variant="contained" color="primary"
                onClick={()=>{navigate('/toStart')}}>
                    NEXT
                </Button>
              
            </Box>
            <Search/>
        </Box>
        </>
    )
}

export default Landing