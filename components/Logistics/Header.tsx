import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Header() {
    return (
        <View className='px-3 mt-5 z-20 absolute left-0 top-5 w-full flex-row justify-between items-center'>
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
            <Text className='flex-1 font-semibold text-xl text-center w-full font-MontserratSemiBold'>Cold Logistics</Text>
            <View className='w-[50px]' />
        </View>
    )
}