import React, {useState, useEffect} from 'react'
import PlanDetails from './PlaceDetails/planDetails';
import { Typography,Container,Box,Button } from '@material-ui/core';

export default function Planning({
  showAllPlan,
  userPlaces, setUserPlaces, placeIndex, day,
   setPlaceIndex,answer,focusedDay, setFocusedDay,dailyRoute, setDailyRoute,
  }) {

  const clickArray = Array(parseInt(day)).fill(0);
  const dayArray = Array.from({ length: day }, (_, index) => index);
  const [travelDay, setTravelDay] = useState(dayArray); //[]
  const [click,setClick] = useState(clickArray);

  const showArray = Array(day).fill(true);
  const [showPlaces,setShowPlaces] = useState(showArray); //state of showing each day plan (travel places)
  const [focusedRoute,setFocusedRoute] = useState(0);
  
  const [memo,setMemo] = useState(Array(day).fill(0));
  const [sMemo, setSMemo] = useState(Array(day).fill(false));
  const [memoClick, setMemoClick] = useState(clickArray);


  const storedPlaces = JSON.parse(localStorage.getItem('userPlaces'));

  useEffect(()=>{
    //conver format
    if(userPlaces.length){
    let copy = [...userPlaces]; 
    let dayPlan = copy[focusedRoute]; 
    let copyRoute = [...dailyRoute];
    copyRoute = dayPlan.map(val=>val.position); 
    setDailyRoute(dailyRoute = copyRoute);
    }
  },[userPlaces])

  useEffect(()=>{
    //convert format (to show dailyRoute)
    if(userPlaces){
      let copy = [...userPlaces]
      let newArr = copy[focusedRoute]
      let changeArr = newArr.map(ele => ({
        selected: ele.position.selected
      }))
      setDailyRoute(changeArr)
    }
  },[focusedRoute])

  useEffect(()=>{
    const obj = JSON.stringify(userPlaces)
    window.localStorage.setItem('userPlaces',obj)
    console.log({userPlaces})
  },[userPlaces])


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

  const showMemo = (index) =>{
    let copy =[...memoClick];
    copy[index] = copy[index] + 1; //index의 클릭에 +1
    setMemoClick(copy)
    console.log(memoClick)//n, NaN

    if(memoClick[index]%2 === 1){
      let copyplace =[...sMemo]; //보여줄 위치
      copyplace[index] = false;
      setSMemo(copyplace);
      console.log({sMemo})
    }
    else{      
      let copyplace =[...sMemo];
      copyplace[index] = true;
      setSMemo(copyplace);
      console.log({sMemo})
    }
  }

  const saveMemo = (dayIndex, written) =>{
    window.localStorage.setItem(dayIndex,written)
    let copy = [...memo];
    copy[dayIndex] = written;
    setMemo(copy);
  }


  return (
    <div style={{
      height:'90vh',
      overflowY:'scroll',
      display: showAllPlan? 'flex':'block',
      }}>
    {
      travelDay&& travelDay.map((item,dayIndex)=>{
        return( <div style={{marginBottom:'50px'}}>
          <Box key={dayIndex}  style={{marginTop:'20px', marginRight: showAllPlan? '20px':null}}>
            <Typography variant='h5'>Day {item+1}</Typography>
            <Button
             variant='outlined' color='primary' size='small'
             onClick={(e)=>{showPlan(dayIndex)}}> 
              { click[dayIndex]%2 === 1? "show":"fold" //no
              }
            </Button>
            <Button value={dayIndex} variant='outlined' color='primary' size='small'
            onClick={()=>{
              // console.log(dayIndex)
              showMemo(dayIndex)}} //no
            >Memo</Button>
            <Button value={dayIndex} color='primary' size='small'
            variant={focusedRoute == dayIndex?"contained":"outlined"}//click on-off
            onClick={()=>{
              setFocusedRoute(dayIndex) //ok
            }} 
            >Route</Button>
            <Button value={dayIndex} color='primary' size='small'
            variant={focusedDay == dayIndex?"contained":"outlined"}
            onClick={()=>{
              setFocusedDay(dayIndex); //ok
            }} 
            >Focus</Button>

    
            {sMemo[dayIndex]==true? 
              <Box>
                <textarea onChange={(e)=>{saveMemo(dayIndex, e.target.value)}}>
                {memo!=null? window.localStorage.getItem(dayIndex):null}</textarea>
              </Box>
              :null
            }

{/* userPlaces[dayIndex].length !== null && */}

            { userPlaces[dayIndex].length !== null &&showPlaces[dayIndex] === true?
              userPlaces[dayIndex].map((place,i)=>{
                return(
                <PlanDetails 
                dayIndex = {dayIndex}
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
