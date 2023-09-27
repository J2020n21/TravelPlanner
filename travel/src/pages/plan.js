import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { CssBaseline, Grid, Typography } from "@material-ui/core";
import PlanCard from '../components/List/planCard.js';
import GMap from "../components/googlemap.js";
import List from "../components/List/list.js";
import {getPlacesData} from '../api/index.js'
import Planning from "../components/planning.js";
import { Button } from "react-bootstrap";
import '../App.css';

export default function Plan(prop){
    const [status, setStatus] = useState('plan');
    const [clickCount, setClickCount] = useState(0);
    const [apiPlaces, setApiPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});
    const [bounds, setBounds] = useState({lat: 0, lng: 0});

    const changeStatus = () =>{
      setClickCount(clickCount + 1);
      clickCount % 2 === 0? setStatus('rec'): setStatus('plan');
    }

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
          <Button className="btn-plan" onClick={()=>{changeStatus();}}>{status}</Button> 
            {
              status === 'plan'? <Planning/> :<List apiPlaces={apiPlaces}/>
            }
          </Grid>
        </Grid>
      </>
    );
  }

