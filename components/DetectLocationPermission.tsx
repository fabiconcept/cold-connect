import { useLocationStore } from '@/store';
import * as Location from 'expo-location';
import { router } from 'expo-router';

export default function DetectLocationPermission() {
    const { setAddress, setLatitude, setLongitude, setHasLocationPermission } = useLocationStore();

    const requestLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setHasLocationPermission(false);
            router.replace('/(root)/enable-location');
            return;
        }

        const location = await Location.getCurrentPositionAsync();
        const address = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        setAddress(`${address[0].name}, ${address[0].region}`);
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setHasLocationPermission(true);

    }
    requestLocation();
    return null;
}