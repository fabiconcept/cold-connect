import { View, Image } from 'react-native';

export default function BackBlur() {
    return (
        <View className='items-center justify-center absolute top-0 left-0'>
            <Image
                source={require("@/assets/images/cold/back-blur.png")}
                resizeMode='cover'
                height={430}
                width={362}
                className='object-center'
            />
        </View>
    )
}