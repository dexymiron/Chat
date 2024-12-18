import React, { useCallback, useEffect, useState } from "react";
import { DirectionsRenderer, GoogleMap, MarkerF } from "@react-google-maps/api";
import n from "./Map.module.css";
import Autocomplete from "./Autocomplete";
import { getBrowserLocation } from "../../utils/geo";
import Distance from "./Distance";

type LanLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult | null;

const Map = () => {

  const containerStyle = {
    width: '100%',
    height: '100vh',
  };
    
  const defaultCenter = {
    lat: 40.749322559824165,
    lng: -73.83564909935048,
  };

  const marker = {
    id: 1,
    title: 'Queens Museum'
  }

  const MODES = {
    MOVE: 0,
    SET_MARKER: 1
  }

  useEffect(() => {
    getBrowserLocation().then((curLoc) => {
      setCenter(curLoc)
    })
    .catch((defaultCenter) => {
      setCenter(defaultCenter)
    })
  }, [])

  const [center, setCenter] = useState(defaultCenter);
  const [autocompleteLoc, setAutocompleteLoc] = useState<LanLngLiteral | null>(null);
  const [mode, setMode] = useState<number>(MODES.MOVE);
  const [markers, setMarkers] = useState<LanLngLiteral[]>([]);
  const [directions, setDirections] = useState<DirectionsResult>();

  const onMarkerAdd = (coordinates: LanLngLiteral) => {
    setMarkers([...markers, coordinates])
  }

  const onClick = useCallback((loc: google.maps.MapMouseEvent) => {
    if (mode === MODES.SET_MARKER && loc.latLng) {
      const lat = loc.latLng.lat();
      const lng = loc.latLng.lng();
      onMarkerAdd({lat, lng});
    }
  }, [mode, onMarkerAdd]);

  const toggleMode = useCallback(() => {
    switch(mode) {
      case MODES.MOVE: 
        setMode(MODES.SET_MARKER);
      break;
      case MODES.SET_MARKER: 
        setMode(MODES.MOVE);
      break;
      default:
        setMode(MODES.MOVE);
    }
    console.log(mode);
  }, [mode]);


  const onPlaceSelect = useCallback((coordinates: LanLngLiteral) => {
    setAutocompleteLoc(coordinates);
  }, []);

  const clear = useCallback(() => {
    setMarkers([]);
    setDirections(null);
    setAutocompleteLoc(null);
  }, [])

  const fetchDirections = useCallback((position: LanLngLiteral) => {
    if (!center || !position) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: center,
        destination: position,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if(status === "OK" && result) {
          setDirections(result);
        } else {
          console.log(console.error("Failed to fetch directions:", status))
        }
      }
    )
  }, [center])
  

  return (
        <> 
          <div className={n.addressSearchContainer}>
            <Autocomplete onSelect={onPlaceSelect}/>
            <div className={n.buttonsContainer}>
              <button className={n.setMakersBtn} onClick={toggleMode}>{mode === MODES.MOVE ? <p>Set markers</p> : <p>Normal Mode</p>}</button>
              <button className={n.clearBtn} onClick={clear}>Clear</button>
            </div>
            {directions && 
            <Distance leg={directions.routes[0].legs[0]}/>}
          </div>
          <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
              onClick={onClick}
          >
            {directions && 
            <DirectionsRenderer directions={directions}/>}

            {markers.map((pos, index) => <MarkerF key={index} position={pos} onClick={() => fetchDirections(pos)}/>)}

            {autocompleteLoc && 
            <MarkerF key={marker.id} position={autocompleteLoc} onClick={() => fetchDirections(autocompleteLoc)}
            >   
            </MarkerF>}

            <MarkerF
            key={marker.id}
            position={center}
            //title={marker.title}
            label={{text: `Me`, fontSize: `16px`, color: '#fff'}}
            >   
            </MarkerF>
          </GoogleMap>
        </>
  )
}

export default React.memo(Map);