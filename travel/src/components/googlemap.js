import "./googlemap.css";
import "../App.css";
import {Wrapper, Status} from "@googlemaps/react-wrapper";
import { useMemo, useState, useEffect, useRef, componentDidUpdate } from "react";
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

export default function GMap({setCoordinates,setBounds,coordinates,apiPlaces,setChildClicked,userPlaces,setUserPlaces, placeIndex, setPlaceIndex,focusedDay, setFocusedDay, dailyRoute}) {
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
      
      userPlaces={userPlaces}
      setUserPlaces={setUserPlaces}
      placeIndex={placeIndex}
      setPlaceIndex={setPlaceIndex}
      focusedDay={focusedDay}
      setFocusedDay={setFocusedDay}
      dailyRoute={dailyRoute}
    />;
};

function Map({setCoordinates,setBounds,coordinates,apiPlaces,setChildClicked,setUserPlaces,userPlaces, placeIndex, setPlaceIndex,focusedDay, setFocusedDay, dailyRoute}){
  const isMobile = useMediaQuery('(min-width:600px)');
  const [click, setClick] = useState(0);
  const center = useMemo(() => ({lat: 44, lng: -80}), []);
  const [selected, setSelected] = useState({lat: 44, lng: -80}); //get address from toStart question. 

  const [routeOn, setRouteOn] = useState('off');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isStopOver, setIsStopOver] = useState(0); //경유지 갯수
  const [stopOver, setStopOver] = useState([]); //각 장소값

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [placeMarker,setPlaceMarker] = useState('');
  const [transport,setTransport] = useState('TRANSIT');

  const [clickAdd,setClickAdd] =useState(0);

  const [resResult, setResResult] = useState(null);
  

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
    // const [zoom,setZoom] = useState(13);
    const clickPosition = {lat: e.latLng.lat(), lng:e.latLng.lng()};
    setSelected(clickPosition);
    mapref.setZoom(mapref.zoom += 2);
  };

  // console.log({userPlaces},{dailyRoute})
  // console.log({stopOver},{isStopOver},{origin},{destination})
  
// console.log(stopOver) //ok
// console.log({stopOver})

  // eslint-disable-next-line no-undef
  const directionSevice = new google.maps.DirectionsService();
  async function calculateRoute(origin, destination, transport,isStopOver,stopOver){
    if(isStopOver<= 0){ //no waypoint
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
      // console.log({distance},{duration});
    }

    else{
      console.log("stopOver exist");

let copy = stopOver;
      // eslint-disable-next-line no-undef
var firstStop =new google.maps.LatLng(copy.lat, copy.lng);
setStopOver([{location:firstStop}])
console.log(stopOver)
      const results = await directionSevice.route({
        // eslint-disable-next-line no-undef
        origin: origin,
        // eslint-disable-next-line no-undef
        destination: destination,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode[transport],
        // eslint-disable-next-line no-undef
        waypoints: stopOver
        //stopOver[0]
        //{lat: 52.52000659999999, lng: 13.404954}
      },(res,status)=>{
        if(status !== 'OK'){
          window.alert("Directions request failed due to " + status);
        }
      })
      setDirectionsResponse(results)
      // setDistance(results.routes[0].legs[0].distance.text)
      // setDuration(results.routes[0].legs[0].duration.text)
      
      // // console.log({distance},{duration});
      console.log(results)
    }

  };

  function clearRoute(origin, destination, directionsResponse){
      setDirectionsResponse(null);
      setDistance('');
      setDuration('');
      setOrigin('');
      setDestination('');
  };

    
  let geoPlaceId=null;
  let geoAddress=null;
  async function addPlace (selected){

    setClickAdd(clickAdd+1)
    //setUserPlaces(userPlaces=>[...userPlaces, {selected}]);
    const latlng ={
      lat: parseFloat(selected['lat']),
      lng: parseFloat(selected['lng'])
    };

    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();
    await geocoder.geocode({location:latlng})
    .then((res)=>{
      if(res.results[0]){
        mapref.setZoom(15);
        geoPlaceId = res.results[0]['place_id'];
        geoAddress = res.results[0]['formatted_address'];
        //console.log(geoPlaceId, geoAddress); //정상
      }
    })

    // eslint-disable-next-line no-undef
    var placeService = new google.maps.places.PlacesService(mapref);
    await placeService.getDetails({placeId:geoPlaceId, fields:['name'],language:'en' },(res,status)=>{
      if (status === "OK") {
        const copy=[...userPlaces];
        let order = copy[focusedDay].length; //to make no empty-array
        
        copy[focusedDay][order] = {
            'name':res.name,
            'address':geoAddress,
            'position':{selected},
            'place_id':geoPlaceId,
            'id':placeIndex
          }

        order += 1;
        setUserPlaces(copy);
        setPlaceIndex(placeIndex+1); //id
        console.log({userPlaces})
        
        //localStorage.setItem(`plan${focusedDay},${placeIndex}`,JSON.stringify(userPlaces))
      } else {
        console.error('Place details request failed:', status);
      }
    })
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
  //marker for center (selected)
  <MarkerF position={selected}/>
  }

