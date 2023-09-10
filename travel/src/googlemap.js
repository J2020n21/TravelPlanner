import { useMemo } from "react";
import {Wrapper, Status} from "@googlemaps/react-wrapper"
import { withGoogleMap, GoogleMap, LoadScript, MarkerF, useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react"

export default function GMap() {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Liading!</div>;
    return <Map/>;
}

const center={lat: 44, lng: -80};
function Map(){
    
    return <GoogleMap
      zoom={10}
      center={center}
      mapContainerStyle={{width: "70%", height: "70vh"}}
      >

    <MarkerF position={{lat: 44, lng: -80}}/>

      </GoogleMap>
}


// https://velog.io/@sanggyo/React-react-google-mapapi-GoogleMapMarkerFInfoWindowF-%EC%82%AC%EC%9A%A9
// https://tomchentw.github.io/react-google-maps/#withgooglemap
//https://www.youtube.com/watch?v=s4n_x5B58Dw
