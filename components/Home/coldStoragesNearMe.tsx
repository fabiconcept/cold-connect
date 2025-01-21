import { Link } from 'expo-router';
import { View, Text } from 'react-native';
import Swiper from '../Swiper';
import StorageCard from './sub components/StorageCard';


export default function ColdStoragesNearMe() {
    return (
        <View className='mx-3 mt-5'>
            <View className='flex-row items-center justify-between mx-2 my-2'>
                <Text className='text-xl font-semibold font-MontserratSemiBold'>Cold Storages Near Me <Text className='text-base text-gray-400 font-MontserratSemiBold'>(03)</Text></Text>
                <Link href={"/(root)/(tabs)/storage"} className='text-primary text-lg font-MontserratSemiBold'>See all</Link>
            </View>

            <Swiper
                data={[0, 1, 2]}
                renderItem={({ item }) => (
                    <StorageCard />
                )}
            />
        </View>
    )
}