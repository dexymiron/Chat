const defaultCenter = {
    lat: 40.749322559824165,
    lng: -73.83564909935048,
};

type coordinates = {
    lat: number,
    lng: number
}

export const getBrowserLocation = (): Promise<coordinates> => {
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
