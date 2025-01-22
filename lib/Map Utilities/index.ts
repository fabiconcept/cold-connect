export const calculateRegion = ({
    latitude,
    longitude,
}: {
    latitude: number | null;
    longitude: number | null;
}) => {
    if (!latitude || !longitude) {
        return {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
    }

    return {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };
};