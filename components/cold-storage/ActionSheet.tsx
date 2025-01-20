import { View, Text } from 'react-native';
import FullButton from '../FullButton';
import { router } from 'expo-router';

export default function ActionSheet() {
    return (
        <View className='absolute bottom-0 left-0 px-5 py-7 bg-white border-t shadow-2xl shadow-black border-gray-200 w-full'>
            <FullButton
                title='Use this Hub'
                containerClassName='flex-1'
                className='bg-primary w-full rounded-full py-4'
                textClassName='text-white text-lg font-semibold'
                onPress={() => router.push("/(root)/product-category")}
            />
        </View>
    )
}