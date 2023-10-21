import React, {useState} from 'react'
import { CircularProgress, Grid, Typography, InputLabel,
  MenuItem, FormControl, Select,
  makeStyles, Container,
  Input
} from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails.js';

const useStyles = makeStyles({
    Fail: {
        size: '50px',
        color: 'grey',
    },

})

export default function List({apiPlaces, childClicked, type, setType, rating, setRating}) {
  const classes = useStyles();
  const [loding, setLoading] = useState(false);

  // console.log({childClicked});
  // console.log(childClicked);

  return (
    <Container>
      <Typography variant='h5'>Recommendation around</Typography>
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

{/* 로딩f>요청=로딩t>onload되면 로딩f */}
      <Grid style={{overflowY:'scroll', height:'100vh', marginTop:'20px'}} container spacing={3}>
        {apiPlaces.length? apiPlaces.map((place, index)=>(
          <Grid item key={index} xs={12}>
            <PlaceDetails place={place} index={index}/>
          </Grid>
        )):<h3 style={{color:'grey', textAlign:'center'}}>No Results Exist!</h3>}
      </Grid>

    </Container>
  );
}
