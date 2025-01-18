import { View, Text } from 'react-native';
import StorageCard from '../Home/sub components/StorageCard';

export default function SuggestedHubs() {
    return (
        <View className='my-5 gap-2'>
            <View className='flex-row items-center justify-between mx-2 mb-3'>
                <Text className='text-lg font-semibold font-MontserratSemiBold'>Suggested Hubs<Text className='text-base text-gray-400 font-MontserratSemiBold'>(12)</Text></Text>
            </View>
            <StorageCard />
            <StorageCard />
            <StorageCard />
        </View>
    )
}