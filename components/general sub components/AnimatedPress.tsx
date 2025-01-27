import { AnimatedPressableProps } from '@/types/types';
import { useState } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function AnimatedPressable({
    children,
    className,
    activeOpacity,
    containerClassName,
    ...props
}: AnimatedPressableProps) {

    const [isPressed, setIsPressed] = useState(false);


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withSpring(isPressed ? 0.95 : 1, {
                        damping: 10,
                        stiffness: 300
                    }),
                },
                {
                    translateY: withSpring(isPressed ? 3 : 0, {
                        damping: 10,
                        stiffness: 200
                    }),
                }
            ],
            ...(activeOpacity !== undefined ? {
                opacity: withSpring(isPressed ? activeOpacity : 1, {
                    damping: 10,
                    stiffness: 200
                })
            } : {})
        };
    });

    return (
        <Animated.View className={containerClassName} style={animatedStyle}>
            <Pressable
                className={`${className}`}
                style={{
                    opacity: props.disabled ? 0.8 : 1
                }}
                onPressIn={() => !props.disabled && setIsPressed(true)}
                onPressOut={() => !props.disabled && setIsPressed(false)}
                hitSlop={10}
                {...props}
            >
                {children}
            </Pressable>
        </Animated.View>
    )
}