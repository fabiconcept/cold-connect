import Header from '@/components/Home/Header';
import PopularCategories from '@/components/Home/PopularCategories';
import AdCard from '@/components/Home/ad-card';
import ColdStoragesAroundMe from '@/components/Home/coldStoragesAroundMe';
import ColdStoragesNearMe from '@/components/Home/coldStoragesNearMe';
import { useEffect } from 'react';
import { View, ScrollView, RefreshControl, StatusBar } from 'react-native';
import * as Location from "expo-location";
import { router } from 'expo-router';
import { useLocationStore } from '@/store';

export default function Home() {
    const { setAddress, setLatitude, setLongitude, setHasLocationPermission } = useLocationStore();

    useEffect(() => {
        checkLocationPermission();
    }, []);

    const checkLocationPermission = async () => {
        try {
            const { status } = await Location.getForegroundPermissionsAsync();
            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync();
                const address = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                setAddress(`${address[0].name}, ${address[0].region}`);
                setLatitude(location.coords.latitude);
                setLongitude(location.coords.longitude);
                setHasLocationPermission(true);
            } else {
                router.replace("/enable-location");
            }
        } catch (error) {
            router.replace("/enable-location");
            console.error('Error checking location permission:', error);
        }
    };

    return (
        <>
            <StatusBar barStyle={"light-content"} />
            <ScrollView
                className='flex-1'
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => { }}
                    />
                }
            >
                <Header />
                <AdCard />
                <PopularCategories />
                <ColdStoragesNearMe />
                <ColdStoragesAroundMe />
                <View className='h-32'></View>
            </ScrollView>
        </>
    )
}