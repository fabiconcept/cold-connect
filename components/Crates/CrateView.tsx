import { View, Text, Image } from 'react-native';

export default function CrateView() {
    return (
        <View className='relative'>
            <Image
                source={require("@/assets/images/cold/ellipse-24.png")}
                resizeMode='contain'
            />
            <Image
                source={require("@/assets/images/cold/main-crate.png")}
                resizeMode='contain'
                className='absolute top-5 left-0 w-full'
            />
            <Text className='text-2xl font-MontserratSemiBold text-red-500 absolute top-[65%] right-5 -translate-y-1/2'>
                <Text className='text-4xl'>{"₦200"}</Text>
                <Text className='text-gray-500'>/crate</Text>
            </Text>
        </View>
    )
}