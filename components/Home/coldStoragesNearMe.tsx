import { View, Text, Image } from 'react-native';
import Swiper from '../Swiper';
import StorageCard from './sub components/StorageCard';
import { useHubsNearMe } from '@/store/Public/Public Storage Feed Endpoints/nearByHubs';
import LoadingStorageCard from './sub components/LoadingStorageCard';


export default function ColdStoragesNearMe() {
    const { loading, storages, total, error } = useHubsNearMe();

    if (loading) return (
        <View className='mx-3 mt-5'>
            <LoadingStorageCard />
        </View>
    );

    if (error) return (
        <View className='mx-3 mt-5 mb-5'>
            <View className='flex-row items-center justify-between mx-2 my-2'>
                <Text className='text-xl font-semibold font-MontserratSemiBold'>Cold Storages Near Me</Text>
            </View>
            <View className='flex-1 items-center justify-center py-5'>
                <Text className='font-MontserratSemiBold font-semibold text-red-500'>{error}</Text>
            </View>
        </View>
    );

    if (storages.length === 0) return (
        <View className='mx-3 mt-5 mb-5'>
            <View className='flex-row items-center justify-between mx-2 my-2'>
                <Text className='text-xl font-semibold font-MontserratSemiBold'>Cold Storages Near Me</Text>
            </View>
            <View className='flex-1 items-center justify-center pt-5'>
                <Image
                    source={require('@/assets/images/cold/no-result.png')}
                    resizeMode='contain'
                    className='w-36 h-36'
                    alt='No Storages Found Near You'
                />
                <Text className='font-MontserratSemiBold font-semibold text-primary'>No Storages Found Near You</Text>
            </View>
        </View>
    );

    return (
        <View className='mx-3 mt-5'>
            <View className='flex-row items-center justify-between mx-2 my-2'>
                <Text className='text-xl font-semibold font-MontserratSemiBold'>Cold Storages Near Me <Text className='text-base text-gray-400 font-MontserratSemiBold'>({total})</Text></Text>
            </View>
            <Swiper
                data={storages}
                renderItem={({ item, index }) => (
                    <StorageCard
                        hub_name={item.name}
                        imageSource={item.photo}
                        address={item.location}
                        rating={item.star}
                        status={item.availability as "active" | "inactive"}
                        distance={item.distance}
                        hub_id={item.id}
                        key={index}
                        coordinates={{
                            latitude: Number(item.latitude),
                            longitude: Number(item.longitude)
                        }}
                    />
                )}
            />
        </View>
    )
}