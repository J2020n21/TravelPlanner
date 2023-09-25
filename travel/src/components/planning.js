import React, {useState, useEffect} from 'react'
import PlanCard from './List/planCard'

export default function Planning() {
  //
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
    {'name': 'Hotel A'},
    {'name': 'Hotel B'},
    {'name': 'Hotel C'},
    {'name': 'Hotel D'},
  ]},
]);
//[ {'day':['name':'restA']}, 'day':['name':'hotelA']} ]
  console.log(travelPlaces[0]['day'][0]['name']); //= [n]th [day], [n]th [place's name]

  return (
    <>
    <p>"Planning places"</p>
      {
        travelPlaces?.map((item,index,arr)=>{
          <p>'hi'</p>
        })
      }
    </>
  )
}
