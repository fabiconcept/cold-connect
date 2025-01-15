import clsx from 'clsx';
import { Image, TouchableOpacity } from 'react-native';
import { View } from 'react-native';

export default function OAuth({
    className
}: {
    className?: string
}) {
    return (
        <View className={clsx(
            'flex-row gap-2 justify-center items-center',
            className
        )}>
            <TouchableOpacity className='p-2 bg-gray-200 rounded-full'>
                <Image
                    source={require("@/assets/images/cold/google.png")}
                    resizeMode='contain'
                    className='w-10 h-10'
                />
            </TouchableOpacity>
            <TouchableOpacity className='p-2 bg-gray-200 rounded-full'>
                <Image
                    source={require("@/assets/images/cold/facebook.png")}
                    resizeMode='contain'
                    className='w-10 h-10'
                />
            </TouchableOpacity>
            <TouchableOpacity className='p-2 bg-gray-200 rounded-full'>
                <Image
                    source={require("@/assets/images/cold/apple.png")}
                    resizeMode='contain'
                    className='w-10 h-10'
                />
            </TouchableOpacity>

        </View>
    )
}