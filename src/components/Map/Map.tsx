import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import n from "./Map.module.css";
import Autocomplete from "./Autocomplete";
import { getBrowserLocation } from "../../utils/geo";

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
    .catch((defaultLocation) => {
      setCenter(defaultLocation)
    })
  }, [])

  const [center, setCenter] = useState(defaultCenter);
  const [mode, setMode] = useState(MODES.MOVE);
  const [markers, setMarkers] = useState([]);

  const onMarkerAdd = (coordinates) => {
    setMarkers([...markers, coordinates])
  }

  const onClick = useCallback((loc) => {
    if (mode === MODES.SET_MARKER) {
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


  const onPlaceSelect = useCallback((coordinates) => {
    setCenter(coordinates);
  }, []);

  const clear = useCallback(() => {
    setMarkers([])
  }, [])
  

  return (
        <> 
          <div className={n.addressSearchContainer}>
            <Autocomplete onSelect={onPlaceSelect}/>
            <button className={n.setMakersBtn} onClick={toggleMode}>Set markers</button>
            <button className={n.clearBtn} onClick={clear}>Clear</button>
          </div>
          <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
              onClick={onClick}
          >
              {markers.map((pos) => <MarkerF key={marker.id} position={pos}/>)}
              <MarkerF
              key={marker.id}
              position={center}
              //title={marker.title}
              //label={{text: `${marker.title}`, fontSize: `21px`, color: 'blue'}}
              >   
              </MarkerF>
          </GoogleMap>
        </>
  )
}

export default React.memo(Map);