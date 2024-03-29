import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CssBaseline, Grid, Typography, Container,Box,Button} from "@material-ui/core";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; //<
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';// >
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
    // JSON.stringify(localStorage.setItem)
    const dayArr = Array.from({ length: day }, () => []);  //[[]]
    const storedPlaces = JSON.parse(window.localStorage.getItem('userPlaces'));
    // console.log({storedPlaces})//ok
    const [userPlaces, setUserPlaces] = useState(storedPlaces||dayArr); //문제부분
    const [placeIndex, setPlaceIndex] = useState(0);
    const [focusedDay, setFocusedDay] = useState(0);
    const [dailyRoute, setDailyRoute] = useState([]); //arr, position for route

    const [showAllPlan, setShowAllPlan] = useState(false);
    const [allPlanClick, setAllPlanClick] = useState(0);


    useEffect(()=>{
      const filteredPlaces = apiPlaces.filter((place)=>Number(place.rating) > rating);
      setFilteredPlaces(filteredPlaces);
    },[rating]);



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
      setApiPlaces('');
    }


    const showAllPlanf = () =>{
      let copy = allPlanClick
      setAllPlanClick(copy + 1)
      if(allPlanClick%2 == 1) setShowAllPlan(false)
      else setShowAllPlan(true)
      console.log(showAllPlan)
    }

    return(
      <>  
        <CssBaseline/>
        <Grid container spacing={3} style={{width: '100%'}}>
          <Grid item xs={showAllPlan===true?4:8}>
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
          <Grid item xs={showAllPlan===true?8:4}>
          <Button variant="contained" color="primary" className="btn-plan" onClick={()=>{changeStatus();}}>{status}</Button> 
            { 
              status === 'plan'? 
              <> <Button onClick={showAllPlanf}>{showAllPlan===true?<ArrowForwardIosIcon/>:<ArrowBackIosIcon/>}</Button>
                <Planning
                  showAllPlan={showAllPlan}
                  userPlaces={userPlaces}
                  setUserPlaces={setUserPlaces}

                  placeIndex={placeIndex}
                  setPlaceIndex={setPlaceIndex}

                  answer={answer}
                  day={day}
                  dayArr={dayArr}

                  focusedDay={focusedDay}
                  setFocusedDay={setFocusedDay}
                  dailyRoute={dailyRoute}
                  setDailyRoute={setDailyRoute}
              />
              </> :
                
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

