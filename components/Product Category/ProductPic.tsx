import clsx from 'clsx';
import { Text } from 'react-native';
import { View, Image, Dimensions, ImageSourcePropType } from 'react-native';

const { width } = Dimensions.get('window');

export default function ProductPic({ source }: {
    source: ImageSourcePropType
}) {
    return (
        <View className='items-center'>
            <Image
                source={source}
                className={clsx(
                    '-mt-52 h-[280px]',
                    source.toString() !== "55" && '-mt-64'
                )}
                resizeMode='contain'
            />
        </View>
    )
}