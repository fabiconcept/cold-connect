import clsx from 'clsx';
import { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(View);

export default function Counter({ title }: {
    title: string
}) {
    const [isActive, setIsActive] = useState({
        decrement: false,
        increment: false,
    });

    const decrementScale = useSharedValue(1);
    const incrementScale = useSharedValue(1);

    const decrementStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: decrementScale.value }]
        };
    });

    const incrementStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: incrementScale.value }]
        };
    });

    return (
        <View className='bg-white rounded-2xl overflow-hidden border border-gray-200 shadow' style={{
            width: (Dimensions.get("window").width / 2) - 18
        }}>
            <Text className='py-4 text-center text-gray-400 text-sm'>{title}</Text>
            <Text className='text-center text-4xl pb-4 font-bold font-MontserratBold'>05</Text>
            <View className='flex-row justify-between'>
                <AnimatedTouchable
                    className={clsx(
                        'border border-gray-300 py-3 flex-1 rounded-bl-2xl items-center justify-center',
                        isActive.decrement && 'bg-gray-300'
                    )}
                    onTouchStart={() => {
                        setIsActive({ ...isActive, decrement: true });
                        decrementScale.value = withSpring(0.95, {
                            damping: 10,
                            stiffness: 500
                        });
                    }}
                    onTouchEnd={() => {
                        setIsActive({ ...isActive, decrement: false });
                        decrementScale.value = withSpring(1, {
                            damping: 10,
                            stiffness: 500
                        });
                    }}
                    style={decrementStyle}
                >
                    <Text className='text-2xl font-MontserratSemiBold text-center'>-</Text>
                </AnimatedTouchable>
                <AnimatedTouchable
                    className={clsx(
                        'border border-gray-300 py-3 flex-1 rounded-br-2xl items-center justify-center',
                        isActive.increment && 'bg-gray-300'
                    )}
                    onTouchStart={() => {
                        setIsActive({ ...isActive, increment: true });
                        incrementScale.value = withSpring(0.95, {
                            damping: 10,
                            stiffness: 500
                        });
                    }}
                    onTouchEnd={() => {
                        setIsActive({ ...isActive, increment: false });
                        incrementScale.value = withSpring(1, {
                            damping: 10,
                            stiffness: 500
                        });
                    }}
                    style={incrementStyle}
                >
                    <Text className='text-2xl font-MontserratSemiBold text-center'>+</Text>
                </AnimatedTouchable>
            </View>
        </View>
    )
}