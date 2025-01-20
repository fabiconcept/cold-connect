import clsx from 'clsx';
import { useState } from 'react';
import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function CategoryCard({
    title,
    imageSource,
    backgroundImage,
    className,
    onPress,
    sizeVariant = "large"
}: {
    title: string,
    imageSource: ImageSourcePropType,
    backgroundImage: ImageSourcePropType,
    className?: string,
    onPress?: () => void,
    sizeVariant?: "small" | "large"
}) {

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
                    translateY: withSpring(isPressed ? 5 : 0, {
                        damping: 10,
                        stiffness: 200
                    }),
                }
            ],
        };
    });

    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                className={clsx(
                    'bg-white items-center justify-center rounded-2xl shadow-lg shadow-black/20',
                    sizeVariant === "large" && 'w-[72px]',
                    sizeVariant === "small" && 'w-[62px]',
                    className
                )}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                onPress={onPress}
            >
                <View className={clsx(
                    'rounded-2xl overflow-hidden relative items-center justify-center',
                    sizeVariant === "large" && 'w-[72px] h-[70px]',
                    sizeVariant === "small" && 'w-[62px] h-[60px]'
                )}>
                    <Image
                        source={backgroundImage}
                        className='w-full h-full'
                        resizeMode='contain'
                    />
                    <Image
                        source={imageSource}
                        className={clsx(
                            'w-full h-full absolute',
                            title === "Dairy" && 'w-[70%] h-[70%]',
                            title === "Fruits" && 'w-[70%] h-[70%]',
                            title === "Vegetable" && 'w-[80%] h-[80%] -right-2 top-0',
                            title === "Meat" && '-right-3',
                        )}
                        resizeMode='contain'
                    />
                </View>
                <Text className={clsx(
                    'text-center p-2 font-MontserratSemiBold font-semibold',
                    sizeVariant === "large" && 'text-sm',
                    sizeVariant === "small" && 'text-xs'
                )}>{title}</Text>
            </Pressable>
        </Animated.View>
    )
}