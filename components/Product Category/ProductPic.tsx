import { View, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function ProductPic() {
    return (
        <View className='items-center'>
            <Image
                source={require('@/assets/images/cold/apple-image.png')}
                className='-mt-52 h-[280px]'
                resizeMode='contain'
            />
        </View>
    )
}