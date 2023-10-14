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
  //여행 장소 더미 데이터
  const [travelPlaces, setTravelPlaces] = useState([

  [
    {
      'name': 'Restaurant W1',
      'address':'somewhere',
      'picture':'url...',
      },
    {
        'name': 'Restaurant W2',
        'address':'somewhere',
        'picture':'url...',
        },
  ],


 [
    {
    'name': 'Hotel A1',
    'address':'somewhere lat, lng',
    'picture':'url...',
    },
    {
      'name': 'Hotel A2',
      'address':'somewhere',
      'picture':'url...',
      },

  ],

  
  ]);


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

  // console.log(userPlaces[0][0]['name']); //ok

  // const addPlace = (index) =>{
  //   let copy = [...travelPlaces];
  //   copy[index]
  //   setTravelPlaces()
  // };

// travelDay를 유저가 선택-> 장소추가
//버튼(day만큼 (기본:0번째)). day중 하나만 선택가능 (focused)

//console.log({userPlaces});

  return (
    <>
    {
      travelDay&& travelDay.map((item,dayIndex)=>{
        return( <>
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

            {/* {
              userPlaces[dayIndex].length !== null && showPlaces[dayIndex] === true? 
                userPlaces.map((innerArr, day)=>{ return(
                 innerArr&& innerArr.map((places,placeI)=>{return(
                  <div>element!,{placeI}</div>
                  //day가 안넘어감..
                  // <PlanDetails places={places}/>
                 )})
                )})
                 :null
            } */}
{/* item,dayIndex: 0,1,2 */}
            {
              <div>dayIndex:{dayIndex}</div>
            }

            { userPlaces[dayIndex].length !== null && showPlaces[dayIndex] === true?
              userPlaces[dayIndex].map((place,i)=>{return(
                <div>{place['name']}</div>
              )}) : null
            }

            
          </Box>
          </>          
        )
      })
    }

    </>
  )
}
