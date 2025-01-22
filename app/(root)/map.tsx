import Header from '@/components/Map/Header';
import { calculateRegion } from '@/lib/Map Utilities';
import { useLocationStore, useStorageStore } from '@/store';
import { View, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function Map() {
    const { latitude, longitude } = useLocationStore();

    const { storages } = useStorageStore();

    const region = calculateRegion({
        latitude: latitude,
        longitude: longitude,
    });

    return (
        <View className='flex-1 h-full w-full justify-center items-center'>
            <MapView
                provider={PROVIDER_GOOGLE}
                className='h-full w-full rounded-2xl'
                style={{ width: '100%', height: '100%' }}
                tintColor='black'
                region={region}
                mapType='standard'
                showsMyLocationButton={false}
                showsPointsOfInterest={false}
                showsUserLocation={true}
                userInterfaceStyle='light'
            >
                {storages && storages.map((storage) => {
                    if (!storage.location) return null;
                    return (<Marker
                        key={storage.name}
                        coordinate={{
                            longitude: Number(storage.location.longitude),
                            latitude: Number(storage.location.latitude)
                        }}
                        title={storage.name}
                    >
                        <Image
                            source={require("@/assets/images/cold/storage.png")}
                            resizeMode='contain'
                            className='w-5 h-5'
                        />
                    </Marker>)
                })}
            </MapView>
            <Header />
        </View>
    )
}