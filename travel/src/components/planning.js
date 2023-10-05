import React, {useState, useEffect} from 'react'
import PlanCard from './List/planCard'

export default function Planning() {
  //장소추가 버튼=>해당 장소 form에 맞게 저장 => display
  //장소별 : 장소 이름,주소,사진 + 순서부여, (개인 메모)
  //버튼 -> api 전달 -> 저장 -> display
  const [travelDay, setTravelDay] = useState(4);
  const [priority, setPriority] = useState(null);
  const [travelPlaces, setTravelPlaces] = useState([
  {
  'day': [
    {'name': 'Restaurants A'},
    {'name': 'Restaurants B'},
    {'name': 'Restaurants C'},
    {'name': 'Restaurants D'},
  ]},

  {
  'day': [
    {
    'name': 'Hotel A',
    'address':'somewhere',
    'picture':'url...',
  },
    {'name': 'Hotel B'},
    {'name': 'Hotel C'},
    {'name': 'Hotel D'},
  ]},
]);
//[ {'day':['name':'restA']}, 'day':['name':'hotelA']} ]
  // console.log(travelPlaces[0]['day'][0]['name']); //= [n]th [day], [n]th [place's name]
// = restaurant A
  return (
    <>
    <p>"Planning places"</p>
      {/* {
        travelPlaces && travelPlaces.map((item, index)=>{
          <p>{}</p>
        })
      } */}
      <p>{travelPlaces[1]['day'][0]['name']}</p>
      <p>{travelPlaces[1]['day'][0]['address']}</p>
      <p>{travelPlaces[1]['day'][0]['picture']}</p>
    </>
  )
}
