import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Navbar, Container, Nav} from 'react-bootstrap'

function Card(prop){
    return(
      <>
      <Container>
        <h2>Day N</h2>
        <div>
          <h3>Place</h3>
          <p>Specific location</p>
          <img/>
        </div>
        <Button>BTN</Button>
      </Container>
      </>
    )
  }

export default Card