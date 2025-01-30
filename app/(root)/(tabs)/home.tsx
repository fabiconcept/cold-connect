import Header from '@/components/Home/Header';
import PopularCategories from '@/components/Home/PopularCategories';
import AdCard from '@/components/Home/ad-card';
import ColdStoragesAroundMe from '@/components/Home/coldStoragesAroundMe';
import ColdStoragesNearMe from '@/components/Home/coldStoragesNearMe';
import { useEffect } from 'react';
import { View, ScrollView, RefreshControl, StatusBar, Platform, Alert, ToastAndroid } from 'react-native';
import * as Location from "expo-location";
import { router, useLocalSearchParams } from 'expo-router';
import { useLocationStore } from '@/store';
import { useHomeActions } from '@/lib/Component Actions/Home';

export default function Home() {
    const { setAddress, setLatitude, setLongitude, setHasLocationPermission } = useLocationStore();
    const { type } = useLocalSearchParams();
    const { hasLocationPermission } = useLocationStore();


    const [loading, reload] = useHomeActions();

    useEffect(() => {
        if (type === "logged-in") {
            if (Platform.OS === "ios") {
                Alert.alert("Sign In Successful", "You have successfully signed in.");
            } else {
                ToastAndroid.show("Login successful", ToastAndroid.BOTTOM);
            }

            router.replace("/home");
        }

        if (type === "new-user") {
            if (Platform.OS === "ios") {
                Alert.alert("Registration Successful", "You have successfully created an your account.");
            } else {
                ToastAndroid.show("Registration successful", ToastAndroid.BOTTOM);
            }

            router.replace("/home");
        }
    }, [type]);

    useEffect(() => {
        if (!hasLocationPermission) return;

        reload();
    }, [hasLocationPermission]);

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
                setHasLocationPermission(true as never);
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
                    hasLocationPermission ? <RefreshControl
                        refreshing={loading}
                        onRefresh={async () => await reload()}
                    /> : undefined
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