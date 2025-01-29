import GradientOverlay from '@/assets/svgs/gradient-overlay';
import FullButton from '@/components/FullButton';
import { View, Text, Image, Linking } from 'react-native';
import * as Location from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import { useLocationStore } from '@/store';
import { useState } from 'react';
import clsx from 'clsx';
import ReactNativeModal from 'react-native-modal';

export default function EnableLocation() {
    const { rejected } = useLocalSearchParams();

    const { setAddress, setLatitude, setLongitude, setHasLocationPermission } = useLocationStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(!!rejected && rejected === "true");
    const [retryCount, setRetryCount] = useState(0);

    const handleRequestLocationPermission = async () => {
        if (isLoading) return;

        try {
            setIsLoading(true);
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                router.replace("/enable-location?rejected=true");
                setHasLocationPermission(false);
                setRetryCount(prev => prev + 1);
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
        } catch (error) {
            console.error('Error requesting location:', error);
            setHasLocationPermission(false);
            setRetryCount(prev => prev + 1);
        } finally {
            setIsLoading(false);
        }
    }

    const handleModalClose = async () => {
        try {
            await Linking.openSettings();
        } catch (error) {
            console.error('Error opening settings:', error);
        }
    };

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
                    containerClassName='w-full'
                    loading={isLoading}
                    canProceed={!isLoading}
                    onPress={handleRequestLocationPermission}
                    className={clsx(
                        'py-4 rounded-xl w-full',
                        !isLoading ? "bg-primary text-white" : "bg-primary/20"
                    )}
                    textClassName={clsx(
                        'font-MontserratSemiBold',
                        !isLoading ? "text-white" : "text-primary"
                    )}
                />
            </View>
            <ReactNativeModal
                isVisible={isModalVisible}
            >
                <View className="min-h-[300px] bg-white px-7 py-9 rounded-2xl items-center">
                    <View className='h-28 w-28 rounded-full border border-gray-200 bg-red-100/50 p-4'>
                        <Image
                            source={require("@/assets/images/cold/error-pin.png")}
                            resizeMode='contain'
                            className='w-full h-full'
                        />
                    </View>
                    <Text className='text-xl font-bold mt-3'>Location Access Needed</Text>
                    <Text className='text-center mt-1 mb-5'>
                        Cold Connect requires location access to provide accurate cold storage options and logistics services near you. Please enable location permissions in your device settings to continue using the app seamlessly.
                    </Text>
                    <View className='w-full flex-row gap-2'>
                        <FullButton
                            title={"Grant Permission"}
                            className='bg-primary py-4 rounded-full'
                            containerClassName='flex-1'
                            textClassName='text-white text-md'
                            onPress={handleModalClose}
                        />
                        <FullButton
                            title={"Close"}
                            className='border border-primary py-4 rounded-full'
                            containerClassName='flex-1'
                            textClassName='text-primary text-md'
                            onPress={async () => {
                                setIsModalVisible(false)
                                const { status } = await Location.getForegroundPermissionsAsync();
                                if (status === 'granted') {
                                    router.push('/(root)/(tabs)/home');
                                }
                            }}
                        />
                    </View>
                </View>
            </ReactNativeModal>
        </View>
    )
}