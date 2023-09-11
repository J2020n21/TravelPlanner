import "./googlemap.css";
import {Wrapper, Status} from "@googlemaps/react-wrapper";
import { withGoogleMap, GoogleMap, LoadScript, Marker, MarkerF, useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState, useEffect, useRef } from "react";
import usePlacesAutocomplete,{
 getGeocode, getLatLng
} from "use-places-autocomplete";
import {
  Combobox, ComboboxInput, ComboboxPopover, 
  ComboboxList, ComboboxOption
} from "@reach/combobox";
import Button from '@material-ui/core';

const useLibraries = ["places"];
export default function GMap() {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: useLibraries,
    });

    if (!isLoaded) return <div>Loading!</div>;
    return <Map/>;
};


function Map(){
  const center = useMemo(() => ({lat: 44, lng: -80}), []);
  const [selected, setSelected] = useState(null);
    
    return (
  <>
    <div className="places-container">
      <PlacesAutocomplete setSelected={setSelected} /> 
      {/* render the component out. pass the location and render the location as a marker*/}
    </div>

    <div>
      <Button variant="outlined">ADD</Button>
    </div>

    <GoogleMap
      zoom={10}
      center={selected}
      mapContainerClassName="map-container"
      >
      { <MarkerF position={selected} />}
    {/* <MarkerF position={{lat: 44, lng: -80}}/> */}

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
          <ComboboxList>
            
            {status === "OK" &&
              data.map(( {place_id, description})=>(
              <ComboboxOption key={place_id} value={description}/>
              ))}
            
          </ComboboxList>
        </ComboboxPopover>
    </Combobox>
  );
};


// https://velog.io/@sanggyo/React-react-google-mapapi-GoogleMapMarkerFInfoWindowF-%EC%82%AC%EC%9A%A9
// https://tomchentw.github.io/react-google-maps/#withgooglemap
//https://www.youtube.com/watch?v=s4n_x5B58Dw
