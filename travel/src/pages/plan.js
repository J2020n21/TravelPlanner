import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { CssBaseline, Grid, Typography, Container,Box,Button} from "@material-ui/core";
import PlanCard from '../components/List/planCard.js';
import GMap from "../components/googlemap.js";
import List from "../components/List/list.js";
import {getPlacesData} from '../api/index.js'
import Planning from "../components/planning.js";
import OpenAi from "../api/openAi.js";
import '../App.css';

export default function Plan({answer}){
    const [status, setStatus] = useState('plan');
    const [clickCount, setClickCount] = useState(0);
    const [apiPlaces, setApiPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});
    const [bounds, setBounds] = useState({lat: 0, lng: 0});
    const [chlidCliked, setChildClicked]= useState(null);

    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [aiPlaces, setAiPlaces] = useState([])

    const day = answer[1];
    const dayArr = Array.from({ length: day }, () => []);  //[[]]
    const [userPlaces, setUserPlaces] = useState(dayArr); //seleted position
    const [placeIndex, setPlaceIndex] = useState(0);
    const [focusedDay, setFocusedDay] = useState(0);
    const [dailyRoute, setDailyRoute] = useState([]); //arr, position for route


    useEffect(()=>{
      const filteredPlaces = apiPlaces.filter((place)=>Number(place.rating) > rating);
      setFilteredPlaces(filteredPlaces);
    },[rating]);

    useEffect(()=>{
      // dailyRoute가 바뀔때마다 마커 위치 날짜에 따라 바뀜
    },[dailyRoute])

    const changeStatus = () =>{
      setClickCount(clickCount + 1);
      var remainder = clickCount % 3; //0 plan 1 recommend 2 ai
      if(remainder === 0){
        return(setStatus('AI'))
      } else if (remainder == 1){
        return(setStatus('recommend'))
      } else if ( remainder ==2){
        return(setStatus('plan'))
      }
      // clickCount % 2 === 0? setStatus('recommend'): setStatus('plan');
    }

    const requestRec = ()=>{
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          console.log(data);
          setApiPlaces(data);
          setFilteredPlaces([]);
        })
  }
    const clearRec = () =>{
      setApiPlaces(null);
    }
    

    return(
      <>  
        <CssBaseline/>
        <Grid container spacing={3} style={{width: '100%'}}>
          <Grid item xs={8}>
            <GMap
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              apiPlaces={filteredPlaces.length? filteredPlaces:apiPlaces}
              setChildClicked={setChildClicked}

              userPlaces={userPlaces}
              setUserPlaces={setUserPlaces}

              placeIndex={placeIndex}
              setPlaceIndex={setPlaceIndex}

              focusedDay={focusedDay}
              setFocusedDay={setFocusedDay}

              dailyRoute = {dailyRoute}

              aiPlaces={aiPlaces}
            />
          </Grid>
          <Grid item xs={4}>
          <Button variant="contained" color="primary" className="btn-plan" onClick={()=>{changeStatus();}}>{status}</Button> 
            { 
              status === 'plan'? 
                <Planning
                  userPlaces={userPlaces}
                  setUserPlaces={setUserPlaces}

                  placeIndex={placeIndex}
                  setPlaceIndex={setPlaceIndex}

                  answer={answer}

                  focusedDay={focusedDay}
                  setFocusedDay={setFocusedDay}
                  dailyRoute={dailyRoute}
                  setDailyRoute={setDailyRoute}
              /> :
                
                status === 'recommend'?
                  <>
                    <Button variant="contained" color="secondary" onClick={requestRec}>Recommendation Request</Button>
                    <Button variant="contained" color="default" onClick={clearRec}>Clear</Button>
                    <List apiPlaces={filteredPlaces.length? filteredPlaces:apiPlaces}
                          chlidCliked={chlidCliked}
                          type={type}
                          setType={setType}
                          rating={rating}
                          setRating={setRating}            
                  /></>
                :

                  //status ==='AI'
                <div>
                  <OpenAi 
                    aiPlaces = {aiPlaces}
                    setAiPlaces = {setAiPlaces}
                  />
                </div>
                
               
            }

          </Grid>
        </Grid>
      </>
    );
  }

