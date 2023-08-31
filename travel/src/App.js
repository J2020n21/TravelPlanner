import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import {Router, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
// import {useParams} from 'react-router-dom'
import './App.css';
import GMap from './googlemap.js';
import Landing from './pages/landing.js';
import Setting from './pages/setting';
import Complain from './pages/complain';
import ToStart from './pages/toStart';
import Map from './pages/map';
import Card from './pages/plan';
import CountryDropDown from "./components/country";
import {useState, useEffect} from 'react';
import {Wrapper, Status} from "@googlemaps/react-wrapper"; //google map


function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
    <Navbar bg="light" data-bs-theme="light">
    <Container>
      <Navbar.Brand onClick={()=>{navigate('/')}}>Start</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link onClick={()=>{navigate('/plan')}}>Plan</Nav.Link>
        <Nav.Link onClick={()=>{navigate('/map')}}>Maps</Nav.Link>
        <Nav.Link onClick={()=>{navigate('/setting')}}>Setting</Nav.Link>
      </Nav>
    </Container>
    </Navbar>


    {/* <Wrapper apiKey={"AIzaSyAY6AUO3bJvykH8YxldX-yppdDiNjJBYrI"}>
        <GMap/>
    </Wrapper>     */}

    

    <Routes>
      <Route path="/" element={<Landing/>}></Route>
      <Route path="/plan" element={
        <Container>
          <Card/>
        
        </Container>
        }></Route>
      <Route path="/map" element={<Map/>}></Route>
      <Route path="/setting" element={<Setting/>}> </Route>
      <Route path="/complain" element={<Complain/>}></Route>
      <Route path="/toStart" element={<ToStart/>}></Route>
{/* add outlet */}
      <Route path="*" element={<h1>Page Not Exist</h1>}></Route>
      <Route></Route>
    </Routes>
  
  </div>
  );
  


}


export default App;
