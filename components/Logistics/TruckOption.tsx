import { TruckOptionProps } from '@/types/types';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Checkbox from '../Form/Checkbox';
import { useState } from 'react';
import { useLogisticsStore } from '@/store/Logistics';
import clsx from 'clsx';

export default function TruckOption({
    title,
    loadLimit,
    price,
    TruckImage,
    type
}: TruckOptionProps) {
    const { truckType, setTruckType } = useLogisticsStore();

    return (
        <TouchableOpacity
            onPress={() => setTruckType(type)}
            className={clsx(
                'bg-white rounded-2xl overflow-hidden border border-gray-200 shadow',
                truckType === type ? "" : "opacity-80"
            )}
            style={{
                width: (Dimensions.get("window").width / 2) - 18
            }}
        >
            <Text className='py-4 text-center text-gray-400 text-sm'>{title}</Text>
            <Checkbox
                label={""}
                checked={truckType === type}
                onPress={() => setTruckType(type)}
                containerStyle='absolute top-4 right-4'
                checkedColor='#04B90B'
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
        </TouchableOpacity>
    )
}