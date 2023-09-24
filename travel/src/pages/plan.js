import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { CssBaseline, Grid, Typography } from "@material-ui/core";
import PlanCard from '../components/List/planCard.js';
import GMap from "../components/googlemap.js";
import List from "../components/List/list.js";
import {getPlacesData} from '../api/index.js'
import planning from "../components/planning.js";
import { Button } from "react-bootstrap";

export default function Plan(prop){
    const [status, setStatus] = useState('plan');
    const [clickCount, setClickCount] = useState(0);
    const [apiPlaces, setApiPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});
    const [bounds, setBounds] = useState({lat: 0, lng: 0});

    useEffect(()=>{
      // console.log("bounds sw"+bounds.sw.lat);
      getPlacesData(bounds.sw, bounds.ne)
      .then((data) => {
        // console.log(data);
        setApiPlaces(data);
      })
    },[coordinates, bounds]);


    return(
      <>
      <Button onClick={()=>{
          setClickCount(clickCount + 1);
          clickCount % 2 === 0? setStatus('rec'): setStatus('plan');
        }}>change</Button>
        
        <CssBaseline/>
        <Grid container spacing={3} style={{width: '100%'}}>
          <Grid item xs={8}>
            <GMap
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
            />
          </Grid>
          <Grid item xs={4}>
            {
              status === 'plan'? <p>plan</p> :<List apiPlaces={apiPlaces}/>
            }
          </Grid>
        </Grid>
      </>
    );
  }

