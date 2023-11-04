import React from 'react'
import {Box, Container, Typography, Card, Button, CardMedia, 
CardContent, CardActions, Chip,
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles';

const PlaceDetails = ({place}) => {
  const classes = useStyles();

  return (
    <Card elevation={7}>
      <CardMedia
        style={{height:200}}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5'>{place.name}</Typography>
        <Box display="flex" justifyContent="space-between">
        <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.price_level? place.price_level:"No info"}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
        </Box>
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place.address && (
          <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
            <Typography>{place.address}</Typography>
          </Typography>
        )}
        {place.phone && (
          <Typography variant="subtitle2" color="textSecondary" className={classes.spacing}>
            <Typography>{place.phone}</Typography> 
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
        <Button size="small" color="primary" onClick={() => {console.log(place.name)}}>
          Add to Plan
        </Button>
      </CardActions>

    </Card>
  );
}
 export default PlaceDetails;