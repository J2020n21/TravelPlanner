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

    useEffect(()=>{
      // console.log("bounds sw"+bounds.sw.lat);
      getPlacesData(bounds.sw, bounds.ne)
      .then((data) => {
        // console.log(data);
        setApiPlaces(data);
      })
    },[coordinates, bounds]);

    // console.log(apiPlaces[0].name); //ok
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
            <List apiPlaces={apiPlaces}/>
          </Grid>
        </Grid>
      </>
    );
  }

