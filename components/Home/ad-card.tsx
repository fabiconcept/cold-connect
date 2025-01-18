import { View, Text, Image } from 'react-native';
import FullButton from '../FullButton';
import { router } from 'expo-router';

export default function AdCard() {
    return (
        <View className='my-5 mx-3 rounded-2xl bg-primary relative overflow-hidden'>
            <Image
                source={require("@/assets/images/cold/ellipse-13.png")}
                resizeMode='contain'
                className='opacity-50'
            />
            <Image
                source={require("@/assets/images/cold/ellipse-12.png")}
                resizeMode='contain'
                className='absolute top-0 right-0'
            />
            <View className='absolute top-0 left-0 h-full w-full flex-row items-center'>
                <View className='max-w-[48%] ml-2 pl-6 pr-0 gap-3'>
                    <Text className='text-white text-lg leading-6'>
                        Get a <Text className='font-bold text-xl'>40%</Text> Discount on your first order on the app
                    </Text>
                    <FullButton
                        title='Go to shop'
                        className='bg-white py-3 rounded-xl w-[80%]'
                        textClassName='text-primary'
                        onPress={() => router.push("/(root)/(tabs)/crates")}
                        hitSlop={10}
                    />
                </View>
                <View className='-ml-16'>
                    <Image
                        source={require("@/assets/images/cold/crates.png")}
                        resizeMode='contain'
                        className='h-[90%]'
                    />
                </View>
            </View>
        </View>
    )
}