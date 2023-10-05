import "./googlemap.css";
import "../App.css";
import RouteForm from "./routeForm.js";
import {Wrapper, Status} from "@googlemaps/react-wrapper";
import { useMemo, useState, useEffect, useRef } from "react";
import { Autocomplete ,withGoogleMap, GoogleMap, 
  LoadScript, MarkerF, useJsApiLoader,
  useLoadScript, InfoWindowF,
  DirectionsRenderer,
} from "@react-google-maps/api";
  import usePlacesAutocomplete,{
 getGeocode, getLatLng
} from "use-places-autocomplete";
import {
  Combobox, ComboboxInput, ComboboxPopover, 
  ComboboxList, ComboboxOption
} from "@reach/combobox";
import {makeStyles, Box, Container, Button, Paper, Typography,
useMediaQuery,ButtonGroup,
  } from '@material-ui/core';
import {Skeleton, FormControl} from '@mui/material';
//icons from material ui
import AddLocationIcon from '@material-ui/icons/AddLocation';
import DirectionsIcon from '@mui/icons-material/Directions';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import TrainIcon from '@mui/icons-material/Train';
import Planning from "./planning";

const useStyles = makeStyles({
    title: {
        color: 'white',
    },

})



export default function GMap({setCoordinates,setBounds,coordinates}) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyAY6AUO3bJvykH8YxldX-yppdDiNjJBYrI",
        // process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        libraries:["places"],
    });
 
    if (!isLoaded) return <Skeleton variant="rounded" animation="wave" style={{height:'100vh'}}></Skeleton>;
    return <Map 
      setCoordinates={setCoordinates}
      setBounds={setBounds}
      coordinates={coordinates}
    />;
};


function Map({setCoordinates,setBounds,coordinates}){
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)');
  const [click, setClick] = useState(0);
  const center = useMemo(() => ({lat: 44, lng: -80}), []);
  const [selected, setSelected] = useState({lat: 44, lng: -80}); //get address from toStart question. 
  const [userPlaces, setUserPlaces] = useState([]); //planning
  const [routeOn, setRouteOn] = useState('off');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const [markerList,setMarkerList] = useState([
     {lat: 59.2967322, lng: 18.0009393},
     { lat: 59.2980245, lng: 17.9971503},
     { lat: 59.2981078, lng: 17.9980875},
  ]);

  //Coordinates work
  const [mapref, setMapRef] = useState(null);
  const handleOnLoad = map => setMapRef(map);
  const handleCenterChanged = (props) =>{
    if(mapref){
      const newCenterLat = mapref.getCenter().lat();
      const newCenterLng = mapref.getCenter().lng();
      setCoordinates(coordinates = {lat:newCenterLat, lng:newCenterLng});
      // console.log(coordinates);
    }
  };
  
  const handleBoundChanged = (props) =>{
    if(mapref){
      const newBounds = mapref.getBounds();
      const newBoundNELat = newBounds.getNorthEast().lat();
      const newBoundNELng = newBounds.getNorthEast().lng();
      const newBoundSWLat = newBounds.getSouthWest().lat();
      const newBoundSWLng = newBounds.getSouthWest().lng();

      const ne = {lat:newBoundNELat, lng:newBoundNELng};
      const sw = {lat:newBoundSWLat, lng:newBoundSWLng};
      setBounds({ne, sw});
      // console.log({ne, sw}); //ne,sw
    }
  };

  //Make marker to the clicked position
  const handleOnClick = (e)=>{
    const clickPosition = {lat: e.latLng.lat(), lng:e.latLng.lng()};
    //need to make moving smooth
    setSelected(clickPosition);
  };


  async function calculateRoute(origin, destination){
  // eslint-disable-next-line no-undef
    const directionSevice = new google.maps.DirectionsService();
    const results = await directionSevice.route({
      // eslint-disable-next-line no-undef
      origin: origin,
      //new google.maps.LatLng(44,-80),
      // eslint-disable-next-line no-undef
      destination: destination,
      //new google.maps.LatLng(44.1, -80.1),
       // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.TRANSIT,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    console.log(duration)
  };

  function clearRoute(){
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setOrigin('');
    setDestination('');
  };


    return (
  <>
  
    <Box className="places-container">
      <PlacesAutocomplete setSelected={setSelected}/> 
    </Box>

    <GoogleMap
      zoom={13}
      center={selected}
      options={{disableDefaultUI: true}}
      mapContainerClassName="map-container"
      onLoad={handleOnLoad}
      onCenterChanged={handleCenterChanged}
      onBoundsChanged={handleBoundChanged}
      onClick={handleOnClick}
      >


{
  <MarkerF position={selected}/>
}

<ButtonGroup>
<Button onClick={()=>{setClick(click+1)}}>
  <DirectionsIcon/>ROUTE</Button>
<Button onClick={()=>{}}><AddLocationIcon/>ADD</Button>
</ButtonGroup>

{
  click % 2 === 1?     
  <Container className='route-form-container'>
  <FormControl>
    <PlacesAutocomplete setSelected={setOrigin}/>
    <PlacesAutocomplete setSelected={setDestination}/>
    
  </FormControl>
      <ButtonGroup>
        <Button onClick={()=>{calculateRoute(origin,destination)}}>calaulate</Button>
        <Button onClick={()=>{clearRoute()}}>clear</Button>
{/* drivind, walking, bicycling, trasit(출발/도착시간) */}
        <Button><DirectionsCarIcon/></Button>
        <Button><DirectionsWalkIcon/></Button>
        <Button><TrainIcon/></Button>
      </ButtonGroup>
      </Container>:null
}




{/* {
  markerList.map((marker)=>{
    return( <MarkerF position={marker}/>)
  })
} */}
  {directionsResponse && (<DirectionsRenderer directions={directionsResponse}/>)}


    </GoogleMap>
  </>
  );
};

const PlacesAutocomplete = ({setSelected}) => {
  //data back for UI
  const {
    ready,
    value,
    setValue,
    suggestions: {status, data},
    clearSuggestions,
  } = usePlacesAutocomplete();


  //change selection to lat & lng
  const handleSelect = async(address) => {
    setValue(address, false);
    clearSuggestions();

    //converting
    const results = await getGeocode({address});
    const {lat, lng} = await getLatLng(results[0]);
    setSelected({lat, lng}); 
  };

  return(
    <Combobox onSelect={handleSelect}>
      <ComboboxInput 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        disabled={!ready} 
        placeholder="search an address" 
        className="combobox-input"
      />
      {/* show results */}
        <ComboboxPopover>
          <ComboboxList className="combobox-list">
            
            {status === "OK" &&
              data.map(( {place_id, description})=>(
              <ComboboxOption key={place_id} value={description}
                className="combobox-option"
                
              />
              ))}
            
          </ComboboxList>
        </ComboboxPopover>
    </Combobox>
  );
};

// const ShowRouteCalInputs = (click, setClick) =>{
//   if(click % 2 === 1){
//     <RouteForm/>
//     setClick(click += 1);
//   };
  
// };