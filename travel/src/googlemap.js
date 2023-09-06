import {Wrapper, Status} from "@googlemaps/react-wrapper"
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react"


const GMap = ()=>{
    const [map, setMap] = useState(null);
    const ref = useRef();

    const myStyles = [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ];

    useEffect(()=>{
        const newMap = new window.google.maps.Map(ref.current, {
            center : { lat: 37.569227, lng: 126.9777256},
            zoom : 16,
            scrollwheel: true,
            disableDefaultUI: true,
            // styles: myStyles
        });     
       
        // const marker = new window.google.maps.marker(ref.current,{
            
        // });
        
        setMap(newMap);
    },[])

    return (
        <div ref={ref} id="map" style={{width:"400px", height: "400px"}}></div>
    )
}
// https://velog.io/@sanggyo/React-react-google-mapapi-GoogleMapMarkerFInfoWindowF-%EC%82%AC%EC%9A%A9

export default GMap