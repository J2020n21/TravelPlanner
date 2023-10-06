import React, {useState, useEffect} from 'react'
import PlanDetails from './PlaceDetails/planDetails';
import { Typography,Container,Box,Button } from '@material-ui/core';

export default function Planning() {
  const [click,setClick] = useState(0);
  const [showPlaces,setShowPlaces] = useState('펴기');
  //장소추가 버튼=>해당 장소 form에 맞게 저장 => display
  //장소별 : 장소 이름,주소,사진 + 순서부여, (개인 메모)
  //버튼 -> api 전달 -> 저장 -> display
  const [travelDay, setTravelDay] = useState([1,2]);
  const [priority, setPriority] = useState(null);
  const [travelPlaces, setTravelPlaces] = useState([
  {
  'day': [
    {
      'name': 'Restaurant W',
      'address':'somewhere',
      'picture':'url...',
      },
  ]},

  {
  'day': [
    {
    'name': 'Hotel A',
    'address':'somewhere',
    'picture':'url...',
    },
    {
      'name': 'Hotel s',
      'address':'somewhere',
      'picture':'url...',
      },
      {
        'name': 'Hotel k',
        'address':'somewhere',
        'picture':'url...',
        },
  ]},
  ]);
//[ {'day':['name':'restA']}, 'day':['name':'hotelA']} ]
  // console.log(travelPlaces[0]['day'][0]['name']); //= [n]th [day], [n]th [place's name]
// = restaurant A

  const showPlan = () =>{
    setClick(click+1)
    click%2 === 1? setShowPlaces('펴기'): setShowPlaces('접기')
    console.log(showPlaces);
  }

  return (
    <>
    {
      travelDay&& travelDay.map((item,index)=>{
        return(
          <Box key={index}>
            <Typography variant='h5'>Day {item}</Typography>
            <Button onClick={showPlan}>{showPlaces}</Button>
            {
              showPlaces === '펴기'? <div>폈다</div>:null
            }
          </Box>
          
        )
      })
    }

      {/* <p>{travelPlaces[1]['day'][0]['name']}</p>
      <p>{travelPlaces[1]['day'][0]['address']}</p>
      <p>{travelPlaces[1]['day'][0]['picture']}</p> */}
      {/* 
      <PlanDetails place={travelPlaces}/>
      <PlanDetails place={travelPlaces}/> */}

    </>
  )
}
