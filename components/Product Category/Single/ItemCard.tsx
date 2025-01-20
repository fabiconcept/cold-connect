import AnimatedPressable from '@/components/general sub components/AnimatedPress';
import clsx from 'clsx';
import { View, Text, Dimensions, Image, ImageSourcePropType } from 'react-native';

const { width } = Dimensions.get('window');

export default function ItemCard({
    title,
    imageSource,
    backgroundImage,
    onPress
}: {
    title: string;
    imageSource: ImageSourcePropType;
    backgroundImage: ImageSourcePropType;
    onPress?: () => void
}) {
    const dynamicWidth = Math.min((width / 2) - 16, 190);
    return (
        <AnimatedPressable onPress={onPress}>
            <View
                style={{
                    width: dynamicWidth,
                    height: dynamicWidth * 0.97
                }}
                className='bg-white border border-gray-100 shadow-lg shadow-black/30 rounded-3xl overflow-hidden relative mr-3 last:mr-1'
            >
                <Image
                    source={backgroundImage}
                    className='w-full h-full'
                    resizeMode='cover'
                />
                <Image
                    source={imageSource}
                    className={clsx(
                        'absolute top-0 right-0 drop-shadow-lg',
                        title === "Vegetables" && "-top-5 -right-5",
                    )}
                    resizeMode='contain'
                    style={{
                        width: dynamicWidth * 0.9,
                        height: dynamicWidth * 0.87
                    }}
                />
                <Text className='absolute bottom-2 left-2 text-center w-full text-lg font-semibold'>{title}</Text>
            </View >
        </AnimatedPressable>
    )
}