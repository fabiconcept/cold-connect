import { View, Text, Dimensions } from 'react-native';
import AnimatedPressable from '../general sub components/AnimatedPress';

const { width } = Dimensions.get("window");

export default function Action({
    title,
    Icon
}: {
    title: string;
    Icon: React.JSX.Element;
}) {
    const dynamicWidth = (width / 5) - 10;
    const dynamicHeight = dynamicWidth * 0.9;

    return (
        <AnimatedPressable
         activeOpacity={0.8}
        >
            <View className='gap-2 items-center'>
                <View
                    className='p-2 rounded-xl bg-white items-center justify-center border border-gray-200 shadow'
                    style={{
                        width: dynamicWidth,
                        height: dynamicHeight
                    }}
                >
                    {Icon}
                </View>
                <Text
                    style={{ width: dynamicWidth }}
                    numberOfLines={1}
                    className='text-sm text-wrap font-MontserratSemiBold text-center'
                >{title}</Text>
            </View>
        </AnimatedPressable>
    )
}