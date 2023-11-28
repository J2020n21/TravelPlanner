import "./googlemap.css";
import "../App.css";
import $ from 'jquery';
import {Wrapper, Status} from "@googlemaps/react-wrapper";
import { useMemo, useState, useEffect, useRef, componentDidUpdate } from "react";
import { Autocomplete ,withGoogleMap, GoogleMap, PolylineF,
  LoadScript, MarkerF, useJsApiLoader, useLoadScript, InfoWindowF,
  DirectionsRenderer, DirectionsService,
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


export default function GMap({setCoordinates,setBounds,coordinates,apiPlaces,setChildClicked,userPlaces,setUserPlaces, placeIndex, setPlaceIndex,focusedDay, setFocusedDay, dailyRoute,aiPlaces}) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLEMAP_API_KEY,
        libraries:["places"]
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
      aiPlaces={aiPlaces}
    />;
};

function Map({setCoordinates,setBounds,coordinates,apiPlaces,setChildClicked,setUserPlaces,userPlaces, placeIndex, setPlaceIndex,focusedDay, setFocusedDay, dailyRoute,aiPlaces}){
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
  const [distance, setDistance] = useState([]);
  const [duration, setDuration] = useState([]);
  const [placeMarker,setPlaceMarker] = useState('');
  const [transport,setTransport] = useState('TRANSIT');
  const [focusedTp,setFocusedTp] = useState(transport);
  const [clickAdd,setClickAdd] =useState(0);

  const lineColor = ["#dc143c","#ff4500","#ffd700","#228b22","#1e90ff","#000080","#483d8b"]

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

      },(res,status)=>{
        if(status !== 'OK'){
          window.alert("Directions request failed due to " + status);
        }
      })
      setDirectionsResponse(results)
      let resultInfo = results.routes[0].legs
      resultInfo.map((ele,i)=>{
        setDistance(ele.distance.text)
        setDuration(ele.duration.text)
      })
      
      console.log({distance},{duration});
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
  let photoUrl = null;
  async function addPlace (selected){
    setClickAdd(clickAdd+1)
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
      }
    })

    // eslint-disable-next-line no-undef
    var placeService = new google.maps.places.PlacesService(mapref);
    await placeService.getDetails({placeId:geoPlaceId, fields:['name', 'photos','formatted_address'],language:'en' },(res,status)=>{
      if (status === "OK") {
        const copy=[...userPlaces];
        let order = copy[focusedDay].length; //to make no empty-array
        let noImgUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
        if(res.photos){photoUrl=res.photos[0].getUrl()}
        else{photoUrl=noImgUrl}

        copy[focusedDay][order] = {
            'name':res.name,
            'address':geoAddress,
            'position':{selected},
            'place_id':geoPlaceId,
            'id':placeIndex,
            'photo':photoUrl
          }

        order += 1;
        setUserPlaces(copy);
        setPlaceIndex(placeIndex+1); //id
        if(photoUrl? console.log(photoUrl):console.log("No photo"));
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


{
  //marker from AI recommendation
  aiPlaces.length > 0 && aiPlaces != null? 
    aiPlaces.map((item)=>{
     const pos = JSON.parse(item.Latlng)
      return(
      <MarkerF title={item.name} position={pos}/>
    )})
   :null
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
          
          <Button id="DRIVING" value="DRIVING" onClick={()=>{setTransport("DRIVING")}}><DirectionsCarIcon/></Button>
          <Button id="WALKING"value="WALKING" onClick={()=>{setTransport("WALKING")}}><DirectionsWalkIcon/></Button>
          <Button id="TRANSIT" value="TRANSIT" onClick={()=>{setTransport("TRANSIT")}}><TrainIcon/></Button>
        </ButtonGroup>  
      </ButtonGroup>
      </Container>:null
}

  {//Draw calculated route (calculated by button)
    directionsResponse && 
    <>
      (<DirectionsRenderer directions={directionsResponse} />)
        <InfoWindowF position={destination}>
          <Box>{distance}<br/>{duration}</Box>
        </InfoWindowF>
    </>
  }

{
  //draw marker for daily plan
  dailyRoute.length && dailyRoute.map((val,i)=>{
    console.log(val,i)
    const Arr = dailyRoute.map(item=>item.selected)
    return (<>
    <MarkerF 
      position={val.selected} icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"}> 
    </MarkerF>
    <PolylineF
      path={Arr}
      strokeColor={"000000"}
      strokeOpacity={0.8}
      strokeWeight={2}
    />
    </>)
  })
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