import { View, Text, Image } from 'react-native';

export default function StoragePhoto() {
    return (
        <View className='items-center justify-center'>
            <Image
                source={require("@/assets/images/cold/storage-pic.png")}
                resizeMode='cover'
                height={430}
                width={362}
                className='object-center'
            />
        </View>
    )
}