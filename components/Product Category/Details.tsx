import { View, Text } from 'react-native';

export default function Details({
    title,
    measurement,
    description,
    price
}: {
    title: string,
    measurement: "crate" | "tray",
    description: string,
    price: number
}) {
    return (
        <View className='mt-2 gap-2'>
            <View className='flex-row justify-between px-1'>
                <Text className='text-3xl font-semibold font-MontserratSemiBold'>{title.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</Text>
                <Text className='text-xl text-gray-400 font-semibold font-MontserratSemiBold'>
                    <Text className='text-3xl text-red-500'>₦{price}</Text>/{measurement}
                </Text>
            </View>
            <Text className='text-justify leading-6 text-lg text-gray-500 font-MontserratSemiBold'>
                {description}
            </Text>
        </View>
    )
}