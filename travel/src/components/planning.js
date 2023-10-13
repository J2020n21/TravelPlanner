import React, {useState, useEffect} from 'react'
import PlanDetails from './PlaceDetails/planDetails';
import { Typography,Container,Box,Button } from '@material-ui/core';

export default function Planning({userPlaces, setUserPlaces, placeIndex, setPlaceIndex, answer}) {
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

// travelDay; 길이가 answer[2]인 배열을 0에서 1씩 증가하며 배열을 끝까지 채우기 

//console.log({userPlaces});

  return (
    <>
    {
      travelDay&& travelDay.map((item,index)=>{
        return(
          <Box key={index}  style={{marginTop:'20px'}}>
            <Typography variant='h5'>Day {item+1}</Typography>
            <Button
             variant='outlined' color='primary' size='small'
             onClick={(e)=>{showPlan(index)}}>
              { click[index]%2 === 1? "show":"fold"}
            </Button>
            <Button  variant='outlined' color='primary' size='small'
            onClick={()=>{
              // addPlace(index)
            }}
            >Memo</Button>
            <Button  variant='outlined' color='primary' size='small'
            onClick={()=>{
              // addPlace(index)
            }} 
            //daily route
            >Route</Button>

            {
              userPlaces[index].length !== null && showPlaces[index] === true? 
                userPlaces.map((innerArr, outerIndex)=>{return(
                  <>
                {/* <div>outerIndex:{outerIndex}</div> */}
                {
                  innerArr.map((item,i)=>{
                    return(
                    // <div>inner item: {item}</div>
                    console.log({item})
                    )})
                }
                </>
                //userPlace = [[여기{},{},{} ],[],[],[]]
                //userPlace[index]안의 갯수를 세야함
                //userPlace[index] = [[{},{}],[],[]]
                // console.log(userPlaces[index].length)
                // console.log({item},{i},{userPlaces})
                // <PlanDetails places={userPlaces} day={index} index={i}/>
              
              // userPlaces.map((item,i)=>{return(
                )}) :null
            }
          </Box>
          
        )
      })
    }

    </>
  )
}
