import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { CssBaseline, Grid, Typography } from "@material-ui/core";
import PlanCard from '../components/List/planCard.js';
import GMap from "../components/googlemap.js";
import List from "../components/List/list.js";
import {getPlacesData} from '../api/index.js'

export default function Plan(prop){
    const [apiPlaces, setApiPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});
    const [bounds, setBounds] = useState({lat: 0, lng: 0});

    // useEffect(()=>{

    // },[]);

    useEffect(()=>{
      console.log("coordinates and bound:");
      console.log(coordinates, bounds);

    //   getPlacesData(bounds.sw, bounds.ne)
    //   .then((data) => {
    //     console.log(data);
    //     setApiPlaces(data);
    //   })
    // },[coordinates, bounds]);
    });

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
            {/* <div>Map</div> */}
          </Grid>
          <Grid item xs={4}>
            <List/>
            {/* <div>List</div> */}
          </Grid>
        </Grid>
      </>
    );
  }

