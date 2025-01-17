import clsx from 'clsx';
import { View, Text } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

export default function TabIcon({ focused, Icon, title, className }: {
    focused: boolean,
    Icon: React.JSX.Element,
    title: string,
    className?: string
}) {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withSpring(focused ? 1.05 : 1, {
                        damping: 10,
                        stiffness: 200
                    })
                }
            ],
            backgroundColor: withTiming(focused ? 'rgba(0,0,0,0.3)' : 'transparent', {
                easing: Easing.inOut(Easing.quad),
                duration: 200,
            })
        };
    });

    return (
        <Animated.View style={animatedStyle} className={clsx(
            "text-center p-2 rounded-xl h-[60px] items-center justify-center w-[68px] -mt-[28]",
            className,
        )}>
            {Icon}
            <Text className='text-xs text-white text-center'>{title}</Text>
        </Animated.View>
    )
}