import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Button, Card, Box} from '@material-ui/core';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import {Router, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
// import {useParams} from 'react-router-dom'
import './App.css';
// import PlanCard from "./components/planCard";
// import MyNavBar from './components/navbar.js';
import GMap from './components/googlemap.js';
import Landing from './pages/landing.js';
import Home from './pages/home.js';
import Setting from './pages/setting';
import Complain from './pages/complain';
import ToStart from './pages/toStart';
import Map from './pages/map';
import Plan from './pages/plan';
import AnimationTest from "./pages/animationTest";
import {useState, useEffect} from 'react';
import {Wrapper, Status} from "@googlemaps/react-wrapper"; //google map
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { CssBaseline, Grid } from "@material-ui/core";

function App() {
  const navigate = useNavigate();
  const [answer,setAnswer] = useState(["",1,"yes"]); //day-number변환

  return (
    <>
    <div className="App" style={{overflow:'hidden', height:'100vh'}}> 
    <CssBaseline/>
    <Routes>
      <Route path="/" element={<Landing/>}/>  
      <Route path="/test" element={<AnimationTest/>}/>
      <Route path="/toStart" element={<ToStart answer={answer} setAnswer={setAnswer}/>}/>

      <Route path="/testMap" element={<GMap/>}/>

      <Route path="/home" element={<Home/>}> {/* Home includes menu */}
          
          <Route path="" element={<>
            <Outlet></Outlet>
            </>}>
              
            <Route path="plan" element={<>
              <Plan answer={answer}/>
              </>
              }/>
            <Route path="map" element={<Map/>}/>
          </Route>  
        
          <Route path="setting" element={<Setting/>}/>
          <Route path="complain" element={<Complain/>}/>
          <Route path="*" element={<h1>Page Not Exist</h1>}/>
      </Route>
    </Routes>
  
  </div>
  </>
  );
  
// https://hsly22xk.tistory.com/405
// https://www.crocus.co.kr/1814

}


export default App;
