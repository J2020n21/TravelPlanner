import React, {useState, useEffect} from 'react'
import PlanDetails from './PlaceDetails/planDetails';
import { Typography,Container,Box,Button } from '@material-ui/core';

export default function Planning({
  showAllPlan,
  userPlaces, setUserPlaces, placeIndex,
   setPlaceIndex, answer, focusedDay, setFocusedDay,dailyRoute, setDailyRoute,
  }) {
  const day = Number(answer[1]);
  const clickArray = Array(day).fill(0);
  const dayArray = Array.from({ length: day }, (_, index) => index);
  const [travelDay, setTravelDay] = useState(dayArray); 
  const [click,setClick] = useState(clickArray);

  const showArray = Array(day).fill(true);
  const [showPlaces,setShowPlaces] = useState(showArray); //state of showing each day plan (travel places)
  const [focusedRoute,setFocusedRoute] = useState(0);
  
  const [memo,setMemo] = useState(Array(day).fill(0));
  const [sMemo, setSMemo] = useState(Array(day).fill(false));
  const [memoClick, setMemoClick] = useState(clickArray);

  useEffect(()=>{
    //return arr of the positions (in a day) to dailyRoute
    if(userPlaces.length){
    let copy = [...userPlaces]; //전체
    let dayPlan = copy[focusedRoute]; //day []
    
    let copyRoute = [...dailyRoute];// 기존 루트
    copyRoute = dayPlan.map(val=>val.position); //변환
    setDailyRoute(dailyRoute = copyRoute);
    // console.log({dailyRoute});
    }
  },[userPlaces])

  useEffect(()=>{
    //userPlaces[[{position:{selected:{lat,lng}}},{}], []],
    //!dailyRoute: [{selected:{lat,lng}},{}]
    if(userPlaces){
      let copy = [...userPlaces]
      let newArr = copy[focusedRoute]
      let changeArr = newArr.map(ele => ({
        selected: ele.position.selected
      }))
      // console.log(changeArr)
      // console.log(dailyRoute)
      setDailyRoute(changeArr)
    }
  },[focusedRoute])

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
 

  const showDailyRoute = (dayIndex) =>{
    //return arr of the positions (in a day) to dailyRoute
    let copy = [...userPlaces]; //전체
    let dayPlan = copy[dayIndex]; //day []
    
    let copyRoute = [...dailyRoute];// 기존 루트
    copyRoute = dayPlan.map(val=>val.position); //변환
    setDailyRoute(dailyRoute = copyRoute);
    console.log({dailyRoute});
    //add/remove일어나면 route가 갱신이 안된다! 한박자 느리다
    //useEffect
  };

  const showMemo = (index) =>{
    let copy =[...memoClick];
    copy[index] = copy[index] + 1; //index의 클릭에 +1
    setMemoClick(copy)
    console.log("use: "+copy)

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
              { click[dayIndex]%2 === 1? "show":"fold"}
            </Button>
            <Button value={dayIndex} variant='outlined' color='primary' size='small'
            onClick={()=>{
              showMemo(dayIndex)}}
            >Memo</Button>
            <Button value={dayIndex} color='primary' size='small'
            variant={focusedRoute == dayIndex?"contained":"outlined"}//click on-off
            onClick={()=>{
              setFocusedRoute(dayIndex) //n번째 날의 route버튼 표시
            }} 
            // 변경이 있을 경우에만 re-render되는데 버튼 클릭만으로는 어떠한 변경이 없음
            //버튼을 누르면 > 해당 dayIndex의 dR을 바로 보여줄 수 있도록 해야함
            //1.plan으로 f.r을 넘겨준다.(일자) >plan에서 useEffect로 바로 day변동을 캐치>맵에서 해당day의 루트를 보여준다
            >Route</Button>
            <Button value={dayIndex} color='primary' size='small'
            variant={focusedDay == dayIndex?"contained":"outlined"}
            onClick={()=>{
              setFocusedDay(dayIndex);
            }} 
            >Focus</Button>

    
            {sMemo[dayIndex]==true? 
              <Box>
                <textarea onChange={(e)=>{saveMemo(dayIndex, e.target.value)}}>
                {memo!=null? window.localStorage.getItem(dayIndex):"wrong"}</textarea>
              </Box>
              :null
            }

            { userPlaces[dayIndex].length !== null && showPlaces[dayIndex] === true?
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
