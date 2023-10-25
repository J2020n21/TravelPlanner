import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Typography, 
Box,Button,
}
from '@material-ui/core';

export default function PlanDetails({id,dayIndex,places,userPlaces,setUserPlaces}) {
//id에 해당하는 obj를 제외한다
  const handleClick = (e)=>{
  let copy = [...userPlaces];
  let dayPlan = copy[dayIndex];
  let filtered = dayPlan.filter((ele)=> ele['id'] != places.id)
  copy[dayIndex] = filtered;
  setUserPlaces(copy);
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
