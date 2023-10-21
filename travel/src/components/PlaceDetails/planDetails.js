import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Typography, 
Box,Button,
}
from '@material-ui/core';

export default function PlanDetails({id,places,userPlaces,setUserPlaces}) {

  const handleClick = (e)=>{
    let element = places.id
    // console.log(id);
    let copy = [...userPlaces];
    // console.log(places.id == id? "T":"F"); //T
    let newArr = copy.filter(element=> element==id)
    console.log({newArr});

    // setUserPlaces(copy);
    // console.log({userPlaces});
    //day에 상관없이 id가 들어갔음. 해당 id를 가진 요소 배열에서 삭제
  }

  return (
    <Card elevation={2} style={{ marginTop:'10px'}}>
    <CardMedia
      style={{height:0,}}
      // image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
      //title={place.name}
    />
    <CardContent>
      <Box >
        <div style={{width:'10vw', height:'8vw', background:'yellow', float:'right'}}>image</div>
      </Box>
      <Typography variant='h6'>{places&& places['name']? places['name'] :"Blank!"}</Typography>
      <Box >
        <Typography variant='subtitle1'>{places&& places['address']? places['address'] :"Blank!"}</Typography>
      </Box>
    </CardContent>

    <CardActions>
        <Button size="small" color="primary"
        onClick={(e)=>{handleClick(e)}}
        >Remove</Button>
    </CardActions>

  </Card>
  )
}
