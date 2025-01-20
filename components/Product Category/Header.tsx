import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, TouchableOpacity } from 'react-native';

export default function Header() {
    return (
        <View className='px-3 z-50 justify-between items-center flex-row absolute left-0 top-10 w-full shadow-lg'>
            <TouchableOpacity
                hitSlop={20}
                className='w-[50px] h-[50px] justify-center items-center rounded-full bg-white shadow-lg  border border-gray-400'
                onPress={() => router.back()}
            >
                <Feather
                    name="chevron-left"
                    size={24}
                    color="black"
                />
            </TouchableOpacity>
        </View>
    )
}