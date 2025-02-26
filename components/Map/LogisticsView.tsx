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
import { useCalculateDistance } from '@/lib/Hooks/useCalculateDistance';
import FullButton from '../FullButton';
import clsx from 'clsx';

export default function LogisticsView({
    provider,
}: {
    provider: "google"
}) {
    const { setFromLocation, setToLocation, truckType, setTruckType, toLocation, fromLocation, quantity, boxQuantity, } = useLogisticsStore();
    const { address, latitude, longitude, hasLocationPermission } = useLocationStore();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [myLocation, setMyLocation] = useState(fromLocation.address);
    const [destinationLocation, setDestinationLocation] = useState(toLocation.address);
    const [hubDistance, hubDistanceLoading, setHubCoordinates] = useCalculateDistance();

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

    const prices = {
        "medium": 50000,
        "large": 80000,
    }


    const region = useMemo(() => {
        if (!fromLocation.latitude || !fromLocation.longitude) return undefined;
        if (toLocation.latitude && toLocation.longitude) {
            setHubCoordinates({
                start: {
                    latitude: fromLocation.latitude,
                    longitude: fromLocation.longitude
                },
                end: {
                    latitude: toLocation.latitude,
                    longitude: toLocation.longitude
                }
            });

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

    const canProceed = useMemo(() => {
        if (!truckType) return false;
        if (!fromLocation.latitude || !fromLocation.longitude) return false;
        if (!toLocation.latitude || !toLocation.longitude) return false;
        return true;
    }, [truckType, fromLocation, toLocation]);

    return (
        <>
            <Text numberOfLines={1} className={'absolute top-20 right-5 text-5xl z-50 text-red-500'}>
                {hubDistanceLoading ? "Calculating..." : `${hubDistance ? `${Math.round(hubDistance)}km` : "0km"}`}
            </Text>
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
                snapPoints={["15%", "85%"]}
                index={1}
                containerStyle={{
                    zIndex: 90
                }}
                keyboardBehavior='interactive'
                handleStyle={{
                    borderTopEndRadius: 50,
                    borderTopStartRadius: 50,
                }}
            >
                <BottomSheetView
                    className={"flex-1"}
                >
                    <View className='flex flex-col p-4 relative z-50'>
                        <View className='mb-4'>
                            <View className='flex-row gap-2 justify-between'>
                                <Text className='text-gray-400'>Crate Quantity: <Text className='text-lg text-green-500'>{quantity}</Text></Text>
                                <Text className='text-gray-400'>Box Quantity: <Text className='text-lg text-green-500'>{boxQuantity}</Text></Text>
                            </View>
                            <Text className='text-right mt-2 text-3xl text-green-500'>₦{
                                hubDistance ? ((boxQuantity + quantity) * prices[truckType] * (hubDistance / 100)).toLocaleString() : 0
                            }</Text>
                        </View>
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
                    <View
                        className='flex-1'
                    />
                    <View className='flex-row px-4 gap-2 py-6'>
                        <FullButton
                            title={"Checkout"}
                            containerClassName='flex-1'
                            className={clsx(
                                'w-full rounded-full py-4 border',
                                canProceed ? 'border-primary' : "border border-gray-500",
                            )}
                            canProceed={canProceed}
                            textClassName={clsx(
                                'text-lg font-semibold',
                                canProceed ? 'text-primary' : "text-gray-500",
                            )}
                        />
                        <FullButton
                            title={"Add to Cart"}
                            containerClassName='flex-1'
                            className={clsx(
                                'w-full rounded-full py-4',
                                canProceed ? 'bg-primary' : "border border-primary",
                            )}
                            canProceed={canProceed}
                            textClassName={clsx(
                                'text-lg font-semibold',
                                canProceed ? 'text-white' : "text-primary",
                            )}
                        />
                    </View>
                </BottomSheetView>
            </BottomSheet>}
        </>
    )
}