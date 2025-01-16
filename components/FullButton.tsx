import { Text, TouchableOpacity } from 'react-native';
import clsx from 'clsx';
import { ButtonProps } from '@/types/button';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useState } from 'react';

export default function FullButton(props: ButtonProps) {
    const {
        iconLeft: IconLeft,
        iconRight: IconRight
    } = props;
    const [isPressed, setIsPressed] = useState(false);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withSpring(isPressed ? 0.95 : 1, {
                        damping: 10,
                        stiffness: 200
                    }),
                },
            ],
        };
    });

    return (
        <Animated.View style={animatedStyle}>
            <TouchableOpacity
                className={clsx(
                    "py-4 rounded-xl flex-row items-center justify-center",
                    props.className
                )}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                {...props}
            >
                {IconLeft && <IconLeft />}
                <Text className={clsx('text-center text-base', props.textClassName)}>{props.title}</Text>
                {IconRight && <IconRight />}
            </TouchableOpacity>
        </Animated.View>
    )
}