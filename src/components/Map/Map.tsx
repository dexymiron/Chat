import React from "react";
import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";

const Map = () => {

    const containerStyle = {
        width: '100%',
        height: '100vh',
      };
      
      const center = {
        lat: 40.749322559824165,
        lng: -73.83564909935048,
      };

      const marker = {
        id: 1,
        title: 'Queens Museum'
      }


    return (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
            >
                
                <MarkerF
                key={marker.id}
                position={center}
                title={marker.title}
                >   
                </MarkerF>
            </GoogleMap>
    )
}

export default React.memo(Map);