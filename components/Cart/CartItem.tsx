import { View, Text, Image, TouchableOpacity } from 'react-native';
import Checkbox from '../Form/Checkbox';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { CartItemProps } from '@/types/types';
import clsx from 'clsx';
import { useState } from 'react';
import { useProducts } from '@/store/Products';
import { useCrates } from '@/store/Crates';

export default function CartItem({
    title,
    price,
    quantity,
    image,
    isLast,
    storageLength,
    type
}: CartItemProps) {
    const [isChecked, setIsChecked] = useState(true);
    const [counter, setCounter] = useState(quantity);
    const { updateProduct, products } = useProducts();
    const { setQuantity } = useCrates();


    const disabled = !isChecked || counter === 0;

    const counterAdjusted = (value: number) => {
        switch (type) {
            case "storage":
                const productInfoExists = products.find(product => product.title.includes(title.toLowerCase()))!;
                updateProduct({ ...productInfoExists, quantity: value });
                break;
            case "crate":
                setQuantity(value);
                break;
        }
    }

    return (
        <View className='pl-6'>
            {isLast && <View
                className='border-b border-l h-16  rounded-bl-xl w-5 border-gray-300 absolute left-2 -translate-y-3'
            ></View>}
            {!isLast && <View
                className='border-l h-28  w-5 border-gray-300 absolute left-2 -translate-y-3'
            ></View>}
            <View className={clsx(
                'bg-white rounded-2xl overflow-hidden border border-gray-300 shadow-xl shadow-black/10 p-2 gap-1 flex-row',
                isLast ? 'mb-0' : "mb-3",
                disabled && 'grayscale opacity-50'
            )}>
                <TouchableOpacity
                    onPress={() => router.push(`/(root)/product-category/${title}`)}
                >
                    <Image
                        source={image}
                        resizeMode='contain'
                        className='w-20 h-20'
                    />
                </TouchableOpacity>
                <View className='flex-1 justify-center gap-2'>
                    <View className='flex-row px-2 items-start'>
                        <View className='flex-1'>
                            <Text className='font-bold'>{title}</Text>
                            <Text className='text-sm text-gray-500'>₦{Number(price).toLocaleString()}/crate</Text>
                        </View>
                        <Checkbox
                            label=''
                            checked={isChecked && counter > 0}
                            onPress={() => counter > 0 && setIsChecked(!isChecked)}
                            checkedColor='#04B90B'
                        />
                    </View>
                    <View className='flex-row px-2 items-center'>
                        <Text className='flex-1 text-lg font-semibold fonm-MontserratSemiBold'>₦{Number(storageLength ? (price * counter) * storageLength : (price * counter)).toLocaleString()}</Text>
                        <View className='flex-row items-center gap-2'>
                            <TouchableOpacity
                                className='h-6 w-6 items-center justify-center border border-gray-300 rounded'
                                hitSlop={10}
                                onPress={() => {
                                    setCounter(Math.max(0, counter - 1))
                                    counterAdjusted(Math.max(0, counter - 1))
                                }}
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
                                onPress={() => {
                                    setCounter(Math.max(0, counter + 1))
                                    counterAdjusted(Math.max(0, counter + 1))
                                }}
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