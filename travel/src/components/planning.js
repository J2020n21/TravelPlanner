import React, {useState, useEffect} from 'react'
import PlanDetails from './PlaceDetails/planDetails';
import { Typography,Container,Box,Button } from '@material-ui/core';

export default function Planning({userPlaces, setUserPlaces}) {
  const [click,setClick] = useState([0,0]);
  const [showPlaces,setShowPlaces] = useState([true,true]); //state of showing each day plan (travel places)
  //장소추가 버튼=>해당 장소 form에 맞게 저장 => display
  //장소별 : 장소 이름,주소,사진 + 순서부여, (개인 메모)
  //버튼 -> api 전달 -> 저장 -> display
  const [travelDay, setTravelDay] = useState([1,2]); 
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


  // const addPlace = (index) =>{
  //   let copy = [...travelPlaces];
  //   copy[index]
  //   setTravelPlaces()
  // };

  return (
    
    <>
    {
      travelDay&& travelDay.map((item,index)=>{
        return(
          <Box key={index}  style={{marginTop:'20px'}}>
            <Typography variant='h5'>Day {item}</Typography>
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
            >Route</Button>

            {
              travelPlaces && showPlaces[index] === true? travelPlaces.map((item,i)=>{return(
                // console.log({item})
                <PlanDetails places={travelPlaces} day={index} index={i}/>
              )}) :null
            }
          </Box>
          
        )
      })
    }

    </>
  )
}
