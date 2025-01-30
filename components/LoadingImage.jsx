import React from 'react';
import { View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withRepeat,
    withTiming,
    useSharedValue,
    withSequence
} from 'react-native-reanimated';

export default function LoadingImage() {
    const opacity = useSharedValue(1);

    React.useEffect(() => {
        opacity.value = withRepeat(
            withSequence(
                withTiming(0.6, { duration: 1000 }),
                withTiming(1, { duration: 1000 })
            ),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }));

    return (
        <View className="flex-1 absolute top-0 left-0 h-full w-full">
            <Animated.Image
                source={require('@/assets/images/main-splash-screen.jpg')}
                className='absolute top-0 left-0 h-full w-full'
                resizeMode="cover"
                style={animatedStyle}
            />
        </View>
    );
}