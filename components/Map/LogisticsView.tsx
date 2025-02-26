import { useLogisticsStore } from '@/store/Logistics';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { useLocationStore } from '@/store';
import AutocompleteInput from './Components/AutocompleteInput';
import { calculateRegion, calculateRegionWithDestination } from '@/lib/Map Utilities';
import TruckOption from '../Logistics/TruckOption';
import TruckSmall from '@/assets/svgs/logistics/truck-small';
import TruckLarge from '@/assets/svgs/logistics/truck-large';

export default function LogisticsView({
    provider,
}: {
    provider: "google"
}) {
    const { setFromLocation, setToLocation, truckType, setTruckType, toLocation, fromLocation } = useLogisticsStore();
    const { address, latitude, longitude, hasLocationPermission } = useLocationStore();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [myLocation, setMyLocation] = useState(fromLocation.address);
    const [destinationLocation, setDestinationLocation] = useState(toLocation.address);

    useEffect(() => {
        if (!hasLocationPermission) return;
        if (fromLocation.address !== "") return;

        setFromLocation({
            address,
            latitude,
            longitude
        });
        setMyLocation(address);
    }, [fromLocation, hasLocationPermission, address, latitude, longitude]);


    const region = useMemo(() => {
        if (!fromLocation.latitude || !fromLocation.longitude) return undefined;
        if (toLocation.latitude && toLocation.longitude) {
            return calculateRegionWithDestination({
                userLatitude: fromLocation.latitude,
                userLongitude: fromLocation.longitude,
                destinationLatitude: toLocation.latitude,
                destinationLongitude: toLocation.longitude,
            });
        }
        return calculateRegion({
            latitude: fromLocation.latitude,
            longitude: fromLocation.longitude
        });
    }, [fromLocation, toLocation]);

    return (
        <>
            <MapView
                provider={provider}
                className='h-full w-full rounded-2xl'
                style={{ width: '100%', height: '100%' }}
                tintColor='black'
                region={region}
                mapType='standard'
                showsMyLocationButton={true}
                showsUserLocation={true}
                userInterfaceStyle='light'
            ></MapView>

            {<BottomSheet
                ref={bottomSheetRef}
                snapPoints={["5%", '30%', '50%', "70%", "90%"]}
                index={3}
                keyboardBehavior='interactive'
                handleStyle={{
                borderTopColor: 'green',
                borderTopWidth: 1,
                borderTopEndRadius: 20,
                borderTopStartRadius: 20,

                }}
            >
                <BottomSheetView
                    className={"flex-1"}
                >
                    <ScrollView className='flex-1'>
                        <View className='flex flex-col p-4 relative z-50'>
                            <View className='relative z-10'>
                                <Text>My Location:</Text>
                                <AutocompleteInput
                                    value={myLocation}
                                    onChangeText={(text) => setMyLocation(text)}
                                    setSelectedValue={setFromLocation}
                                    selectedValue={fromLocation}
                                />
                            </View>
                            <View className='mt-5'>
                                <Text>Destination:</Text>
                                <AutocompleteInput
                                    value={destinationLocation}
                                    onChangeText={(text) => setDestinationLocation(text)}
                                    setSelectedValue={setToLocation}
                                    selectedValue={toLocation}
                                />
                            </View>
                        </View>
                        <View className='px-4 flex-wrap gap-2 flex-row h-[16rem] mt-5'>
                            <TruckOption
                                title='10 Ton'
                                TruckImage={<TruckSmall
                                    width={150}
                                    height={100}
                                />}
                                type='medium'
                                highlighted
                                loadLimit='25,000 kg'
                                price='50,000 ₦'
                            />
                            <TruckOption
                                title='100 Ton'
                                TruckImage={<TruckLarge
                                    width={150}
                                    height={100}
                                />}
                                highlighted
                                type='large'
                                loadLimit='50,000 kg'
                                price='80,000 ₦'
                            />
                        </View>
                    </ScrollView>
                </BottomSheetView>
            </BottomSheet>}
        </>
    )
}