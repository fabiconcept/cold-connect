import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Header() {
    return (
        <View className='px-3 z-20 justify-between items-center flex-row'>
            <TouchableOpacity
                hitSlop={20}
                className='w-[50px] h-[50px] justify-center items-center rounded-full bg-white shadow-lg'
                onPress={() => router.back()}
            >
                <Feather
                    name="chevron-left"
                    size={24}
                    color="black"
                />
            </TouchableOpacity>
            <Text className='flex-1 text-center font-semibold text-xl w-full font-MontserratSemiBold'>My Invoices</Text>
            <View className='w-[50px]' />
        </View>
    )
}