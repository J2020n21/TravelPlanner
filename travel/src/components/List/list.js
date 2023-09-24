import React, {useState} from 'react'
import { CircularProgress, Grid, Typography, InputLabel,
  MenuItem, FormControl, Select,
  makeStyles, Container,
  Input
} from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails.js';

const useStyles = makeStyles({
    loading: {
        color: 'white',
    },

})

export default function List({apiPlaces}) {
  const classes = useStyles();
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  // const apiPlaces = [
  //   {name:'a'},
  //   {name:'b'},
  //   {name:'a'},
  //   {name:'bdd'},
  // ];

  return (
    <Container>
      <Typography variant='h5'>Restaurants, Hotels and Attractions around</Typography>
      <FormControl >
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e)=>setType(e.target.value)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl >
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {apiPlaces&& apiPlaces.map((place, index)=>(
          <Grid item key={index} xs={12}>
            <PlaceDetails place={place} index={index}/>
          </Grid>
        ))}
      </Grid>

    </Container>
  );
}
