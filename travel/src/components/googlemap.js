import "./googlemap.css";
import "../App.css";
import RouteForm from "./routeForm.js";
import {Wrapper, Status} from "@googlemaps/react-wrapper";
import { useMemo, useState, useEffect, useRef } from "react";
import { Autocomplete ,withGoogleMap, GoogleMap, 
  LoadScript, MarkerF, useJsApiLoader,
  useLoadScript, InfoWindowF,
  DirectionsRenderer,
  DirectionsService,
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
import Rating from '@material-ui/lab/Rating';
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



export default function GMap({setCoordinates,setBounds,coordinates,apiPlaces,setChildClicked}) {
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
      apiPlaces={apiPlaces}
      setChildClicked={setChildClicked}
    />;
};


function Map({setCoordinates,setBounds,coordinates,apiPlaces,setChildClicked}){
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
  const [placeMarker,setPlaceMarker] = useState('');
  const [transport,setTransport] = useState('TRANSIT');
  

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


  async function calculateRoute(origin, destination, transport){
    console.log(transport);
  // eslint-disable-next-line no-undef
    const directionSevice = new google.maps.DirectionsService();
    const results = await directionSevice.route({
      // eslint-disable-next-line no-undef
      origin: origin,
      // eslint-disable-next-line no-undef
      destination: destination,
       // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode[transport],
    },(res,status)=>{
      if(status !== 'OK'){
        window.alert("Directions request failed due to " + status);
      }
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  };

  function clearRoute(origin, destination, directionsResponse){
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
      
      // 누른 자식이 list의 어디에 있는지 파악
      //자식을 누르면... 몇번째 자식인지 알아내서 list에서
      //스크롤 계산-> 해당 위치로 이동
      >

{
  <MarkerF position={selected}/>
}

{
  apiPlaces&& apiPlaces.map((place,i)=>{

    const lat= Number(place['latitude'])
    const lng= Number(place['longitude'])
    const position = {lat,lng};
    const name = (place['name']);
    return(
<>
      <MarkerF position={position} 
        title={name}/>

      <InfoWindowF key={i} position={position}>
        <>

          <Typography variant="subtitle2">{name}</Typography>
          {/* <Button style={{float:'left'}}>detail</Button>
          <Button style={{float:'left'}}>Add</Button> */}
          <img 
            style={{clear:'both',width:'10vw',height:'10vh',cursor:'pointer'}}
            src={place.photo? place.photo.images.large.url:'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
          />
          <div></div>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
        </>
      </InfoWindowF>
</>
      )
  })
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
        <Button onClick={()=>{calculateRoute(origin,destination,transport)}}>calaulate</Button>
        <Button onClick={()=>{clearRoute(origin, destination, directionsResponse)}}>clear</Button>
        <ButtonGroup>
          <Button value="DRIVING" onClick={()=>{setTransport("DRIVING")}}><DirectionsCarIcon/></Button>
          <Button value="WALKING" onClick={()=>{setTransport("WALKING")}}><DirectionsWalkIcon/></Button>
          <Button value="TRANSIT" onClick={()=>{setTransport("TRANSIT")}}><TrainIcon/></Button>
        </ButtonGroup>
      </ButtonGroup>
      </Container>:null
}

{/* https://www.youtube.com/watch?v=VtsbYIMj9Xk */}
{/* 마커위치 -infoWindow = 소요시간 */}
  {directionsResponse && (<DirectionsRenderer directions={directionsResponse} />)}


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

