import { Feather } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function ProfilePhotoContainer() {
    return (
        <View className='mt-32 justify-center items-center'>
            <View className='w-[120px] h-[120px] rounded-full bg-gray-200 border-4 border-black/10 mx-auto overflow-hidden'>
                <Image
                    source={require("@/assets/images/cold/no-user.png")}
                    className='mx-auto h-full w-full'
                    resizeMode='cover'
                />
            </View>
            <TouchableOpacity
                className='absolute bottom-1 left-1/2 -translate-x-1/2 shadow-lg shadow-black bg-white w-[36px] h-[36px] rounded-full items-center justify-center'
                hitSlop={20}
            >
                <Feather
                    name="camera"
                    size={20}
                    color="#0066e1"
                />
            </TouchableOpacity>
        </View>
    )
}