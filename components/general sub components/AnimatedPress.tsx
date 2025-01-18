import { AnimatedPressableProps } from '@/types/types';
import { useState } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function AnimatedPressable({
    children,
    className,
    activeOpacity,
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
        <Animated.View style={animatedStyle}>
            <Pressable
                className={`${className}`}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                hitSlop={10}
                {...props}
            >
                {children}
            </Pressable>
        </Animated.View>
    )
}