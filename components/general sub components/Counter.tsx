import clsx from 'clsx';
import { useState } from 'react';
import { View, Text, Dimensions, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);

export default function Counter({ title, sizeVariant = "large", defaultValue = 1, onValueChange }: {
    title: string,
    sizeVariant?: "small" | "large",
    defaultValue?: number,
    onValueChange?: (value: number) => void
}) {
    const [isActive, setIsActive] = useState({
        decrement: false,
        increment: false,
    });
    const [counter, setCounter] = useState(defaultValue);

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
        <View className='bg-white rounded-2xl overflow-hidden border shadow-2xl shadow-black border-gray-200' style={{
            width: sizeVariant === "small" ? (Dimensions.get("window").width / 3) - 18 : (Dimensions.get("window").width / 2) - 18
        }}>
            <Text className={clsx(
                'text-center text-gray-400',
                sizeVariant === "small" && 'pt-2 pb-1 text-xs',
                sizeVariant === "large" && 'py-4 text-sm'
            )}>{title}</Text>
            <Text className={clsx(
                'text-center font-bold font-MontserratBold',
                sizeVariant === "small" && 'text-2xl py-1',
                sizeVariant === "large" && 'text-4xl py-4'
            )}>{counter < 10 ? `0${counter}` : counter}</Text>
            <View className='flex-row justify-between'>
                <AnimatedTouchable
                    className={clsx(
                        'border border-gray-300 flex-1 rounded-bl-2xl items-center justify-center',
                        sizeVariant === "small" && 'py-2',
                        sizeVariant === "large" && 'py-4',
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
                    onPress={() => {
                        if (counter > 1) {
                            const value = counter - 1;
                            setCounter(value);
                            onValueChange && onValueChange(value);
                        }
                    }}
                    style={decrementStyle}
                >
                    <Text className='text-2xl font-MontserratSemiBold text-center'>-</Text>
                </AnimatedTouchable>
                <AnimatedTouchable
                    className={clsx(
                        'border border-gray-300 flex-1 rounded-br-2xl items-center justify-center',
                        sizeVariant === "small" && 'py-2',
                        sizeVariant === "large" && 'py-4',
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
                    onPress={() => {
                        const value = counter + 1;
                        if (value > 99) return;
                        setCounter(value);
                        onValueChange && onValueChange(value);
                    }}
                    style={incrementStyle}
                >
                    <Text className='text-2xl font-MontserratSemiBold text-center'>+</Text>
                </AnimatedTouchable>
            </View>
        </View>
    )
}