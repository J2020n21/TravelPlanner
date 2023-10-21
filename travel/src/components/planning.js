import React, {useState, useEffect} from 'react'
import PlanDetails from './PlaceDetails/planDetails';
import { Typography,Container,Box,Button } from '@material-ui/core';

export default function Planning({userPlaces, setUserPlaces, placeIndex, setPlaceIndex, answer, focusedDay, setFocusedDay}) {
  const day = Number(answer[1]);
  const clickArray = Array(day).fill(0);
  const dayArray = Array.from({ length: day }, (_, index) => index);
  const [travelDay, setTravelDay] = useState(dayArray); 
  const [click,setClick] = useState(clickArray);

  const showArray = Array(day).fill(true);
  const [showPlaces,setShowPlaces] = useState(showArray); //state of showing each day plan (travel places)
  const [priority, setPriority] = useState(null);

  const [removeNum, setRemoveNum] = useState(null);


  const showPlan = (index) =>{
    let copy =[...click];
    copy[index] = copy[index] + 1;
    setClick(copy)
    console.log({click});

    if(click[index]%2 === 1){
      let copyplace =[...showPlaces];
      copyplace[index] = true;
      setShowPlaces(copyplace);
    }
    else{      
      let copyplace =[...showPlaces];
      copyplace[index] = false;
      setShowPlaces(copyplace);
    }
    // click[index]%2 === 1? setShowPlaces(false): setShowPlaces(true);
  };

  // const removePlace = (id) =>{
  //   if(userPlaces){
  //   const newArr = delete userPlaces[focusedDay][id]
  //   setUserPlaces(newArr);
  //   console.log({userPlaces});
  //   //1.요소의 key값 쓸것이냐? or placeIndex(id)값 쓸것이냐? !!
  //   //id(=placeIndex)를 카드에서 넘겨받고, id와 일치하는 번호의 요소를 u.p에서 없얜다
  //   }
  // };

  return (
    <div style={{height:'90vh', overflowY:'scroll'}}>
    {
      travelDay&& travelDay.map((item,dayIndex)=>{
        return( <div style={{marginBottom:'50px'}}>
          <Box key={dayIndex}  style={{marginTop:'20px'}}>
            <Typography variant='h5'>Day {item+1}</Typography>
            <Button
             variant='outlined' color='primary' size='small'
             onClick={(e)=>{showPlan(dayIndex)}}>
              { click[dayIndex]%2 === 1? "show":"fold"}
            </Button>
            <Button  variant='outlined' color='primary' size='small'
            onClick={()=>{
              // daily memo
            }}
            >Memo</Button>
            <Button  variant='outlined' color='primary' size='small'
            onClick={()=>{
              // show daily route
            }} 
            >Route</Button>
            <Button value={dayIndex} color='primary' size='small'
            variant={focusedDay == dayIndex?"contained":"outlined"}
            onClick={(e)=>{
              setFocusedDay(dayIndex);
            }} 
            >Focus</Button>

            { userPlaces[dayIndex].length !== null && showPlaces[dayIndex] === true?
              userPlaces[dayIndex].map((place,i)=>{
                return(
                <PlanDetails 
                setUserPlaces = {setUserPlaces}
                userPlaces = {userPlaces}
                key={place.id} id={place.id}
                places={place}/>
              )}) : null
            }
            
          </Box>
          </div>          
        )
      })
    }

    </div>
  )
}
