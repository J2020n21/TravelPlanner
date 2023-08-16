import {Wrapper, Status} from "@googlemaps/react-wrapper"
import { useState, useEffect, useRef } from "react"


const GMap = ()=>{
    const [map, setMap] = useState(null);
    const ref = useRef();

    useEffect(()=>{
        const newMap = new window.google.maps.Map(ref.current, {
            center : { lat: 37.569227, lng: 126.9777256},
            zoom : 16,
        });     
        
        setMap(newMap);
    },[])

    return (
        <div ref={ref} id="map" style={{width:"400px", height: "400px"}}></div>
    )
}

export default GMap