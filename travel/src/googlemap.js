import "./googlemap.css";
import {Wrapper, Status} from "@googlemaps/react-wrapper";
import { useMemo, useState, useEffect, useRef } from "react";
import { Autocomplete ,withGoogleMap, GoogleMap, 
  LoadScript, Marker, MarkerF, useJsApiLoader,
  useLoadScript, MarkerClustererF } from "@react-google-maps/api";
import usePlacesAutocomplete,{
 getGeocode, getLatLng
} from "use-places-autocomplete";
import {
  Combobox, ComboboxInput, ComboboxPopover, 
  ComboboxList, ComboboxOption
} from "@reach/combobox";
import {makeStyles, Box, Container, Button, Paper, Typography, useMediaQuery} from '@material-ui/core';
// import LocationOutlinedIcon from '@material-ui/icons/LocationOutlined';
import Rating from '@material-ui/lab';
import PushPinIcon from '@mui/icons-material/PushPin';

const useStyles = makeStyles({
    title: {
        color: 'white',
    },

})

const useLibraries = ["places"];

export default function GMap() {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyAY6AUO3bJvykH8YxldX-yppdDiNjJBYrI",
        // process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        libraries: useLibraries,
    });

    if (!isLoaded) return <div>Loading!</div>;
    return <Map/>;
};


function Map(){
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)');
  
  const center = useMemo(() => ({lat: 44, lng: -80}), []);
  const [selected, setSelected] = useState({lat: 44, lng: -80}); //get address from toStart question
  const [userPlaces, setUserPlaces] = useState([]);

    return (
  <>
    <div className="places-container">
      <PlacesAutocomplete setSelected={setSelected}/> 
      {/* render the component out. pass the location and render the location as a marker*/}
    </div>

{/* for check */}
    <Container>
      <Button variant="outlined" color="primary"
        onClick={
          console.log({selected})
        }>Add</Button>
      <Box>{selected.lat}</Box>
      <Box>{selected.lng}</Box>
      <Box>{userPlaces[0]}</Box>
    </Container>

    <GoogleMap
      zoom={10}
      center={selected}
      options={{disableDefaultUI: true}}
      mapContainerClassName="map-container"
      >
      { <MarkerF position={selected} />}

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
    clearSuggestions
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

// const AddPlace = () =>{

// }


// https://velog.io/@sanggyo/React-react-google-mapapi-GoogleMapMarkerFInfoWindowF-%EC%82%AC%EC%9A%A9
// https://tomchentw.github.io/react-google-maps/#withgooglemap
//https://www.youtube.com/watch?v=s4n_x5B58Dw
//https://velog.io/@park0eun/Google-Map-Platform-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
//참고: https://nittaku.tistory.com/67
//주소변환: https://nicgoon.tistory.com/241