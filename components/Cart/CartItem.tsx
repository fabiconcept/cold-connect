import { View, Text, Image, TouchableOpacity } from 'react-native';
import Checkbox from '../Form/Checkbox';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { CartItemProps } from '@/types/types';
import clsx from 'clsx';
import { useState } from 'react';

export default function CartItem({
    title,
    price,
    quantity,
    image,
    isLast,
}: CartItemProps) {
    const [isChecked, setIsChecked] = useState(true);
    const [counter, setCounter] = useState(12);

    const disabled = !isChecked || counter === 0;

    return (
        <View className='pl-3'>
            {isLast && <View
                className='border-b border-l h-16  rounded-bl-xl w-5 border-gray-300 absolute -translate-y-3'
            ></View>}
            {!isLast && <View
                className='border-l h-28  w-5 border-gray-300 absolute -translate-y-3'
            ></View>}
            <View className={clsx(
                'bg-white rounded-2xl overflow-hidden border border-gray-300 shadow-xl shadow-black/10 p-2 gap-1 flex-row',
                isLast ? 'mb-0' : "mb-3",
                disabled && 'grayscale opacity-50'
            )}>
                <TouchableOpacity
                    onPress={() => router.push("/(root)/product-category/1")}
                >
                    <Image
                        source={require("@/assets/images/cold/fish-cart-tem.png")}
                        resizeMode='contain'
                        className='w-20 h-20'
                    />
                </TouchableOpacity>
                <View className='flex-1 justify-center gap-2'>
                    <View className='flex-row px-2 items-start'>
                        <View className='flex-1'>
                            <Text className='font-bold'>Fish</Text>
                            <Text className='text-sm text-gray-500 -mt-1'>₦200/crate</Text>
                        </View>
                        <Checkbox
                            label=''
                            checked={isChecked && counter > 0}
                            onPress={() => counter > 0 && setIsChecked(!isChecked)}
                            checkedColor='#04B90B'
                        />
                    </View>
                    <View className='flex-row px-2 items-center'>
                        <Text className='font-bold flex-1'>₦20,300.00</Text>
                        <View className='flex-row items-center gap-2'>
                            <TouchableOpacity
                                className='h-6 w-6 items-center justify-center border border-gray-300 rounded'
                                hitSlop={10}
                                onPress={() => setCounter(Math.max(0, counter - 1))}
                            >
                                <Feather
                                    name="minus"
                                    size={10}
                                    color="black"
                                />
                            </TouchableOpacity>
                            <Text>{counter}</Text>
                            <TouchableOpacity
                                className='h-6 w-6 items-center justify-center border border-gray-300 rounded'
                                hitSlop={10}
                                onPress={() => setCounter(Math.max(0, counter + 1))}
                            >
                                <Feather
                                    name="plus"
                                    size={10}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}