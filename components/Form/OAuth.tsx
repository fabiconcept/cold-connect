import clsx from 'clsx';
import { Image, Platform } from 'react-native';
import { View } from 'react-native';
import AnimatedPressable from '../general sub components/AnimatedPress';

export default function OAuth({
    className
}: {
    className?: string
}) {
    return (
        <View className={clsx(
            'flex-row gap-3 justify-center items-center',
            className
        )}>
            <AnimatedPressable containerClassName='p-2 bg-gray-200 rounded-full border border-gray-300'>
                <Image
                    source={require("@/assets/images/cold/google.png")}
                    resizeMode='contain'
                    className='w-10 h-10'
                />
            </AnimatedPressable>
            <AnimatedPressable containerClassName='p-2 bg-gray-200 rounded-full border border-gray-300'>
                <Image
                    source={require("@/assets/images/cold/facebook.png")}
                    resizeMode='contain'
                    className='w-10 h-10'
                />
            </AnimatedPressable>
            {Platform.OS === "ios" && <AnimatedPressable containerClassName='p-2 bg-gray-200 rounded-full border border-gray-300'>
                <Image
                    source={require("@/assets/images/cold/apple.png")}
                    resizeMode='contain'
                    className='w-10 h-10'
                />
            </AnimatedPressable>}

        </View >
    )
}