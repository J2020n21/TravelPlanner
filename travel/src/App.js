import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import {Router, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
// import {useParams} from 'react-router-dom'
import './App.css';
import NavBar from './components/navbar.js';
import GMapSet from './googlemap.js';
import Landing from './pages/landing.js';
import Home from './pages/home.js';
import Setting from './pages/setting';
import Complain from './pages/complain';
import ToStart from './pages/toStart';
import Map from './pages/map';
import Card from './pages/plan';
import CountryDropDown from "./components/country";
import {useState, useEffect} from 'react';
import {Wrapper, Status} from "@googlemaps/react-wrapper"; //google map
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function App() {
  const navigate = useNavigate();
  const googleMapKey = "AIzaSyAY6AUO3bJvykH8YxldX-yppdDiNjJBYrI";

  return (
    <div className="App"> 

    <Routes>
      <Route path="/" element={<Landing/>}/>  
      <Route path="/toStart" element={<ToStart/>}/>

      <Route path="/home" element={<Home/>}> {/* Home includes menu */}
        <Route path="" element={
          <div>
            <Wrapper apiKey={googleMapKey}>
              <GMapSet/>
            </Wrapper>
            <Outlet></Outlet>
          </div>}>
          <Route path="plan" element={<Card/>}/>
          <Route path="map" element={<Map/>}/>
        </Route>  
        
          <Route path="setting" element={<Setting/>}/>
          <Route path="complain" element={<Complain/>}/>
          <Route path="*" element={<h1>Page Not Exist</h1>}/>
      </Route>
    </Routes>
  
  </div>
  );
  
// https://hsly22xk.tistory.com/405
// https://www.crocus.co.kr/1814

}


export default App;
