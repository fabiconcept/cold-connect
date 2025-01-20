import { View, Text } from 'react-native';

export default function Details() {
    return (
        <View className='mt-2 gap-2'>
            <View className='flex-row justify-between px-1'>
                <Text className='text-3xl font-semibold font-MontserratSemiBold'>Fruits</Text>
                <Text className='text-xl text-gray-400 font-semibold font-MontserratSemiBold'>
                    <Text className='text-3xl text-red-500'>₦200</Text>/crate
                </Text>
            </View>
            <Text className='text-justify leading-6 text-lg text-gray-500 font-MontserratSemiBold'>
                Keep your fruits fresh with Cold Connect's specialized cold storage. Our crates, priced at 200 Naira each, maintain the ideal conditions to preserve your produce. Store with confidence, knowing your fruits are in expert hands.
            </Text>
        </View>
    )
}