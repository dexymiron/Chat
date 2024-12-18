import React from 'react';
import n from './Distance.module.css';

type Distance = {
    leg: google.maps.DirectionsLeg;
}

export default function Distance({leg} : Distance) {
    if (!leg.distance || !leg.duration) return null
  return (
    <div className={n.container}>
    <p><img width="30" height="30" src="https://img.icons8.com/external-solidglyph-m-oki-orlando/32/external-Start-basic-ui-solidglyph-m-oki-orlando.png" alt="external-Start-basic-ui-solidglyph-m-oki-orlando"/><strong>Start: </strong>{leg.start_address}</p>
    <p><img width="30" height="30" src="https://img.icons8.com/metro/26/finish-flag.png" alt="finish-flag"/><strong>End: </strong>{leg.end_address}</p>
    <p><img width="30" height="30" src="https://img.icons8.com/ios/50/point-objects--v1.png" alt="point-objects--v1"/><strong>Distance: </strong>{leg.distance.text}</p>
    <p><img width="30" height="30" src="https://img.icons8.com/ios/50/delivery-time--v1.png" alt="delivery-time--v1"/><strong>Duration: </strong>{leg.duration.text}</p>
  </div>
  )
}
