import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { CssBaseline, Grid, Typography } from "@material-ui/core";
import PlanCard from '../components/List/planCard.js';
import GMap from "../googlemap.js";
import List from "../components/List/list.js";

export default function Plan(prop){
    return(
      <>
        <CssBaseline/>
        <Grid container spacing={3} style={{width: '100%'}}>
          <Grid item xs={8}>
            {/* <GMap/> */}
            <div>Map</div>
          </Grid>
          <Grid item xs={4}>
            <List/>
          </Grid>
        </Grid>
      </>
    );
  }

