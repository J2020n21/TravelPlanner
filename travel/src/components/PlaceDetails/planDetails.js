import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Typography, 
Box,Button,
}
from '@material-ui/core';

export default function PlanDetails(place) {

  return (
    <Card elevation={2}>
    <CardMedia
      style={{height:0}}
      image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
      title={place.name}
    />
    <CardContent>
      <Box >
        <div style={{width:'10vw', height:'8vw', background:'yellow', float:'right'}}>image</div>
      </Box>
      <Typography variant='h6'>Place name</Typography>
      <Box >
        <Typography variant='subtitle1'>Address</Typography>
      </Box>
      <Box >
        <Typography variant='subtitle1'>★4.0</Typography>
      </Box>

    </CardContent>

    <CardActions>
        <Button size="small" color="primary">Memo</Button>
        <Button size="small" color="primary">Remove</Button>
    </CardActions>

  </Card>
  )
}
