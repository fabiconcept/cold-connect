import { TruckOptionProps } from '@/types/types';
import { View, Text, Dimensions } from 'react-native';
import Checkbox from '../Form/Checkbox';
import { useState } from 'react';

export default function TruckOption({
    title,
    loadLimit,
    price,
    TruckImage
}: TruckOptionProps) {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View className='bg-white rounded-2xl overflow-hidden border border-gray-200 shadow' style={{
            width: (Dimensions.get("window").width / 2) - 18
        }}>
            <Text className='py-4 text-center text-gray-400 text-sm'>{title}</Text>
            <Checkbox
                label={""}
                checked={isChecked}
                onPress={() => setIsChecked(!isChecked)}
                containerStyle='absolute top-4 right-4'
            />
            <View className='flex-1 items-center justify-center mb-5'>
                {TruckImage}
            </View>
            <View
                className='border-t border-gray-200 p-4'
                style={{
                    width: (Dimensions.get("window").width / 2) - 18
                }}
            >
                <View className='flex-row justify-between'>
                    <Text className='text-gray-400 text-sm'>Load Limit:</Text>
                    <Text className='text-black text-sm'>{loadLimit}</Text>
                </View>
                <View className='flex-row justify-between'>
                    <Text className='text-gray-400 text-sm'>Price/100km:</Text>
                    <Text className='text-red-500 text-sm'>{price}</Text>
                </View>
            </View>
        </View>
    )
}