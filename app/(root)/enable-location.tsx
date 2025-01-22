import GradientOverlay from '@/assets/svgs/gradient-overlay';
import FullButton from '@/components/FullButton';
import { View, Text, Image } from 'react-native';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useLocationStore } from '@/store';

export default function EnableLocation() {
    const { setAddress, setLatitude, setLongitude, setHasLocationPermission } = useLocationStore();

    const handleRequestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

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

        router.push('/(root)/(tabs)/home');
    }

    return (
        <View className='flex-1'>
            <Image
                source={require("@/assets/images/cold/map.png")}
                resizeMode='cover'
                className='h-full'
            />
            <View className='absolute left-0 bottom-0'>
                <GradientOverlay />
            </View>
            <View className='absolute left-0 bottom-0 h-[65%] items-center justify-between w-screen px-4 pb-5'>
                <View className='items-center'>
                    <Image
                        source={require("@/assets/images/cold/LocationMarker.png")}
                        resizeMode='contain'
                    />
                    <Text className='text-2xl font-MontserratBold mt-11'>
                        Grant Permission!
                    </Text>
                    <Text className='text-base font-Montserrat font-normal opacity-60 mt-5 mx-3 text-center'>
                        Cold Connect needs your location data to enhance your experience and provide personalized recommendations. Please enable location services to make the most out of our app.
                    </Text>
                </View>

                <FullButton
                    title='Enable Location'
                    className='w-full bg-primary rounded-xl py-5'
                    containerClassName='w-full'
                    textClassName='text-base font-MontserratSemiBold text-white'
                    onPress={handleRequestLocationPermission}
                />
            </View>
        </View>
    )
}