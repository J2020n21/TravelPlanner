import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import PlanCard from '../components/planCard.js';

export default function Plan(prop){
    return(
      <>
        <div>plan page</div>
        <PlanCard/>
        
      </>
    )
  }

