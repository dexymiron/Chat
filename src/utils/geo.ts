const defaultCenter = {
    lat: 40.749322559824165,
    lng: -73.83564909935048,
};

export const getBrowserLocation = () => {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude: lat, longitude: lng } = pos.coords;
                    resolve({ lat, lng });
                },
                () => {
                    reject(defaultCenter);
                },
            );
        } else {
            reject(defaultCenter);
        }
    });
};
