import Header from '@/components/Map/Header';
import { calculateRegion, calculateRegionWithDestination } from '@/lib/Map Utilities';
import { useLocationStore, useStorageStore } from '@/store';
import { useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function Map() {
    const { latitude, longitude, hasLocationPermission } = useLocationStore();
    const { name } = useLocalSearchParams();
    const { storages } = useStorageStore();
    const [selectedStorage, setSelectedStorage] = useState(name);
    const destination = storages.find((storage) => storage.name.trim().toLowerCase() === String(name).trim().toLowerCase());
    const bottomSheetRef = useRef<BottomSheet>(null);


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
            destinationLatitude: Number(destination.location.latitude),
            destinationLongitude: Number(destination.location.longitude),
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
                            longitude: Number(storage.location.longitude),
                            latitude: Number(storage.location.latitude)
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
                        latitude: destination.location!.latitude,
                        longitude: destination.location!.longitude
                    }}
                    apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
                    strokeWidth={5}
                    strokeColor='#0286ff'
                />
            </MapView>
            <Header />
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={['10%', '40%']}
                index={0}
                keyboardBehavior='interactive'
            >
                <BottomSheetView
                    className={"flex-1 p-5"}
                >
                    <Text>{selectedStorage}</Text>
                </BottomSheetView>
            </BottomSheet>
        </View>
    )
}