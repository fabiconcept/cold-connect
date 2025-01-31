import { Link } from 'expo-router';
import { View, Text, Image } from 'react-native';
import StorageCard from './sub components/StorageCard';
import { useHubsAroundMe } from '@/store/Public/Public Storage Feed Endpoints/hubsAround';
import LoadingStorageCard from './sub components/LoadingStorageCard';


export default function ColdStoragesAroundMe() {
    const { loading, allstorages, error } = useHubsAroundMe();

    if (loading) return (
        <View className='mx-3 mt-5'>
            <View className='flex-row items-center justify-between mx-2 my-2 opacity-65'>
                <Text className='text-xl font-semibold font-MontserratSemiBold'>Cold Storages Around Me</Text>
            </View>

            <View className='gap-3'>
                <LoadingStorageCard />
                <LoadingStorageCard />
            </View>
        </View>
    );

    if (!allstorages) return null;

    const { data, total } = allstorages;

    return (
        <View className='mx-3 mt-5'>
            <View className='flex-row items-center justify-between mx-2 my-2'>
                <Text className='text-xl font-semibold font-MontserratSemiBold'>Cold Storages Around Me <Text className='text-base text-gray-400 font-MontserratSemiBold'>({total})</Text></Text>
                <Link href={"/(root)/(tabs)/storage"} className='text-primary text-lg font-MontserratSemiBold'>See all</Link>
            </View>

            <View className='gap-3'>
                {data.length > 0 && data.slice(0, 3).map((item) => (
                    <StorageCard key={item.id} hub_name={item.name} imageSource={item.photo} address={item.location} rating={item.star} status={item.availability as "active" | "inactive"} distance={item.distance} hub_id={item.id} />
                ))}
                {data.length === 0 &&
                    <View className='flex-1 items-center justify-center pt-10'>
                        <Image
                            source={require('@/assets/images/cold/no-result.png')}
                            resizeMode='contain'
                            className='w-36 h-36'
                            alt='No Storages Found Around You'
                        />
                        <Text className='font-MontserratSemiBold font-semibold text-primary'>No Storages Found Around You</Text>
                    </View>
                }
            </View>
        </View >
    )
}