{
  //draw api recommend places
  //처음제외
  apiPlaces.length && apiPlaces.map((place,i)=>{

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
            style={{clear:'both',width:'10vw',height:'10vh',cursor:'pointer',textAlign:'center'}}
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


<ButtonGroup color="primary" variant="contained">
<Button onClick={()=>{setClick(click+1)}}>
  <DirectionsIcon/>ROUTE</Button>
<Button onClick={()=>{addPlace(selected)}}><AddLocationIcon/>ADD</Button>
</ButtonGroup>

{
  //For calculating route - form
  click % 2 === 1?     
  <Container className='route-form-container'>
  <FormControl>
  <Button onClick={()=>{setIsStopOver(isStopOver+1)}} variant="outlined" size="small">+</Button>
  <Button onClick={()=>{setIsStopOver(isStopOver-1)}} variant="outlined" size="small">-</Button>
    
    <PlacesAutocomplete setSelected={setOrigin}/> 
    {
      // 일단 경유지 하나만으로 계산기능 구현
      isStopOver>0 && isStopOver<6? 
        <PlacesAutocomplete setSelected={setStopOver} />
      :null
    }
    <PlacesAutocomplete setSelected={setDestination}/>
  
    
  </FormControl>
      <ButtonGroup color="primary" variant="outlined">
        <Button onClick={()=>{
          calculateRoute(origin,destination,transport,isStopOver, stopOver)
          }}>calaulate</Button>
        <Button onClick={()=>{clearRoute(origin, destination, directionsResponse)}}>clear</Button>
        <ButtonGroup >
          <Button value="DRIVING" onClick={()=>{setTransport("DRIVING")}}><DirectionsCarIcon/></Button>
          <Button value="WALKING" onClick={()=>{setTransport("WALKING")}}><DirectionsWalkIcon/></Button>
          <Button value="TRANSIT" onClick={()=>{setTransport("TRANSIT")}}><TrainIcon/></Button>
        </ButtonGroup>
      </ButtonGroup>
      </Container>:null
}

  {//Draw calculated route (calculated by button)
    directionsResponse && <>
    (<DirectionsRenderer directions={directionsResponse} />)
      <InfoWindowF position={destination}>
        <Box>{distance}<br/>{duration}</Box>
        {/* center바뀔때 이것도 따라감. 없어지거나 고정되어야 하는데? */}
      </InfoWindowF>
  </>}

{
  //Draw calculated route

  //draw marker
  dailyRoute.length && dailyRoute.map((val,i)=>{
    return (<>
    <MarkerF title="title!!"
    position={val.selected} icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"}> 
    
      {/* <InfoWindowF position={val.selected}>
        <p>Texts.</p>
      </InfoWindowF> */}
      {/* 1. 장소제한을 둬서 시작-끝 반복표시화 Or 2. 경유지 설정받기 */}
    
    </MarkerF>
    </>)
  })

  //draw route

}



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