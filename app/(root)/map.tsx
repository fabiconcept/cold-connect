import Header from '@/components/Map/Header';
import { calculateRegion, calculateRegionWithDestination } from '@/lib/Map Utilities';
import { useLocationStore, useStorageStore } from '@/store';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useHubDistance } from '@/lib/Hooks/useHubDistance';

export default function Map() {
    const { latitude, longitude, hasLocationPermission } = useLocationStore();
    const { name }: { name: string } = useLocalSearchParams();
    const { storages } = useStorageStore();
    const [selectedStorage, setSelectedStorage] = useState(name);
    const [hubDistance, hubDistanceLoading, setHubCoordinates] = useHubDistance();

    const destination = storages.find((storage) => storage.name.trim().toLowerCase() === String(name).trim().toLowerCase());
    const bottomSheetRef = useRef<BottomSheet>(null);

    const selectedStorageData = useMemo(() => {
        if (!selectedStorage) return undefined;

        return storages.find(storage => (storage.name).trim().toLowerCase() === (selectedStorage).trim().toLowerCase());
    }, [selectedStorage]);

    useEffect(() => {
        if (!selectedStorageData?.latitude || !selectedStorageData?.longitude) return;
        setHubCoordinates({
            latitude: Number(selectedStorageData.latitude),
            longitude: Number(selectedStorageData.longitude)
        });
    }, [selectedStorageData]);



    if (!hasLocationPermission) return (
        <View className='flex-1 items-center justify-center'>
            <Text className='text-center text-2xl font-MontserratSemiBold text-red-500'>Storage Not Found</Text>
        </View>
    );

    let regionWithDestination;

    const region = calculateRegion({
        latitude: latitude,
        longitude: longitude,
    });

    if (!destination) return (
        <View className='flex-1 items-center justify-center'>
            <Text className='text-center text-2xl font-MontserratSemiBold text-red-500'>Storage Not Found</Text>
        </View>
    );

    if (destination.location) {
        regionWithDestination = calculateRegionWithDestination({
            userLatitude: Number(latitude),
            userLongitude: Number(longitude),
            destinationLatitude: Number(destination.latitude),
            destinationLongitude: Number(destination.longitude),
        })
    }

    return (
        <View className='flex-1 h-full w-full justify-center items-center'>
            <MapView
                provider={PROVIDER_GOOGLE}
                className='h-full w-full rounded-2xl'
                style={{ width: '100%', height: '100%' }}
                tintColor='black'
                region={regionWithDestination ?? region}
                mapType='standard'
                showsMyLocationButton={true}
                showsUserLocation={true}
                userInterfaceStyle='light'
            >
                {storages.length > 0 && storages.map((storage) => {
                    if (!storage.location) return null;
                    return (<Marker
                        key={storage.name}
                        coordinate={{
                            longitude: Number(storage.longitude),
                            latitude: Number(storage.latitude)
                        }}
                        onSelect={() => {
                            setSelectedStorage(storage.name);
                        }}
                        title={storage.name}
                        image={require("@/assets/images/cold/storage.png")}
                    />)
                })}

                <MapViewDirections
                    origin={{
                        latitude: latitude,
                        longitude: longitude
                    }}
                    destination={{
                        latitude: destination.latitude,
                        longitude: destination.longitude
                    }}
                    apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
                    strokeWidth={5}
                    strokeColor='#0286ff'
                />
            </MapView>
            <Header />
            {selectedStorageData && <BottomSheet
                ref={bottomSheetRef}
                snapPoints={['10%', '40%', "80%"]}
                index={1}
                keyboardBehavior='interactive'
            >
                <BottomSheetView
                    className={"flex-1"}
                >
                    <View>
                        <Image
                            source={{ uri: `http://46.101.23.53/${selectedStorageData.photo}` }}
                            className='w-full h-80'
                            resizeMode='cover'
                        />
                        <Text>
                            {!hubDistanceLoading && hubDistance ? `${selectedStorageData.name} - ${hubDistance}km` : "Distance Not Available"}
                        </Text>
                    </View>
                </BottomSheetView>
            </BottomSheet>}
        </View>
    )
}