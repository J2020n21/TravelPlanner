import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { CssBaseline, Grid, Typography, Container,Box,Button} from "@material-ui/core";
import PlanCard from '../components/List/planCard.js';
import GMap from "../components/googlemap.js";
import List from "../components/List/list.js";
import {getPlacesData} from '../api/index.js'
import Planning from "../components/planning.js";
// import { Button} from "react-bootstrap";
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

    // userplace[][][] <day만큼 생성. day focus만들어서, [{},{}] 장소 추가.
    //  const initialState = Array.from({ length: n }, () => []); 
    const day = answer[1];
    const dayArr = Array.from({ length: day }, () => []);  //[[]]
    console.log({dayArr});
    const [userPlaces, setUserPlaces] = useState(dayArr); //seleted position
    const [placeIndex, setPlaceIndex] = useState(0);
    
    console.log({userPlaces});

    useEffect(()=>{
      const filteredPlaces = apiPlaces.filter((place)=>Number(place.rating) > rating);
      setFilteredPlaces(filteredPlaces);
    },[rating]);

    const changeStatus = () =>{
      setClickCount(clickCount + 1);
      clickCount % 2 === 0? setStatus('recommend'): setStatus('plan');
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
                  
              /> :
              <>
               <Button variant="contained" color="secondary" onClick={requestRec}>Recommendation Request</Button>
                <Button variant="contained" color="default" onClick={clearRec}>Clear</Button>
                <List apiPlaces={filteredPlaces.length? filteredPlaces:apiPlaces}
                      chlidCliked={chlidCliked}
                      type={type}
                      setType={setType}
                      rating={rating}
                      setRating={setRating}            
                />
               
              </>
            }
          </Grid>
        </Grid>
      </>
    );
  }

