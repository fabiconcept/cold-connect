import { useLocationStore, useStorageStore } from '@/store';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useHubDistance } from '@/lib/Hooks/useHubDistance';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Image, View } from 'react-native';
import { Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { calculateRegionWithDestination } from '@/lib/Map Utilities';

export default function StorageView({
    provider,
}: {
    provider: "google"
}) {
    const { name }: { name: string } = useLocalSearchParams();
    const { storages } = useStorageStore();
    const [selectedStorage, setSelectedStorage] = useState(name);
    const { latitude, longitude, hasLocationPermission } = useLocationStore();

    if (!hasLocationPermission) return;

    const [hubDistance, hubDistanceLoading, setHubCoordinates] = useHubDistance();

    const destination = storages.find((storage) => storage.name.trim().toLowerCase() === String(name).trim().toLowerCase());
    const bottomSheetRef = useRef<BottomSheet>(null);

    if (!destination || !destination.location) return (
        <View className='flex-1 items-center justify-center'>
            <Text className='text-center text-2xl font-MontserratSemiBold text-red-500'>Storage Not Found</Text>
        </View>
    );

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

    const regionWithDestination = calculateRegionWithDestination({
        userLatitude: Number(latitude),
        userLongitude: Number(longitude),
        destinationLatitude: Number(destination.latitude),
        destinationLongitude: Number(destination.longitude),
    })
    return (
        <>
            <MapView
                provider={provider}
                className='h-full w-full rounded-2xl'
                style={{ width: '100%', height: '100%' }}
                tintColor='black'
                region={regionWithDestination}
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
            {selectedStorageData && <BottomSheet
                ref={bottomSheetRef}
                snapPoints={['8%', '40%', "55%"]}
                index={1}
                keyboardBehavior='interactive'
            >
                <BottomSheetView
                    className={"flex-1"}
                >
                    <View>
                        <Link
                            href={`/cold-storage/${selectedStorageData.id}`}
                            className={"p-3 underline underline-offset-2"}
                        >
                            <Text className='text-2xl font-MontserratSemiBold text-primary max-w-[80%] leading-6 font-semibold'>{selectedStorage}</Text>
                        </Link>
                        <Image
                            source={{ uri: `http://46.101.23.53/${selectedStorageData.photo}` }}
                            className='w-full h-80'
                            resizeMode='cover'
                        />
                        <View className='p-3'>
                            <Text className='text-gray-300 text-lg'>
                                Distance: <Text className='text-2xl text-red-500 font-bold'>{!hubDistanceLoading ? hubDistance ? `${hubDistance}km` : "Distance Not Available" : "Calculating..."}</Text>
                            </Text>
                            <Text className='text-gray-300 text-lg'>
                                Location: <Text className='text-2xl text-black'>{selectedStorageData.location}</Text>
                            </Text>
                        </View>
                    </View>
                </BottomSheetView>
            </BottomSheet>}
        </>
    )
}
