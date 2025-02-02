import { View, Image, ImageSourcePropType } from 'react-native';

export default function BackBlur({ source }: {
    source: ImageSourcePropType
}) {
    return (
        <View className='items-center justify-center absolute top-0 left-0'>
            <Image
                source={source}
                resizeMode='cover'
                height={430}
                width={362}
                className='object-center'
            />
        </View>
    )
}